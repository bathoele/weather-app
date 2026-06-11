import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

function TempChart({data, getIcon}) {
  const h = data.hourly;

  const formatTime = (time) => {
    const hour = (time % 12) || 12;

    return `${hour}${time >= 12 ? "pm" : "am"}`;
  }

  const date = new Date();

  let hoursArr = [];
  for (const [index, hour] of h.time.entries()) {
    if (hoursArr.length === 14) break;
    if (new Date(hour).getHours() >= date.getHours() || new Date(hour).getDate() > date.getDate()) {
      hoursArr.push({
        time: formatTime(hour.split("T")[1].split(":")[0]),
        temp: Math.floor(h.temperature_2m[index]),
        icon: getIcon(h.weather_code[index], h.is_day[index])
      });
    };
  }

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
    <text x={x} y={y + 16} className="text-sm" textAnchor="middle">{payload.value}</text>
  )

  return (
    <div className="mt-5">
      <ResponsiveContainer width="100%" height={225}>
        <LineChart data={hoursArr} margin={{ left: 40, right: 40, top: 10 }}>
          <CartesianGrid  strokeDasharray={0} horizontal={false} vertical={true} stroke="#eaeaea" />

          <XAxis xAxisId="icons" dataKey="time" tick={<IconTick />} tickLine={false} axisLine={false} height={40} />
          <XAxis xAxisId="labels" dataKey="time" tick={<TimeTick />} tickLine={false} axisLine={false} height={30} orientation="bottom" />

          <YAxis domain={["dataMin - 2", "dataMax + 5"]} hide />

          <Line
            xAxisId="labels"
            type="monotone"
            dataKey="temp"
            label={{ position: "top", offset: 15, fontSize: 20, fill: "black", formatter: v => `${v}°`}}
            stroke="darkorange"
            strokeWidth={2}
            dot={{ r: 3, fill: "darkorange" }}
            activeDot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TempChart