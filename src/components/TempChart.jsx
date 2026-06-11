import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function TempChart({data, getIcon}) {
  const h = data.hourly;
  let hoursArr = [];
  

  for (let i = 0; i < 12; i++) {
    hoursArr.push(
      {
        time: h.time[i].split("T")[1],
        temp: Math.floor(h.temperature_2m[i]),
        icon: getIcon(h.weather_code[i], h.is_day[i]),
      }
    );
  };

  const iconMap = Object.fromEntries(hoursArr.map(d => [d.time, d.icon]));

  const IconTick = ({ x, y, payload }) => (
    <image
      href={iconMap[payload.value]}
      x={x - 18}
      y={y}
      width={36}
      height={36}
    />
  )

  const TimeTick = ({ x, y, payload }) => (
    <text x={x} y={y + 16} textAnchor="middle">{payload.value}</text>
  )

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={hoursArr}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis xAxisId="icons" dataKey="time" tick={<IconTick />} tickLine={false} axisLine={false} height={40} />
          <XAxis xAxisId="labels" dataKey="time" tick={<TimeTick />} tickLine={false} axisLine={false} height={30} orientation="bottom" />

          <YAxis domain={["dataMin - 2", "dataMax + 5"]} hide />

          <Line
            xAxisId="labels"
            type="monotone"
            dataKey="temp"
            label={{ position: "top", fontSize: 11, fill: "#f97316", formatter: v => `${v}°`}}

          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TempChart