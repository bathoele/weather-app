import React from "react";
import HourItem from "./HourItem";

function HourDisplay({data}) {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const nowHour = new Date().getHours();

  const icons = import.meta.glob('/node_modules/@meteocons/svg/monochrome/*.svg', {
    eager: true,
    query: '?url',
    import: 'default'
  })
  // FIX THISS

  const weatherCodes = {
    0:  { desc: "Clear Sky",                     icon: "clear-day" },
    1:  { desc: "Mainly Clear",                  icon: "mostly-clear-day" },
    2:  { desc: "Partly Cloudy",                 icon: "partly-cloudy-day" },
    3:  { desc: "Overcast",                      icon: "overcast" },
    45: { desc: "Fog",                           icon: "fog-day" },
    48: { desc: "Depositing Rime Fog",           icon: "fog-day" },
    51: { desc: "Light Drizzle",                 icon: "drizzle" },
    53: { desc: "Moderate Drizzle",              icon: "drizzle" },
    55: { desc: "Dense Drizzle",                 icon: "extreme-drizzle" },
    56: { desc: "Light Freezing Drizzle",        icon: "sleet" },
    57: { desc: "Heavy Freezing Drizzle",        icon: "sleet" },
    61: { desc: "Slight Rain",                   icon: "rain" },
    63: { desc: "Moderate Rain",                 icon: "rain" },
    65: { desc: "Heavy Rain",                    icon: "extreme-rain" },
    66: { desc: "Light Freezing Rain",           icon: "sleet" },
    67: { desc: "Heavy Freezing Rain",           icon: "extreme-sleet" },
    71: { desc: "Slight Snowfall",               icon: "snow" },
    73: { desc: "Moderate Snowfall",             icon: "snow" },
    75: { desc: "Heavy Snowfall",                icon: "extreme-snow" },
    77: { desc: "Snow Grains",                   icon: "snow" },
    80: { desc: "Slight Rain Showers",           icon: "partly-cloudy-day-rain" },
    81: { desc: "Moderate Rain Showers",         icon: "partly-cloudy-day-rain" },
    82: { desc: "Violent Rain Showers",          icon: "extreme-rain" },
    85: { desc: "Slight Snow Showers",           icon: "partly-cloudy-day-snow" },
    86: { desc: "Heavy Snow Showers",            icon: "extreme-snow" },
    95: { desc: "Thunderstorm",                  icon: "thunderstorms-day" },
    96: { desc: "Thunderstorm with Slight Hail", icon: "thunderstorms-day-rain" },
    99: { desc: "Thunderstorm with Heavy Hail",  icon: "thunderstorms-day-extreme-rain" },
  };

  const getIcon = (code, isDay) => {
    const slug = weatherCodes[code].icon;
    const name = isDay ? slug : slug.replace("day", "night");
    return icons[`/node_modules/@meteocons/svg/monochrome/${name}.svg`];
  }
  
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
      icon: getIcon(h.weather_code[i], h.is_day[i]),
      w_dir: h.wind_direction_10m[i],
      w_speed: h.wind_speed_10m[i],
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
    <div className="">
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
                    <h3 key={days.length + index} className="text-lg font-medium py-2">{day.title}</h3>
                  </td>
                </tr>
                <tr className="">
                  <th className="text-left">Time</th>
                  <th className="text-left pl-7">Condition</th>
                  <th className="text-center">Temperature</th>
                  <th className="text-center">Precipitation</th>
                  <th className="text-center">Humidity</th>
                  <th></th>
                </tr>
              </thead>
            }

            <tbody>
            {index !== 0 &&
              <tr>
                <td colSpan={6}>
                  <h3 key={days.length + index} className="text-lg font-medium py-2">{day.title}</h3>
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