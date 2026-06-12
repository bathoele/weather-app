import React, { useState } from "react"
import SearchBar  from "./components/SearchBar"
import DisplayContainer from "./components/DisplayContainer"
import NavMenu from "./components/NavMenu";

function App() {
  // this links the weather data to future display components
  const [results, setResults] = useState(null);

  return (
    <div className="pt-5">
      <div className={`ml-auto mr-auto ${results === null ? "w-75" : "w-200"}`}>
        <SearchBar onResults={setResults} />
        {results && <DisplayContainer data={results} />}
      </div>
    </div>
  );
}

export default App