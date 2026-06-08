import React, { useState } from "react";

function HourItem({data: d}) {
  const [isOpen, setIsOpen] = useState(false);

  let hour = d.hour > 12 ? (d.hour - 12) + "pm" : d.hour + "am";
  if (hour == "12am") {
    hour = "12pm";
  } else if (hour == "0am") {
    hour = "12am";
  }

  return (
    <React.Fragment>
      <tr>
        <td>{hour}</td>
        <td>
          <div className="flex items-center gap-2">
            <img
              src={d.icon}
              alt="Clear day"
              width="40"
              height="40"
              />
            <span>{d.code}</span>
          </div>
        </td>
        <td className="text-center">{Math.floor(d.temp)}</td>
        <td className="text-center">{d.precip_per}%</td>
        <td className="text-center">{d.humidity}%</td>
        <td className="w-8">  
          <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer" }}
          >
            {isOpen ? "Close" : "Open"}
          </button>
        </td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={6}>
            <table>
              <thead>
                <tr>
                  <th className="w-40 text-left px-2">Wind</th>
                  <th className="w-40 text-left px-2">Cloud Cover</th>
                  <th className="w-40 text-left px-2">UV Index</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2">{d.w_dir} {d.w_speed} mph</td>
                  <td className="px-2">{d.cloud}%</td>
                  <td className="px-2">{d.uv}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </React.Fragment>
  )
}

export default HourItem;