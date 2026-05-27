import React, { useEffect, useState } from "react";

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
    }
  })

  const handleInput = async (event) => {
    event.preventDefault()
    if (!query) return

    const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`)
    const data = await res.json()
    onResults(data)
  }

  return (
    <form onSubmit={handleInput}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar