import { useState } from "react";

const NumberOfEvents = () => {
  const [query, setQuery] = useState('32');

  return (
    <div id="number-events-search">
      <input
        type="text"
        className="number-events"
        placeholder="number of events"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default NumberOfEvents;