import React, { useState } from "react";

function HourItem({data: d}) {
  const [isOpen, setIsOpen] = useState(false);

  let hour = d.hour > 12 ? (d.hour - 12) + "pm" : d.hour + "am";
  if (hour == "0am") {
    hour = "12am";
  }

  return (
    <li className="mb-2 p-2 px-4 bg-blue-100 rounded-lg">
      <ul className="flex flex-row list-none items-center">
        <li className="w-15 border-2">{hour}</li>
        <li className="flex items-center gap-1 border-2 justify-left ml-20">
          <img
            src={d.icon}
            alt="Clear day"
            width="40"
            height="40"
          />
          {d.code}
        </li>
        <li className="ml-auto">{Math.floor(d.temp)}</li>
        <li className="border-2 mr-25 ml-30">{d.precip_per}%</li>
        <li className="mr-25 ml-0">{d.humidity}%</li>
        <button
        className="mr-0"
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