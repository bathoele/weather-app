import React from "react";
import DailyItem from "./DailyItem";

function DailyDisplay({ data, getIcon, weatherCodes, formatTime, convertWind}) {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const d = data.daily;
  let dates = d.time;
  const items = [];
  
  dates = dates.map((day) => {
    const date = new Date(day.replace(/-/g, "/"));

    return `${dayNames[date.getDay()]} ${date.getDate()}`
  })

  for (let i = 0; i < d.time.length; i++) {
    items.push({
      id: i + 1,
      date: dates[i],
      max_temp: d.temperature_2m_max[i],
      min_temp: d.temperature_2m_min[i],
      humidity: d.relative_humidity_2m_max[i],
      code: weatherCodes[d.weather_code[i]].desc,
      icon: getIcon(d.weather_code[i], 1),
      w_dir: convertWind(d.wind_direction_10m_dominant[i]),
      w_speed: d.wind_speed_10m_max[i],
      uv: d.uv_index_max[i],
      precip_per: d.precipitation_probability_max[i],
      precip_sum: d.precipitation_sum[i],
      sunrise: formatTime(d.sunrise[i]),
      sunset: formatTime(d.sunset[i])
    });
  }
  
  return (
    <div>
      {items.map((item) => (
        <DailyItem key={item.id} data={item} />
      ))}
    </div>
  )
}

export default DailyDisplay;