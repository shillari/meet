import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      {event &&
        <div>
          <h1>{event.summary}</h1>
          <p>{event.location}</p>
          <p>{event.created}</p>

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