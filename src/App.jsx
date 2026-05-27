import React, { useState } from "react"
import SearchBar  from "./components/SearchBar"

function App() {
  // this links the weather data to future display components
  const [results, setResults] = useState([])

  return(
    <div>
      <SearchBar onResults={setResults} />
    </div>
  )
}

export default App
