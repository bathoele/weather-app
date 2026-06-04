import React, { useState } from "react";

function NavMenu({current, onActive}) {

  const pages = [
    { name: "Today", id: "today"},
    { name: "Hourly", id: "hourly"},
    { name: "7 Day", id: "daily"}  
  ]

  const handleClick = (page) => {
    onActive(page);
  }
  
  return(
    <nav>
      <ul>

      {pages.map((page) => (
        <button
          key={page.id}
          className={page.id === current ? 'active' : ''}
          onClick={() => handleClick(page.id)}
        >
          {page.name}
        </button>
      ))}
      </ul>
        
    </nav>
  )
}

export default NavMenu; 