import React from "react";

function DailyDisplay({data}) {
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = data.daily;
  const items = [];
  
  for (let i = 0; i < d.time.length; i++) {
    items.push({
      id: i + 1,
      date: d.time[i],
      max_temp: d.temperature_2m_max[i],
      min_temp: d.temperature_2m_min[i],
      humidity: d.relative_humidity_2m_max[i],
      code: d.weather_code[i],
      w_dir: d.wind_direction_10m_dominant[i],
      w_speed: d.wind_speed_10m_max,
      uv: d.uv_index_max[i],
      precip_per: d.precipitation_probability_max[i],
      precip_sum: d.precipitation_sum[i]
    });
  }

  return (
    <div>
      <ul>

      </ul>
    </div>
  )
}

export default DailyDisplay;