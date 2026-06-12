import React from "react";
import TempChart from "./TempChart";

function TodayDisplay({data, getIcon, weatherCodes, formatTime}) {
  const d = data.daily;
  const h = data.hourly;
  const c = data.current;

  return (
    <div>
      <div>
        <ul>
          <li>{Math.floor(c.temperature_2m)}&deg;</li>
          <li>{d.weather_code[0]}</li>
          <li>{Math.floor(d.temperature_2m_max[0])}&deg;</li>
          <li>{Math.floor(d.temperature_2m_min[0])}&deg;</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>{d.relative_humidity_2m_max[0]}</li>
          <li>{d.uv_index_max[0]}</li>
          <li>{d.wind_speed_10m_max[0]}mph</li>
          <li>{d.wind_direction_10m_dominant[0]}</li>
          <li>{d.precipitation_probability_max[0]}</li>
          <li>{d.precipitation_sum[0]}</li>
          <span>{formatTime(d.sunrise[0])}</span>
          <span>{formatTime(d.sunset[0])}</span>
        </ul>
      </div>
      <TempChart data={data} getIcon={getIcon} weatherCodes={weatherCodes}/>
    </div>
  )
}

export default TodayDisplay;