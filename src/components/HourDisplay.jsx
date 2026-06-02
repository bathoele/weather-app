import React from "react";
import HourItem from "./HourItem";

function HourDisplay({data}) {
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const nowHour = new Date().getHours();
  
  const hours = data.hourly.time;
  const temps = data.hourly.temperature_2m;
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

  console.log(days);
  for (let i = 0; i < hours.length; i++) {
    items.push({
      id: i + 1,
      date: hours[i].split("T")[0],
      hour: hours[i].split("T")[1].split(":")[0].replace(/^0+(?=\d)/, ""),
      temp: temps[i]
    });
  }

  return (
    <div>
      {days.map((day, index) => (
        <ul>
          <h3>{day.title}</h3>
          {items.map((item) => {
            if (index == 0) {
              return item.hour >= nowHour ? <HourItem key={item.id} data={item} /> : null;
            } else if (item.date == day.date) return <HourItem key={item.id} data={item} />;
          })}
        </ul>
      ))}
    </div>
  )
}

export default HourDisplay;