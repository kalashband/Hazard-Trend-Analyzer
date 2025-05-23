import { useState } from "react";
import RegionSelector from '../components/RegionSelector';
import DataRangePicker from '../components/DataRangePicker';
import TrendChart from '../components/TrendChart';
import Summarybox from '../components/Summary';
import { getTrendData } from "../api";


function Dashboard() {
    const [dateRange, setDateRange] = useState(null)
    const [trendData, setTrendData] = useState([]);
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleSearch = async () => {
        if (!region || !dateRange) {
            alert("Please Select both date range and region")
        }
        setLoading(true);
        console.log(getTrendData);
        
        try {
            const result = await getTrendData(region, dateRange);
            if (result?.trend) {
                setTrendData(result.trend || []);
                console.log(result.trend, "result trend");
            }

        } catch (err) {
            console.error("API Error:", err.message);
            if (err.response) {
                console.error("Response:", err.response);
            } else if (err.request) {
                console.error("Request:", err.request);
            } else {
                console.error("Error:", err);
            }
        } finally {
            setLoading(false)
        }
    };

    const handleRegionSelect = (selected) => {
        console.log("selected Region :", selected);
        setRegion(selected);
    }

    const handleDateRangeChange = (range) => {
        console.log("Seleted range ", range);
        setDateRange(range);
    }

    console.log(dateRange?.end, "end");


    const handleFetchTrend = async () => {
        if (!dateRange) {
            console.warn("Date range is not set");
            return;
        }

        const startDate = `${dateRange.start}-01-01`;
        const endDate = `${dateRange.end}-12-31`;

        const url = `https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&start_date=${startDate}&end_date=${endDate}&hourly=relative_humidity_2m`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            setTrendData(data); // or data.trend if that's the correct field
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    };

    return (
        <div style={{
            display: "grid",
            justifyItems: "center",
            padding: "3rem"
        }}>
            <h2 style={{
                fontSize: "40px"
            }}>Climete Harzed Trend Analyzer</h2>

            <RegionSelector onRegionSelect={handleRegionSelect} />

            <DataRangePicker onDateRangeChange={handleDateRangeChange} />

            <button onClick={handleSearch} style={{ marginTop: "3rem" }}>Fetch Trend Data</button>
            {loading ? (<p>Loading data ...</p>) :
                (< TrendChart trendData={trendData} />)}

            <Summarybox trendData={trendData} />
        </div>
    )
}

export default Dashboard;