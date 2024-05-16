import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      {event &&
        <div className="event-content">
          <h1>{event.summary}</h1>
          <p><IoLocationOutline /> {event.location}</p>
          <p><IoCalendarOutline /> {event.created}</p>

          {showDetails &&
            <p id="details">{event.description}</p>
          }
          <button className="detail-btn" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ?
              "hide details" : "show details"}
          </button>
        </div>
      }
    </li>
  );
}

export default Event;