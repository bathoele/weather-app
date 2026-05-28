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
      setOpen(results.length > 0);
    }, 200);
  }, [query]);

  // temporarily removed async
  const handleChoice = (choice) => {
    setQuery(choice.name);
    setSuggestions([]);
    setOpen(false);

    // configure server to return full weather data from the submit endpoint
    // const res = await fetch(`http://localhost:3000/submit?q=${encodeURIComponent(query)}`);
    // const data = await res.json();
    // onResults(data);
  }

  const handleInput = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
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
              onMouseDown={() => {setQuery(l.name); setOpen(false); handleInput}}
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