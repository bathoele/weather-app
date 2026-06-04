import React, { useState } from "react";

function NavMenu({current, onActive}) {
  const [active, setActive] = useState("today");

  const pages = ["Today", "Hourly", "7 Day"]

  const handleClick = (page) => {
    setActive(page);
  }
  
  return(
    <nav>
      {pages.map((page) => {
        <button
          key={page}
          className={active == page ? 'active' : ''}
          onClick={handleClick(page)}
        >
          {page}
        </button>
      })}
        
    </nav>
  )
}

export default NavMenu;