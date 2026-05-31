import React from "react";

function HourDisplay({data}) {
  const hours = data.hourly;
  console.log(hours);
  return (
    <ul>
      {Object.entries(hours.time).map((hour) => (
        // li will instead be a separate component
        <li key={hour}>
          {hour}
        </li>
      ))}
    </ul>
  )
}

export default HourDisplay;