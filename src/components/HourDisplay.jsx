import React from "react";

function HourDisplay({data}) {
  const hourly = data.hourly.time[0];
  return (
    <div>{hourly}</div>
  )
}

export default HourDisplay;