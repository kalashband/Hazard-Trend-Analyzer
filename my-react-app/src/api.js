import axios from "axios";

const API_BASE = "https://hazard-trend-analyzer.onrender.com/api";

export const getTrendData = async (region, dateRange) => {
  const { lat, lon } = region.value;
  const { start, end } = dateRange;

  console.log(region.value, "region val");
  console.log(dateRange, "daterange");

  const response = await axios.get(`${API_BASE}/trends`, {
    params: {
      lat,
      lon,
      start,
      end
    }
  })
    .then(res => console.log("✅ Axios Success:", res))
    .catch(err => {
      console.log("❌ Axios Error:", err.message);
      console.log("Details:", err.toJSON());
    });
  return response;
};

