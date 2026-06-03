import React, { useState } from "react";

function HourItem({data: d}) {
  const [isOpen, setIsOpen] = useState(false);

  let hour = d.hour > 12 ? (d.hour - 12) + "pm" : d.hour + "am";
  if (hour == "0am") {
    hour = "12am";
  }

  return (
    <li>
      <ul>
        <li>{hour}</li>
        <li>{d.code}</li>
        <li>{d.temp}</li>
        <li>{d.precip_per}</li>
        <li>{d.humidity}</li>
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
              <li>{d.w_dir}</li>
              <li>{d.w_speed}</li>
              <li>{d.cloud}</li>
              <li>{d.uv}</li>
            </ul>
          </li>
        )}
      </ul>
      
      
    </li>
  )
}

export default HourItem;