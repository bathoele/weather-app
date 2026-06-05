import React from "react";
import HourItem from "./HourItem";

function HourDisplay({data}) {
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const nowHour = new Date().getHours();
  const weatherCodes = {
  0:  { desc: "Clear Sky",                          icon: "meteo_clear_sky.png" },
  1:  { desc: "Mainly Clear",                       icon: "meteo_mainly_clear.png" },
  2:  { desc: "Partly Cloudy",                      icon: "meteo_partly_cloudy.png" },
  3:  { desc: "Overcast",                           icon: "meteo_overcast.png" },
  45: { desc: "Fog",                                icon: "meteo_fog.png" },
  48: { desc: "Depositing Rime Fog",                icon: "meteo_rime_fog.png" },
  51: { desc: "Light Drizzle",                      icon: "meteo_light_drizzle.png" },
  53: { desc: "Moderate Drizzle",                   icon: "meteo_moderate_drizzle.png" },
  55: { desc: "Dense Drizzle",                      icon: "meteo_dense_drizzle.png" },
  56: { desc: "Light Freezing Drizzle",             icon: "meteo_light_freezing_drizzle.png" },
  57: { desc: "Heavy Freezing Drizzle",             icon: "meteo_heavy_freezing_drizzle.png" },
  61: { desc: "Slight Rain",                        icon: "meteo_slight_rain.png" },
  63: { desc: "Moderate Rain",                      icon: "meteo_moderate_rain.png" },
  65: { desc: "Heavy Rain",                         icon: "meteo_heavy_rain.png" },
  66: { desc: "Light Freezing Rain",                icon: "meteo_light_freezing_rain.png" },
  67: { desc: "Heavy Freezing Rain",                icon: "meteo_heavy_freezing_rain.png" },
  71: { desc: "Slight Snowfall",                    icon: "meteo_slight_snowfall.png" },
  73: { desc: "Moderate Snowfall",                  icon: "meteo_moderate_snowfall.png" },
  75: { desc: "Heavy Snowfall",                     icon: "meteo_heavy_snowfall.png" },
  77: { desc: "Snow Grains",                        icon: "meteo_snow_grains.png" },
  80: { desc: "Slight Rain Showers",                icon: "meteo_slight_rain_showers.png" },
  81: { desc: "Moderate Rain Showers",              icon: "meteo_moderate_rain_showers.png" },
  82: { desc: "Violent Rain Showers",               icon: "meteo_violent_rain_showers.png" },
  85: { desc: "Slight Snow Showers",                icon: "meteo_slight_snow_showers.png" },
  86: { desc: "Heavy Snow Showers",                 icon: "meteo_heavy_snow_showers.png" },
  95: { desc: "Thunderstorm",                       icon: "meteo_thunderstorm.png" },
  96: { desc: "Thunderstorm with Slight Hail",      icon: "meteo_thunderstorm_slight_hail.png" },
  99: { desc: "Thunderstorm with Heavy Hail",       icon: "meteo_thunderstorm_heavy_hail.png" }
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

  const convertCode = (code) => {

  }

  for (let i = 0; i < hours.length; i++) {
    items.push({
      id: i + 1,
      date: hours[i].split("T")[0],
      hour: hours[i].split("T")[1].split(":")[0].replace(/^0+(?=\d)/, ""),
      temp: h.temperature_2m[i],
      humidity: h.relative_humidity_2m[i],
      code: weatherCodes[h.weather_code[i]].desc,
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
        <ul key={day.date}>
          <h3 key={days.length + index} className="text-lg font-medium py-2">{day.title}</h3>
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