import React from "react";

const infoStyle: React.CSSProperties = {
    fontSize: "30px"
};

const InfoBlock = () => {
    return (
        <>
            <div style={infoStyle}>Biorhythm Calculator</div>
            <div style={infoStyle}>Visualize your emotional, intellectual and physical ability at a given date.</div>
        </>
    )
}

export default InfoBlock;