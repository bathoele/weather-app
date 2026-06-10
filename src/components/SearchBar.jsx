import React, { useEffect, useState, useRef } from "react";

function SearchBar({ onResults }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  // the open hook controls suggestion list display
  const [open, setOpen] = useState(false);
  const deboRef = useRef(null);

  useEffect(() => {
    // sets 3 character minimum to start calling suggestions
    if (query.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    // clears the timeout of the current debounce setTimeout below
    clearTimeout(deboRef.current);
    deboRef.current = setTimeout(async () => {
      const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      const results = data.results || [];

      setSuggestions(results);
      setOpen(suggestions.length > 0);
    }, 200);
  }, [query]);

  const handleChoice = async (choice) => {
    clearTimeout(deboRef.current);
    setQuery("");
    setSuggestions([]);
    setOpen(false);

    // might have to send choice.name to the forecast display component here
    const lat = choice.latitude;
    const long = choice.longitude;

    const res = await fetch(`http://localhost:3000/submit?lat=${encodeURIComponent(lat)}&long=${encodeURIComponent(long)}`);
    const data = await res.json();
    onResults(data);
  }

  const handleInput = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleChoice(suggestions[0]);
    }
  }

  return (
    <div className="inline">
      <form
        className="inline-flex h-11"
        onSubmit={handleInput}>
        <input
          className="border-2 border-gray-200 p-1 pl-4 rounded-l-full focus:outline-none focus:border-green-800 z-20 bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city or zip"
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          autoComplete="off"
        />
        <button
          className="bg-gray-200 rounded-r-full pl-2 pr-4 z-20 cursor-pointer"
          type="submit"
        >
          Search
        </button>
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute z-10">
          <ul
            role="listbox"
            className="relative -top-6 left-0 right-0 m-0 p-0 pt-7 bg-gray-100 rounded-b-xl overflow-hidden"
          >
            {suggestions.map((l, index) => (
              <li
                key={l.id}
                role="option"
                onMouseDown={() => {setQuery(l); setOpen(false); handleChoice(l)}}
                className={`cursor-pointer py-2 px-4  bg-gray-100 ${index === 2 ? "pb-4" : ""} hover:bg-green-100`}
              >
                {l.name}, {l.admin1}
              </li>
            ))}
          </ul>
        </div>
      )} 
    </div>
  )
}

export default SearchBar