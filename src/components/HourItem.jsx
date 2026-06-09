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
      <tr className="bg-gray-200 border-transparent border-y-5 rounded-2x1">
        <td className="font-semibold pt-2 pb-2 pl-3 text-lg">{hour}</td>
        <td className="pt-2 pb-2">
          <div className="flex items-center gap-2">
            <img
              src={d.icon}
              alt={d.code}
              width="40"
              height="40"
              />
            <span>{d.code}</span>
          </div>
        </td>
        <td className="text-center pt-2 pb-2">{d.temp}</td>
        <td className="text-center pt-2 pb-2">{d.precip_per}%</td>
        <td className="text-center pt-2 pb-2">{d.humidity}%</td>
        <td className="w-8 pt-2 pb-2">  
          <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer "
          >      
            <svg
              className={`w-4 h-4 transform transition duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </td>
      </tr>
      <tr className="bg-gray-200">
        <td colSpan={6} className="p-0">
          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48" : "max-h-0"}`}>
            <table className="ml-5">
              <thead>
                <tr>
                  <th className="w-15"></th>
                  <th className="w-45 text-center font-normal">Wind</th>
                  <th className="w-55 text-center font-normal">Cloud Cover</th>
                  <th className="w-20 text-center font-normal">UV Index</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td className="text-center">{d.w_speed} mph {d.w_dir}</td>
                  <td className="text-center">{d.cloud}%</td>
                  <td className="text-center">{d.uv}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="h-5"></tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      <tr className="h-2"></tr>
    </React.Fragment>
  )
}

export default HourItem;