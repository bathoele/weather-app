import React, { useState } from "react";

function NavMenu() {
  const [active, setActive] = useState("today");

  const handleClick = () => {

  }
  
  return(
    <nav>
      <button
        className="today"
        onClick={setActive(this.className)}
      >
        Today
      </button>
      <button
        className="hourly"
        onClick={setActive(this.className)}
      >
        Hourly
      </button>
      <button
        className="daily"
        onClick={setActive(this.className)}
      >
        7 Day
      </button>
    </nav>
  )
}

export default NavMenu;