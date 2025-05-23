
import axios from "axios";

const API_BASE = "https://hazard-trend-analyzer.onrender.com/api";

export const getTrendData = async (region, dateRange) => {
  const { lat, lon } = region.value;
  const { start, end } = dateRange;

  console.log(region.value, "region val");
  console.log(dateRange, "daterange");

  try {
    const response = await axios.get(`${API_BASE}/trends`, {
      params: {
        lat,
        lon,
        start,
        end,
      },
    });

    console.log("✅ Axios Success:", response.data);
    return response.data;
  } catch (err) {
    console.log("❌ Axios Error:", err.message);
    console.log("Details:", err.toJSON());
    return null;
  }
};


