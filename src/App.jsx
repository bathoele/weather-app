import React, { useState } from "react"
import SearchBar  from "./components/SearchBar"
import DisplayContainer from "./components/DisplayContainer"

function App() {
  // this links the weather data to future display components
  const [results, setResults] = useState(null);

  return (
    <div>
      <SearchBar onResults={setResults} />
      {results && <DisplayContainer data={results} />}
    </div>
  );
}

export default App