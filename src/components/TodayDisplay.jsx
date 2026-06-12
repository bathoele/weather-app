import React from "react";
import TempChart from "./TempChart";

function TodayDisplay({data, getIcon, weatherCodes, formatTime}) {
  const d = data.daily;
  const h = data.hourly;
  const c = data.current;

  return (
    <div className="grid grid-cols-5">
      <div className="grid grid-cols-5 col-span-2">
        <div className="col-span-2">
          <p className="text-8xl">{Math.floor(c.temperature_2m)}&deg;</p>
          <p className="text-3xl mb-2">{weatherCodes[d.weather_code[0]].desc}</p>
          <span className="text-2xl">{Math.floor(d.temperature_2m_max[0])}&deg; / {Math.floor(d.temperature_2m_min[0])}&deg;</span>
        </div>
        <span className="col-span-3">
          <img
            src={getIcon(d.weather_code[0], true)}
            alt={weatherCodes[d.weather_code[0]].desc}
            className="w-1/1"
          />
        </span>
      </div>
      <span></span>
      <div className="col-span-2">
        <span>{d.relative_humidity_2m_max[0]}</span>
        <span>{d.uv_index_max[0]}</span>
        <span>{d.wind_speed_10m_max[0]}mph</span>
        <span>{d.wind_direction_10m_dominant[0]}</span>
        <span>{d.precipitation_probability_max[0]}</span>
        <span>{d.precipitation_sum[0]}</span>
        <span>{formatTime(d.sunrise[0])}</span>
        <span>{formatTime(d.sunset[0])}</span>
      </div>
      <TempChart data={data} getIcon={getIcon} weatherCodes={weatherCodes}/>
    </div>
  )
}

export default TodayDisplay;