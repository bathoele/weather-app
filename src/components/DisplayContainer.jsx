import React, { useState } from "react";
import HourDisplay from "./HourDisplay";
import TodayDisplay from "./TodayDisplay";
import DailyDisplay from "./DailyDisplay";

function DisplayContainer({data}) {

  return(
    // <HourDisplay data={data} />
    <TodayDisplay data={data} />
  )
}

export default DisplayContainer;