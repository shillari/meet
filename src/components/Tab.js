import React, { useState, useEffect } from 'react';
import { getEvents, extractLocations } from '../api';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import '../App.css';
import logo from '../img/logo-name.png';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";

const Tab = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [filter, setFilter] = useState(false);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterClick = () => {
    setFilter(!filter);
  };

  return (
    <div id="tabs">
      <img src={logo} width={95} height={30.6} alt="logo name" />
      <div className="tab-header">
        <button
          className={`tab-link ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab1')}
        >
          <IoFileTrayFullOutline /> Events
        </button>
        <button
          className={`tab-link ${activeTab === 'tab2' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab2')}
        >
          <VscGraph /> Data visualization
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div className="tab-pane active" id="tab1">
            <button onClick={handleFilterClick} className='filter-button'>Filter {filter ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
            {filter ? <><CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
              <NumberOfEvents setCurrentNOE={setCurrentNOE} /></>
              : null}
            <EventList events={events} />
          </div>
        )}
        {activeTab === 'tab2' && (
          <div className="tab-pane active" id="tab2">
            <h2>Coming soon...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
