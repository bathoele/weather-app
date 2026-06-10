import React, { useState } from "react";
import HourDisplay from "./HourDisplay";
import TodayDisplay from "./TodayDisplay";
import DailyDisplay from "./DailyDisplay";
import NavMenu from "./NavMenu";

function DisplayContainer({data}) {
  const [active, setActive] = useState("hourly");

  return(
    <React.Fragment>
      <NavMenu current={active} onActive={setActive}/>
      {active === "today" ? <TodayDisplay data={data} /> : null}
      {active === "hourly" ? <HourDisplay data={data} /> : null}
      {active === "daily" ? <DailyDisplay data={data} /> : null}
    </React.Fragment>
  )
}

export default DisplayContainer;