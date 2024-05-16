import { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
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
        <div style={{ overflowY: 'scroll', height: '150px' }} className="suggestions-div">
          <ul className="suggestions">
            <li onClick={handleItemClicked} key='See all cities'>
              <b>See all cities</b>
            </li>
            {suggestions && suggestions.map((suggestion) => {
              return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
            })}
          </ul>
        </div> : null}
    </div>
  );
}

export default CitySearch;