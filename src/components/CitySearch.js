import { useState, useEffect, useRef } from "react";
import { CiLocationOn } from "react-icons/ci";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`])

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // to hide the list
    setCurrentCity(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div id="city-search">
      <label>City: </label>
      <div className="input-city">

        <CiLocationOn />
        <input
          type="text"
          className="city"
          placeholder="Search for a city"
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onChange={handleInputChanged}
        />
      </div>
      {showSuggestions ?
        <>
          <ul ref={containerRef} className="suggestions">
            <li onClick={handleItemClicked} key='See all cities'>
              <b>See all cities</b>
            </li>
            {suggestions && suggestions.map((suggestion) => {
              return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
            })}
          </ul>
        </> : null}
    </div>
  );
}

export default CitySearch;