import React, { useEffect, useState, useRef } from "react";

function SearchBar() {
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

    const lat = choice.latitude;
    const long = choice.longitude;

    const res = await fetch(`http://localhost:3000/submit?lat=${encodeURIComponent(lat)}&long=${encodeURIComponent(long)}`);
    const data = await res.json();
    // onResults(data);
  }

  const handleInput = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleChoice(suggestions[0]);
    }
  }

  return (
    <div
      style={{ position: "relative" }}
    >
      <form onSubmit={handleInput}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            zIndex: 1000,
          }}
        >
          {suggestions.map((l) => (
            <li
              key={l.id}
              role="option"
              // add onMouseDown action
              onMouseDown={() => {setQuery(l); setOpen(false); handleChoice(l)}}
              style={{ padding: "8px 12px", cursor: "pointer" }}
            >
              {l.name}, {l.admin1}
            </li>
          ))}
        </ul>
      )} 
    </div>
  )
}

export default SearchBar