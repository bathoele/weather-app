import React from "react";
import HourItem from "./HourItem";

function HourDisplay({data, getIcon, weatherCodes}) {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const nowHour = new Date().getHours();
  
  const h = data.hourly;
  const hours = h.time;
  const items = [];
  const forecastDates = [];
  
  hours.forEach((hour) => {
    forecastDates.push(hour.split("T")[0]);
  });

  const days = [...new Set(forecastDates)].map((day) => {
    const date = new Date(day.replace(/-/g, "/"));

    return {
      title: `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`,
      date: day
    };
  });

  const convertWind = (deg) => {
    return directions[Math.round(deg / 45) % 8];
  }

  for (let i = 0; i < hours.length; i++) {
    items.push({
      id: i + 1,
      date: hours[i].split("T")[0],
      hour: hours[i].split("T")[1].split(":")[0].replace(/^0+(?=\d)/, ""),
      temp: Math.floor(h.temperature_2m[i]),
      humidity: h.relative_humidity_2m[i],
      code: weatherCodes[h.weather_code[i]].desc,
      icon: getIcon(h.weather_code[i], h.is_day[i]),
      w_dir: convertWind(h.wind_direction_10m[i]),
      w_speed: Math.round(h.wind_speed_10m[i]),
      cloud: h.cloud_cover[i],
      uv: h.uv_index[i],
      precip_per: h.precipitation_probability[i]
    });
  }

  const displayItems = (index, item, day) => {
    if (index == 0 && item.date == day.date) {
      return item.hour >= nowHour ? <HourItem key={item.id} data={item} /> : null;
    } else if (item.date == day.date) {
      return <HourItem key={item.id} data={item} />;
    }
  }

  return (
    <div>
      <table className="w-full table-fixed">
        <colgroup>
          <col className="w-15" />
          <col className="w-25" />
          <col className="w-20" />
          <col className="w-20" />
          <col className="w-20" />
          <col className="w-8" />
        </colgroup>
        {days.map((day, index) => (
          <React.Fragment key={day.date}>

            {index === 0 && 
              <thead>
                <tr>
                  <td colSpan={6}>
                    <h3 key={days.length + index} className="text-lg font-medium">{day.title}</h3>
                  </td>
                </tr>
                <tr className="h-5"></tr>
                <tr>
                  <th className="text-left pl-2 font-medium text-sm text-gray-500">Time</th>
                  <th className="text-left pl-7 font-medium text-sm text-gray-500">Condition</th>
                  <th className="text-center font-medium text-sm text-gray-500">Temperature</th>
                  <th className="text-center font-medium text-sm text-gray-500">Precipitation</th>
                  <th className="text-center font-medium text-sm text-gray-500">Humidity</th>
                  <th></th>
                </tr>
                <tr className="h-2"></tr>
              </thead>
            }

            <tbody>
            {index !== 0 &&
              <tr>
                <td colSpan={6}>
                  <h3 key={days.length + index} className="text-lg font-medium py-4">{day.title}</h3>
                </td>
              </tr>
            }
            {items.map((item) => displayItems(index, item, day))}
            </tbody>
          </React.Fragment>
        ))}
      </table>
    </div>
  )
}

export default HourDisplay;