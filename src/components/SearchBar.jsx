import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState('')

  const handleInput = async (event) => {
    event.preventDefault()
    if (!query) return

    const res = await fetch(`/search?q=${encodeURIComponent(query)}`)
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