import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const NOEStored = localStorage.getItem('NOEfilter');
  const [query, setQuery] = useState(NOEStored ? NOEStored : '32');

  const handleInputChanged = (e) => {
    const value = e.target.value;
    setQuery(value);
    localStorage.setItem('NOEfilter', value);

    setErrorAlert('');

    if (!isPositiveInteger(value)) {
      setErrorAlert('Only positive numbers are allowed');
      setCurrentNOE(0);
    } else {
      setCurrentNOE(value);
    }
  }

  function isPositiveInteger(value) {
    const number = Number(value);
    return Number.isInteger(number) && number > 0;
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