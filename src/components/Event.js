import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      {event &&
        <div>
          <h1>{event.summary}</h1>
          <p>{event.created}</p>
          <p>{event.location}</p>
          {showDetails &&
            <p id="details">{event.description}</p>
          }
          <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ?
              "hide details" : "show details"}
          </button>
        </div>
      }
    </li>
  );
}

export default Event;