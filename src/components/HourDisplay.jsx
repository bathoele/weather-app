import React from "react";
import HourItem from "./HourItem";

function HourDisplay({data}) {
  const hours = data.hourly;
  // console.log(data);
  return (
    <ul>
      {Object.entries(hours.time).map((hour, index) => (
        // li will instead be a separate component
        <HourItem key={index} index={index} data={hours} />
      ))}
    </ul>
  )
}

export default HourDisplay;