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
      console.log(results);

      setSuggestions(results);
      setOpen(results.length > 0);
    }, 300);
  }, [query]);

  //const handleInput = async (event) => {
  //  event.preventDefault();
  //  if (!query) return;

  //  // configure server to return full weather data from the submit endpoint
  //  const res = await fetch(`http://localhost:3000/submit?q=${encodeURIComponent(query)}`);
  //  const data = await res.json();
  //  onResults(data);
  //}

  return (
    <div
      style={{ position: "relative" }}
    >
      <form>
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
              style={{ padding: "8px 12px" }}
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