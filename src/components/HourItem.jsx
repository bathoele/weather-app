import React from "react";

function HourItem({data}) {
  
  return (
    <li>{data.time} {data.temp}</li>
  )
}

export default HourItem;