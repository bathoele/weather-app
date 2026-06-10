import React, { useState } from "react";

function NavMenu({current, onActive}) {

  const pages = [
    { name: "Today", id: "today"},
    { name: "Hourly", id: "hourly"},
    { name: "7 Day", id: "daily"}  
  ]

  const setStatus = (status) => {
    return status === current ? 'active bg-green-800 text-white' : '';
  }
  
  return(
    <nav className="inline-flex ml-5">
      <ul className="flex gap-1">
      {pages.map((page) => (
        <li
          key={page.id}
          className="inline"
        >
          <button
            className={`${setStatus(page.id)} rounded-full px-4 h-9 cursor-pointer font-bold`}
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