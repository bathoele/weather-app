import React from "react";

function HourItem({data}) {

  return (
    <li>{data.hour} {data.temp}</li>
  )
}

export default HourItem;