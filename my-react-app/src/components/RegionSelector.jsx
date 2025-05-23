import { use } from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



function RegionSelector({ onRegionSelect }) {
    const [city, setCity] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [error, setError] = useState("");

    const submitHandle = () => {

        if (longitude && latitude) {
            setError("");
            onRegionSelect({
                type: "coordinates",
                value: { lat: parseFloat(latitude), lon: parseFloat(longitude) }
            });
        }

        else if (city.trim()) {
            setError("");
            onRegionSelect({
                type: "city",
                value: city.trim(),
            })
        }

        else {
            setError("Please enter Location Detail");
        }
        console.log(city, longitude, latitude);
    }

    return (
        <div>
            <h2 style={{
                position: "relative",
                left: "36px"
            }}>
                Select Region</h2>

            <div style={{
                display: "flex",
                width: "1160px",
                justifyContent: "space-evenly",
                alignItems: "center"
            }}>

                <label>City or Region :</label>
                <TextField type="text" label="City / State" color="secondary" focused value={city} onChange={(e) => setCity(e.target.value)} style={{}} />

                <label>Latitude:</label>
                <TextField label="Outlined secondary" color="secondary" focused
                    type="number"
                    placeholder="e.g., 19.07"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                />

                <label>Longitude:</label>
                <TextField label="Outlined secondary" color="secondary" focused
                    type="number"
                    placeholder="e.g., 19.07"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                />
            </div>
            <div style={{
                display: "flex",
                width: "1160px",
                justifyContent: "space-evenly",
                alignItems: "center",
                margin: "2rem"
            }}>
                <button variant="contained" size="" onClick={submitHandle} color="#121212"
                    style={{
                        // position: "fixed",
                        // left: "500px",
                        // margin: "25px",
                        // marginTop: "3rem"
                    }}>
                    Submit
                </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}

        </div>
    )
}

export default RegionSelector;
