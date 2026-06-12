import React from "react";

function DailyItem({data: d}) {
  
  return (
    <div className="pt-2 mb-3 flex">
      <div className="bg-gray-200">
        <div className="gap-2 grid grid-cols-3 bg-white pb-3 rounded-br-2xl">
          <span className="font-bold text-lg">
            {d.date}
          </span>
          <span className="text-2xl col-span-2 text-gray-700">
            <span className="text-3xl font-bold text-black">{Math.floor(d.max_temp)}&deg;</span> / {Math.floor(d.min_temp)}&deg;
          </span>
          <span className="">
            <img
            className="inline w-17 h-17 mr-2"
            src={d.icon}
            alt={d.code}
            />
          </span>
          <span className="col-span-2 w-30 my-auto font-medium">
            {d.code}
          </span>
        </div>
        <div className="bg-gray-200 w-2 h-2 relative rounded-l-full -left-2"></div>
      </div>
      <div className="bg-gray-200 p-4 pb-3 rounded-t-xl rounded-br-xl">
        <div className="grid grid-cols-5 w-120 gap-y-4">
          <div className="flex flex-col">
            <div className="text-sm text-gray-500">Precip.</div>
            <span>{d.precip_per}%&ensp;|&ensp;{Math.round(d.precip_sum * 10) / 10}in</span>
          </div>
          <div>
            <div className="text-sm text-gray-500">Wind</div>
            <span>{Math.floor(d.w_speed)}mph {d.w_dir}</span>
          </div>
          <div>
            <div className="text-sm text-gray-500">Humidity</div>
            <span>{d.humidity}%</span>
          </div>
          <div className="col-span-2">
            <div className="text-sm text-gray-500">UV Index</div>
            <span>{Math.round(d.uv * 10) / 10}</span>
          </div>
          <div className="text-center flex gap-2">
            <div>
              <div className="text-sm text-gray-500">Sunrise</div>
              <div>{d.sunrise}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">-</div>
              <div>-</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Sunset</div>
              <div>{d.sunset}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyItem;