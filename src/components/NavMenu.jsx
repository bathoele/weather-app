import React, { useState } from "react";

function NavMenu({current, onActive}) {

  const pages = [
    { name: "Today", id: "today"},
    { name: "Hourly", id: "hourly"},
    { name: "7 Day", id: "daily"}  
  ]

  const handleClick = (page) => {
    console.log(page);
    onActive(page);
  }
  
  return(
    <nav>
      <ul>

      {pages.map((page) => {
        <li
          key={page.id}
          className={page.id == current ? 'active' : ''}
          onClick={handleClick(page.id)}
        >
          {page.name}
        </li>
      })}
      </ul>
        
    </nav>
  )
}

export default NavMenu; 