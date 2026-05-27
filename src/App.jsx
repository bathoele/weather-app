import React, { useState } from "react"
import SearchBar  from "./components/SearchBar"

function App() {
  const [results, setResults] = useState([])

  return(
    <div>
      <SearchBar onResults={setResults} />
    </div>
  )
}

export default App
