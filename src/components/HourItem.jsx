import React, { useState } from "react";

function HourItem({data: d}) {
  const [isOpen, setIsOpen] = useState(false);


  let hour = d.hour > 12 ? (d.hour - 12) + "pm" : d.hour + "am";
  if (hour == "0am") {
    hour = "12am";
  }
  return (
    // nest two? uls within the li, make each piece of data an li
    // the first ul shows the basic data, the second ul is the drop down data
    <li>
      <ul>
        {hour} {d.code} {d.temp} {d.precip_per} {d.humidity}
        <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
        >
          {isOpen ? "Close" : "Open"}
        </button>
        {isOpen && (
          <li>
            <ul style={{
              listStyle: "none",
              padding: "2px"
            }}
            >
              {d.w_dir} {d.w_speed} {d.cloud} {d.uv}
            </ul>
          </li>
        )}
      </ul>
      
      
    </li>
  )
}

export default HourItem;