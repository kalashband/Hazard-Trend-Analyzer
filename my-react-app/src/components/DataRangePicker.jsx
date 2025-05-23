
import { useState } from "react";
import { React } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

function DataRangePicker({ onDateRangeChange }) {

    const currentYear = new Date().getFullYear();
    const years = [];

    for (let y = 2019; y < currentYear; y++) {
        years.push(y);
    }

    const [startYear, setStartYear] = useState(2019);
    const [endYear, setEndYear] = useState(currentYear);
    const [error, setError] = useState("");

    const changehandler = () => {
        if (startYear > endYear) {
            setError("Start year must before end year");
            return;
        }
        setError("")
        onDateRangeChange({ start: startYear, end: endYear })
    };

    return (
        <div style={{
            display: "flex",
            width: "1160px",
            justifyContent: "space-evenly",
            alignItems: "center",
        }}>
            <h3>📅 Select Year Range</h3>

            <label>From: </label>
            <Select
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
                label="Year"
            >
                {years.map((year) => (
                    <MenuItem key={year} value={year}>
                        {year}
                    </MenuItem>
                ))}

            </Select>

            <label>To: </label>

            <Select
                label="Year"
                onChange={(e) => setEndYear(Number(e.target.value))}
                value={endYear}
            >
                {years.map((year) => (
                    <MenuItem key={year} value={year} onClick={changehandler} >
                        {year}
                    </MenuItem>
                ))}
            </Select>
            {error && <p style={{ color: "red" }}>{error}</p>}


        </div>
    )
}

export default DataRangePicker;