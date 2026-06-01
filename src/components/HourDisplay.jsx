import React from "react";
import HourItem from "./HourItem";

function HourDisplay({data}) {
  const hours = data.hourly.time;
  const temps = data.hourly.temperature_2m;
  const itemsArray = [];

  // Add function to join related data as objects in an array. Map through array, sending each object to HourItem
  for (let i = 0; i < hours.length; i++) {
    itemsArray.push({
      id: i + 1,
      time: hours[i],
      temp: temps[i]
    });
  }

  return (
    <ul>
      {itemsArray.map((item) => (
        // li will instead be a separate component
        <HourItem key={item.id} data={item} />
      ))}
    </ul>
  )
}

export default HourDisplay;