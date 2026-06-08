import React from "react";
import HourItem from "./HourItem";

function HourDisplay({data}) {
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const nowHour = new Date().getHours();

  const icons = import.meta.glob('/node_modules/@meteocons/svg/monochrome/*.svg', {
    eager: true,
    query: '?url',
    import: 'default'
  })

  const getIcon = (slug) => {
    return icons[`/node_modules/@meteocons/svg/monochrome/${slug}.svg`];
  }

  const weatherCodes = {
    0:  { desc: "Clear Sky",                     icon: getIcon("clear-day") },
    1:  { desc: "Mainly Clear",                  icon: getIcon("mostly-clear-day") },
    2:  { desc: "Partly Cloudy",                 icon: getIcon("partly-cloudy-day") },
    3:  { desc: "Overcast",                      icon: getIcon("overcast") },
    45: { desc: "Fog",                           icon: getIcon("fog-day") },
    48: { desc: "Depositing Rime Fog",           icon: getIcon("fog-day") },
    51: { desc: "Light Drizzle",                 icon: getIcon("drizzle") },
    53: { desc: "Moderate Drizzle",              icon: getIcon("drizzle") },
    55: { desc: "Dense Drizzle",                 icon: getIcon("extreme-drizzle") },
    56: { desc: "Light Freezing Drizzle",        icon: getIcon("sleet") },
    57: { desc: "Heavy Freezing Drizzle",        icon: getIcon("sleet") },
    61: { desc: "Slight Rain",                   icon: getIcon("rain") },
    63: { desc: "Moderate Rain",                 icon: getIcon("rain") },
    65: { desc: "Heavy Rain",                    icon: getIcon("extreme-rain") },
    66: { desc: "Light Freezing Rain",           icon: getIcon("sleet") },
    67: { desc: "Heavy Freezing Rain",           icon: getIcon("extreme-sleet") },
    71: { desc: "Slight Snowfall",               icon: getIcon("snow") },
    73: { desc: "Moderate Snowfall",             icon: getIcon("snow") },
    75: { desc: "Heavy Snowfall",                icon: getIcon("extreme-snow") },
    77: { desc: "Snow Grains",                   icon: getIcon("snow") },
    80: { desc: "Slight Rain Showers",           icon: getIcon("partly-cloudy-day-rain") },
    81: { desc: "Moderate Rain Showers",         icon: getIcon("partly-cloudy-day-rain") },
    82: { desc: "Violent Rain Showers",          icon: getIcon("extreme-rain") },
    85: { desc: "Slight Snow Showers",           icon: getIcon("partly-cloudy-day-snow") },
    86: { desc: "Heavy Snow Showers",            icon: getIcon("extreme-snow") },
    95: { desc: "Thunderstorm",                  icon: getIcon("thunderstorms-day") },
    96: { desc: "Thunderstorm with Slight Hail", icon: getIcon("thunderstorms-day-rain") },
    99: { desc: "Thunderstorm with Heavy Hail",  icon: getIcon("thunderstorms-day-extreme-rain") },
  };
  
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

  for (let i = 0; i < hours.length; i++) {
    items.push({
      id: i + 1,
      date: hours[i].split("T")[0],
      hour: hours[i].split("T")[1].split(":")[0].replace(/^0+(?=\d)/, ""),
      temp: h.temperature_2m[i],
      humidity: h.relative_humidity_2m[i],
      code: weatherCodes[h.weather_code[i]].desc,
      icon: weatherCodes[h.weather_code[i]].icon,
      w_dir: h.wind_direction_10m[i],
      w_speed: h.wind_speed_10m[i],
      cloud: h.cloud_cover[i],
      uv: h.uv_index[i],
      precip_per: h.precipitation_probability[i]
    });
  }

  const sortDisplay = (index, item, day) => {
    if (index == 0 && item.date == day.date) {
      return item.hour >= nowHour ? <HourItem key={item.id} data={item} /> : null;
    } else if (item.date == day.date) {
      return <HourItem key={item.id} data={item} />;
    }
  }

  return (
    <div>
      <table>
        {days.map((day, index) => (
          <React.Fragment key={day.date}>
            <tr>
              <td colSpan={6}>
                <h3 key={days.length + index} className="text-lg font-medium py-2">{day.title}</h3>
              </td>
            </tr>
            {index === 0 ? <tr>
              <th>Time</th>
              <th>Condition</th>
              <th>Temperature</th>
              <th>Precipitation</th>
              <th>Humidity</th>
            </tr> : null}
            {items.map((item) => sortDisplay(index, item, day))}
          </React.Fragment>
        ))}
      </table>
    </div>
  )
}

export default HourDisplay;