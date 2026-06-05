import React, { useState } from "react";

function HourItem({data: d}) {
  const [isOpen, setIsOpen] = useState(false);

  let hour = d.hour > 12 ? (d.hour - 12) + "pm" : d.hour + "am";
  if (hour == "0am") {
    hour = "12am";
  }

  return (
    <li className="mb-2 border-2 p-2 px-3">
      <ul className="flex flex-row list-none justify-between">
        <li>{hour}</li>
        <li className="flex">
          <img
            src={d.icon}
            alt="Clear day"
            width="32"
            height="32"
          />
          {d.code}
        </li>
        <li>{d.temp}</li>
        <li>{d.precip_per}</li>
        <li>{d.humidity}</li>
        <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
        >
          {isOpen ? "Close" : "Open"}
        </button>
      </ul>
      {isOpen && (
        <ul className="list-none p-2 flex flex-row">
          <li>{d.w_dir}</li>
          <li>{d.w_speed}</li>
          <li>{d.cloud}</li>
          <li>{d.uv}</li>
        </ul>
      )}
    </li>
  )
}

export default HourItem;