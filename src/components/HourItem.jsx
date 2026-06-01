import React from "react";

function HourItem({index, data}) {
  const time = data.time;
  const temp = data.temperature_2m;
  console.log(time[index], temp[index]);
  return (
    <li>{time[index]} {temp[index]}</li>
  )
}

export default HourItem;