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
      <div className="grid grid-cols-3 gap-8 w-120 gap-y-4 pb-2">
        <div className="flex flex-col">
          <div className="font-light text-sm text-gray-600">Precipitation</div>
          <span>{d.precip_per}% | {Math.round(d.precip_sum * 10) / 10}in</span>
        </div>
        <div>
          <div className="font-light text-sm text-gray-600">Wind</div>
          <span>{Math.floor(d.w_speed)}mph {d.w_dir}</span>
        </div>
        <div>
          <div className="font-light text-sm text-gray-600">Humidity</div>
          <span>{d.humidity}%</span>
        </div>
        <div className="text-center flex gap-2">
          <div>
            <div className="font-light text-sm text-gray-600">Sunrise</div>
            <div>{d.sunrise}</div>
          </div>
          <div>
            <div className="font-light text-sm text-gray-600">-</div>
            <div>-</div>
          </div>
          <div>
            <div className="font-light text-sm text-gray-600">Sunset</div>
            <div>{d.sunset}</div>
          </div>
        </div>
        <div>
          <div className="font-light text-sm text-gray-600">UV Index</div>
          <span>{Math.round(d.uv * 10) / 10}</span>
        </div>
      </div>
    </div>
  )
}

export default DailyItem;