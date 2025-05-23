import React from "react";


function Summarybox({ trendData }) {

    if (!trendData || trendData.length < 2) return null;


    const sorted = [...trendData].sort((a, b) => a.year - b.year);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];

    const change = last.heatwave_count - first.heatwave_count;
    const percentage = first.heatwave_count ? ((change / first.heatwave_count) * 100).toFixed(1) : ("N/A");


    return (
        <div style={{ backgroundColor: "#f5f5f5", padding: "1rem", marginTop: "1rem", borderRadius: "8px" }}>
            <h4>📊 Summary Insight</h4>
            <p>
                From <strong>{first.year}</strong> to <strong>{last.year}</strong>, the number of heatwaves
                changed by <strong>{change}</strong> ({percentage}%).
            </p>
        </div>
    )
}

export default Summarybox;