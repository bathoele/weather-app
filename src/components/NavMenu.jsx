import React, { useState } from "react";

function NavMenu({current, onActive}) {

  const pages = [
    { name: "Today", id: "today"},
    { name: "Hourly", id: "hourly"},
    { name: "7 Day", id: "daily"}  
  ]
  
  return(
    <nav>
      {pages.map((page) => {
        <button
          key={page.id}
          className={active == page.id ? 'active' : ''}
          onClick={onActive(page.id)}
        >
          {page.name}
        </button>
      })}
        
    </nav>
  )
}

export default NavMenu;