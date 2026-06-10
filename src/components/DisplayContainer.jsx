import React, { useState } from "react";
import HourDisplay from "./HourDisplay";
import TodayDisplay from "./TodayDisplay";
import DailyDisplay from "./DailyDisplay";
import NavMenu from "./NavMenu";

function DisplayContainer({data}) {
  const [active, setActive] = useState("hourly");

  const icons = import.meta.glob('/node_modules/@meteocons/svg/fill/*.svg', {
    eager: true,
    query: '?url',
    import: 'default'
  })

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
    return icons[`/node_modules/@meteocons/svg/fill/${name}.svg`];
  }

  return(
    <React.Fragment>
      <NavMenu current={active} onActive={setActive}/>
      <div className="font-bold text-xl mt-6">
        {data.name}, {data.admin1}
      </div>
      {active === "today" ? <TodayDisplay data={data} /> : null}
      {active === "hourly" ? <HourDisplay data={data} getIcon={getIcon} weatherCodes={weatherCodes} /> : null}
      {active === "daily" ? <DailyDisplay data={data} getIcon={getIcon} weatherCodes={weatherCodes} /> : null}
    </React.Fragment>
  )
}

export default DisplayContainer;