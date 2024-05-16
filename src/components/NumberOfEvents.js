import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [query, setQuery] = useState('32');

  const handleInputChanged = (e) => {
    const value = e.target.value;
    setQuery(value);
    setCurrentNOE(value);
  }

  return (
    <div id="number-events-search">
      <label>Number of events: </label>
      <div><input
        type="number"
        min={0}
        className="number-events"
        placeholder="events"
        value={query}
        onChange={handleInputChanged}
      />
      </div>
    </div>
  );
}

export default NumberOfEvents;