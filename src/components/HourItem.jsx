import React from "react";

function HourItem({data: d}) {

  return (
    <li>{d.hour} {d.temp} {d.humidity} {d.code} {d.w_dir} {d.w_speed} {d.cloud} {d.uv} {d.precip_per} </li>
  )
}

export default HourItem;