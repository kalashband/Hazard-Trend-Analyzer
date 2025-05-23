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

        try {
            const result = await getTrendData(region, dateRange);
            if (result?.trend) {
                setTrendData(result.trend); // ✅ expecting trend here
            }


        } catch (err) {
            console.error("API Error:", err.message);
            if (err.response) {
                console.error("Response:", err.response);
            }else {
                console.error("Error:", err);
            }
        } finally {
            setLoading(false)
        }
    };

    const handleRegionSelect = (selected) => {
        setRegion(selected);
    }

    const handleDateRangeChange = (range) => {
        setDateRange(range);
    }

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