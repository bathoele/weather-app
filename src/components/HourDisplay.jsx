import React from "react";
import HourItem from "./HourItem";

function HourDisplay({data}) {
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const nowHour = new Date().getHours();
  
  const h = data.hourly;
  const hours = h.time;
  const items = [];
  const forecastDates = [];
  
  hours.forEach((hour) => {
    forecastDates.push(hour.split("T")[0]);
  });

  const days = [...new Set(forecastDates)].map((day) => {
    const date = new Date(day);

    return {
      title: `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate() + 1}`,
      date: day
    };
  });

  for (let i = 0; i < hours.length; i++) {
    items.push({
      id: i + 1,
      date: hours[i].split("T")[0],
      hour: hours[i].split("T")[1].split(":")[0].replace(/^0+(?=\d)/, ""),
      temp: h.temperature_2m[i],
      humidity: h.relative_humidity_2m[i],
      code: h.weather_code[i],
      w_dir: h.wind_direction_10m[i],
      w_speed: h.wind_speed_10m[i],
      cloud: h.cloud_cover[i],
      uv: h.uv_index[i],
      precip_per: h.precipitation_probability[i]
    });
  }

  return (
    <div>
      {days.map((day, index) => (
        <ul>
          <h3>{day.title}</h3>
          {items.map((item) => {
            if (index == 0 && item.date == day.date) {
              return item.hour >= nowHour ? <HourItem key={item.id} data={item} /> : null;
            } else if (item.date == day.date) return <HourItem key={item.id} data={item} />;
          })}
        </ul>
      ))}
    </div>
  )
}

export default HourDisplay;