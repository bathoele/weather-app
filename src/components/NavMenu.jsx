import React, { useState } from "react";

function NavMenu({current, onActive}) {

  const pages = [
    { name: "Today", id: "today"},
    { name: "Hourly", id: "hourly"},
    { name: "7 Day", id: "daily"}  
  ]

  const setStatus = (status) => {
    return status === current ? 'active border-2 border-green-800' : 'border-2 border-transparent text-green-800';
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
            className={`${setStatus(page.id)} rounded-full px-5 py-2 cursor-pointer font-bold transition-all duration-400`}
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