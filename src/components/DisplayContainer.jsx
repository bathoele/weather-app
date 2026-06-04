import React, { useState } from "react";
import HourDisplay from "./HourDisplay";
import TodayDisplay from "./TodayDisplay";
import DailyDisplay from "./DailyDisplay";
import NavMenu from "./NavMenu";

function DisplayContainer({data}) {
  const [active, setActive] = useState("today");

  const components = [
    { name: "today", el: `${<TodayDisplay data={data} />}`},
    { name: "hourly", el: `${<HourDisplay data={data} />}`},
    { name: "daily", el: `${<DailyDisplay data={data} />}`}
  ]

  return(
    <div>
      <NavMenu current={active} onActive={setActive}/>
      {components.map((comp) => {
        if (comp.name == active) return comp.el;
      })}
    </div>
  )
}

export default DisplayContainer;