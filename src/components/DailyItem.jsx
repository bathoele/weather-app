import React from "react";

function DailyItem({data: d}) {
  
  return (
    <div className="border-b-2 border-gray-300 p-2 mb-3 flex">
      <div className="gap-2 grid grid-cols-3">
        <span className="font-bold text-lg">
          {d.date}
        </span>
        <span className="text-xl col-span-2">
          {Math.floor(d.max_temp)}&deg; <span className="text-sm">/</span> {Math.floor(d.min_temp)}&deg;
        </span>
        <span className="">
          <img
          className="inline w-17 h-17 mr-2"
          src={d.icon}
          alt={d.code}
          />
        </span>
        <span className="col-span-2 w-30">
          {d.code}
        </span>
      </div>
      <div>
        <span>
          {d.precip_per}
        </span>
        <span>
          {d.precip_sum}
        </span>
        <span>
          {d.w_dir}
        </span>
        <span>
          {d.w_speed}
        </span>
        <div>
          <span>
            {d.uv}
          </span>
          <span>
            {d.humidity}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DailyItem;