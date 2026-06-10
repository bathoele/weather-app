import React, { useState } from "react";

function NavMenu({current, onActive}) {

  const pages = [
    { name: "Today", id: "today"},
    { name: "Hourly", id: "hourly"},
    { name: "7 Day", id: "daily"}  
  ]
  
  return(
    <nav className="inline-flex ml-5">
      <ul className="flex gap-4">
      {pages.map((page) => (
        <li
          key={page.id}
          className="inline"
        >
          <button
            className={page.id === current ? 'active' : ''}
            onClick={() => onActive(page.id)}
            >
            {page.name}
          </button>
        </li>
      ))}
      </ul>
        
    </nav>
  )
}

export default NavMenu; 