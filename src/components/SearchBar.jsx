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
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=3`);
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

    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(long)}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant,relative_humidity_2m_max,sunrise,sunset&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,cloud_cover,uv_index,precipitation_probability,is_day&current=temperature_2m&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto`);
    const data = await res.json();
    const resArray = {...data, ...{ name: choice.name, admin1: choice.admin1 }};
    onResults(resArray);
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
          className="border-2 border-gray-200 p-1 pl-4 rounded-l-full focus:outline-none focus:border-orange-400 z-20 bg-white"
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
        <div className="absolute z-10 w-fit">
          <ul
            role="listbox"
            className="relative -top-6 left-0 right-0 m-0 p-0 pt-7 bg-gray-100 rounded-b-xl overflow-hidden"
          >
            {suggestions.map((l, index) => (
              <li
                key={l.id}
                role="option"
                onMouseDown={() => {setQuery(l); setOpen(false); handleChoice(l)}}
                className={`cursor-pointer py-2 px-4  bg-gray-100 ${index === 2 ? "pb-4" : ""} hover:bg-orange-100`}
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