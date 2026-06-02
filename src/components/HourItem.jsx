import React from "react";

function HourItem({data: d}) {
  let hour = d.hour > 12 ? (d.hour - 12) + "pm" : d.hour + "am";
  if (hour == "0am") {
    hour = "12am";
  }
  return (
    // nest two? uls within the li, make each piece of data an li
    // the first ul shows the basic data, the second ul is the drop down data
    <li>{hour} {d.temp} {d.humidity} {d.code} {d.w_dir} {d.w_speed} {d.cloud} {d.uv} {d.precip_per} </li>
  )
}

export default HourItem;