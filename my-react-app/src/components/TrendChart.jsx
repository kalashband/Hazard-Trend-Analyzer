import React from "react";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function TrendChart({ trendData }) {
    if (!trendData || trendData.length === 0) {
        return <p style={{ marginTop: "1rem" }}>📉 No data to display. Please run a search.</p>;
    }

    const years = trendData.map((d) => d.year);
    const counts = trendData.map((d) => d.heatwave_count);

    const data = {
        labels: years,
        datasets: [
            {
                label: "Heatwave Frequency",
                data: counts,
                fill: false,
                backgroundColor: "#ff5733",
                borderColor: "#ff5733",
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            tooltip: {
                callbacks: {
                    label: (context) => `Heatwaves: ${context.parsed.y}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: "Heatwave Count" },
            },
            x: {
                title: { display: true, text: "Year" },
            },
        },
    };

    return (
        <div style={{ marginTop: "5rem" }}>
            <h3>📈 Heatwave Trend</h3>
            <Line data={data} options={options} />
        </div>
    );
}

export default TrendChart;

