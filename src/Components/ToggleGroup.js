import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleGroup({ handelFilter }) {
    const [alignment, setAlignment] = React.useState("all");


    //// function handlers
    const handleFilterChange = (event) => {
        const newValue = event.target.value
        setAlignment(newValue);
        handelFilter(newValue);
    };


    let toggleButtonStyle = {
        color: "#eee",
        border: "1px solid #494c50",
        padding: "5px 10px",
    }



    return (
        <ToggleButtonGroup
            color="secondary"
            value={alignment}
            exclusive
            onChange={handleFilterChange}
            aria-label="tasks filter"
            sx={{ color: "#eee" }}
        >
            <ToggleButton style={toggleButtonStyle} value="all"  >All</ToggleButton>
            <ToggleButton style={toggleButtonStyle} value="incomplete">Incomplete</ToggleButton>
            <ToggleButton style={toggleButtonStyle} value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
    );
}
