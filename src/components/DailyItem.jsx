import React from "react";

function DailyItem({data: d}) {
  console.log(d);
  
  return (
    <ul key={d.id}>
      <li>
        {d.date}
      </li>
      <li>
        {d.max_temp}
      </li>
      <li>
        {d.min_temp}
      </li>
      <li>
        {d.code}
      </li>
      <li>
        {d.presip_per}
      </li>
      <li>
        {d.precip_sum}
      </li>
      <li>
        {d.w_dir}
      </li>
      <li>
        {d.w_speed}
      </li>
      <li>
        <ul>
          <li>
            {d.uv}
          </li>
          <li>
            {d.humidity}
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default DailyItem;