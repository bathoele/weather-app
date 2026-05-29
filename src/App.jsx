import React, { useState } from "react"
import SearchBar  from "./components/SearchBar"
import DisplayContainer from "./components/DisplayContainer"

function App() {
  // this links the weather data to future display components
  const [results, setResults] = useState([])

  return(
    <div>
      <SearchBar onResults={setResults} />
      <DisplayContainer />
    </div>
  )
}

export default App