import httpx
import numpy as np


async def fetch_weather_data(lat, lon, start, end):
    url = (
        f"https://historical-forecast-api.open-meteo.com/v1/forecast?"
        f"latitude={lat}&longitude={lon}"
        f"&start_date={start}-01-01&end_date={end}-12-31"
        f"&daily=temperature_2m_max&timezone=auto"
    )

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.json()


def detect_heatwaves(data):
    temps = data["daily"]["temperature_2m_max"]
    dates = data["daily"]["time"]
    threshold = np.percentile(temps, 95)

    heatwaves = {}
    for i in range(len(temps) - 2):
        if all(t > threshold for t in temps[i : i + 3]):
            year = int(dates[i][:4])
            heatwaves[year] = heatwaves.get(year, 0) + 1

    return heatwaves
