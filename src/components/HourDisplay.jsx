import React from "react";
import HourItem from "./HourItem";

function HourDisplay({data}) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const hours = data.hourly.time;
  const temps = data.hourly.temperature_2m;
  const items = [];
  const forecastDates = [];
  
  hours.forEach((hour) => {
    forecastDates.push(hour.split("T")[0]);
  });

  const days = [...new Set(forecastDates)];
  days = days.forEach((day) => {
    const date = new Date(day);

    return `${date.getDay()}, ${date}`;
  })

  console.log(days);

  // Add function to join related data as objects in an array. Map through array, sending each object to HourItem
  for (let i = 0; i < hours.length; i++) {
    items.push({
      id: i + 1,
      time: hours[i],
      temp: temps[i]
    });
  }

  return (
    <ul>
      <h3></h3>
      {items.map((item) => (
        // li will instead be a separate component
        <HourItem key={item.id} data={item} />
      ))}
    </ul>
  )
}

export default HourDisplay;