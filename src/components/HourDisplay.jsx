import React from "react";
import HourItem from "./HourItem";

function HourDisplay({data}) {
  const hours = data.hourly;
  return (
    <ul>
      {Object.entries(hours.time).map((hour) => (
        // li will instead be a separate component
        <HourItem data={hours.time} />
      ))}
    </ul>
  )
}

export default HourDisplay;