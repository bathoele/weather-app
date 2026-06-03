import React from "react";

function TodayDisplay({data}) {
  const d = data.daily;
  const h = data.hourly;
  const c = data.current;

  return (
    <ul>
      <li>
        <ul>
          <li>{c.temperature_2m}</li>
          <li>{d.weather_code[0]}</li>
          <li>{d.precipitation_probability_max[0]}</li>
          <li>{d.precipitation_sum[0]}</li>
        </ul>
      </li>
      <li>
        <ul>
          <li>{d.temperature_2m_max[0]}</li>
          <li>{d.temperature_2m_min[0]}</li>
        </ul>
      </li>
      <li>
        <ul>
          <li>{d.relative_humidity_2m_max[0]}</li>
          <li>{d.uv_index_max[0]}</li>
          <li>{d.wind_speed_10m_max[0]}</li>
          <li>{d.wind_direction_10m_dominant[0]}</li>
        </ul>
      </li>
    </ul>
  )
}

export default TodayDisplay;