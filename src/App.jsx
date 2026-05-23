import React, { useState } from "react"
import SearchBar  from "./components/SearchBar"

function App() {
  const [results, setResults] = useState([])

  return(
    <div>
      <SearchBar onResults={setResults} />
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}

export default App
