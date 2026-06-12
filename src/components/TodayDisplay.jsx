import React from "react";
import TempChart from "./TempChart";

function TodayDisplay({data, getIcon, weatherCodes, formatTime, convertWind}) {
  const d = data.daily;
  const h = data.hourly;
  const c = data.current;

  return (
    <div className="grid grid-cols-5">
      <div className="grid grid-cols-5 col-span-2">
        <div className="col-span-2">
          <p className="text-8xl font-medium">{Math.floor(c.temperature_2m)}&deg;</p>
          <p className="text-2xl mb-2 font-bold">{weatherCodes[d.weather_code[0]].desc}</p>
          <span className="text-3xl">{Math.floor(d.temperature_2m_max[0])}&deg;</span> / <span className="text-xl">{Math.floor(d.temperature_2m_min[0])}&deg;</span>
        </div>
        <span className="col-span-3">
          <img
            src={getIcon(d.weather_code[0], true, "svg-static")}
            alt={weatherCodes[d.weather_code[0]].desc}
            className="w-1/1"
          />
        </span>
      </div>
      <span></span>
      <div className="col-span-2">
        <div className="bg-gray-100 rounded-xl p-3 grid grid-cols-2 gap-y-2">
          <div>
            <span className="font-medium text-sm text-gray-500">Humidity&ensp;</span>
            <span>
              {d.relative_humidity_2m_max[0]}%
            </span>
          </div>
          <div>
            <span className="font-medium text-sm text-gray-500">UV Index&ensp;</span>
            <span>{d.uv_index_max[0]}</span>
          </div>
          <div>
            <span className="font-medium text-sm text-gray-500">Wind&ensp;</span>
            <span>{d.wind_speed_10m_max[0]}</span>
            <span className="text-sm">mph&ensp;</span>
            <span>{convertWind(d.wind_direction_10m_dominant[0])}</span>
          </div>
          <div>
            <span className="font-medium text-sm text-gray-500">Precip.&ensp;</span>
            <span>{d.precipitation_probability_max[0]}%&nbsp;</span>
            <span className="font-medium text-gray-500">|&nbsp;</span>
            <span>{d.precipitation_sum[0]}in</span>
          </div>
          <div>
            <span className="font-medium text-sm text-gray-500">Sunrise&ensp;</span>
            <span>{formatTime(d.sunrise[0])}</span>
          </div>
          <div></div>
          <div>
            <span className="font-medium text-sm text-gray-500">Sunset&ensp;</span>
            <span>{formatTime(d.sunset[0])}</span>
          </div>
        </div>
      </div>
      <TempChart data={data} getIcon={getIcon} weatherCodes={weatherCodes}/>
    </div>
  )
}

export default TodayDisplay;