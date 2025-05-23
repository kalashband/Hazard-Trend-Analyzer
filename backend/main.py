from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from heatwave_logic import fetch_weather_data, detect_heatwaves
from database import db

app = FastAPI()

# Allow frontend (React) to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:8000",
          
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "✅ Backend is running"}


@app.get("/api/trends")
async def get_trends(
    lat: float = Query(...),
    lon: float = Query(...),
    start: int = Query(...),
    end: int = Query(...),
):
    cache_key = f"{lat}_{lon}_{start}_{end}"

    # Step 1: Check MongoDB cache
    cached = await db["heatwave_data"].find_one({"_id": cache_key})
    if cached:
        return cached["result"]

    # Step 2: Fetch fresh weather data from Open-Meteo
    try:
        raw_data = await fetch_weather_data(lat, lon, start, end)
        trends = detect_heatwaves(raw_data)
    except Exception as e:
        return {"error": "Failed to fetch or process weather data", "details": str(e)}

    # Step 3: Format the trend result
    trend_list = [
        {"year": year, "heatwave_count": count} for year, count in trends.items()
    ]
    result = {
        "region": f"{lat},{lon}",
        "start_year": start,
        "end_year": end,
        "trend": trend_list,
    }

    # Step 4: Store in MongoDB for caching
    await db["heatwave_data"].insert_one({"_id": cache_key, "result": result})

    return result
