import React, { useEffect, useState, useRef } from "react";

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  // open state controls suggestion list display
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
      console.log(results[0].name);

      // use map callback to set all 3 names as suggestions
      setSuggestions(results[0].name);
      setOpen(results.length > 0);
    }, 300);
  }, [query]);

  const handleInput = async (event) => {
    event.preventDefault();
    if (!query) return;

    // configure server to return full weather data from the submit endpoint
    const res = await fetch(`http://localhost:3000/submit?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    onResults(data);
  }

  return (
    <div>
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
    </div>
  )
}

export default SearchBar