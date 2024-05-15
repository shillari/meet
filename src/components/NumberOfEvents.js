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
      <input
        type="text"
        className="number-events"
        placeholder="number of events"
        value={query}
        onChange={handleInputChanged}
      />
    </div>
  );
}

export default NumberOfEvents;