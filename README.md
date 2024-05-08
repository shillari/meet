# Meet
An APP to search upcoming events around you.

## Features & Scenarios
- Feature 1: Filter Events By City
    <br/>__As a__ user,
    <br/>__I should be able to__ filter events by city,
    <br/>__So that__ I can see a list of events taking place in that city.

  - Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
    <br/>Given user hasn’t searched for any city;
    <br/>When the user opens the app;
    <br/>Then the user should see a list of upcoming events.

  - Scenario 2: User should see a list of suggestions when they search for a city.
    <br/>Given the main page is open;
    <br/>When user starts typing in the city textbox;
    <br/>Then the user should receive a list of cities (suggestions) that match what they’ve typed.

  - Scenario 3: User can select a city from the suggested list.	
    <br/>Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
    <br/>When the user selects a city (e.g., “Berlin, Germany”) from the list;
    <br/>Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

- Feature 2: Show/Hide Event Details
    <br/>__As a__ user,
    <br/>__I should be__ able to show/hide event details,
    <br/>__So that__ I can control whether details are displayed.

  - Scenario 1: An event element is collapsed by default.
    <br/>Given the main page is open;
    <br/>When the list of event is displayed;
    <br/>Then the event details are hidden.

  - Scenario 2: User can expand an event to see details.
    <br/>Given the list of events is displayed and each event has a button SHOW;
    <br/>When the user click in the button SHOW in one event;
    <br/>Then the event details are shown below the event.

  - Scenario 3: User can collapse an event to hide details.
    <br/>Given the event details are shown with a button HIDE;
    <br/>When the user clicks the button HIDE in the event;
    <br/>Then the details are hidden.

- Feature 3: Specify Number of Events
    <br/>__As a__ user,
    <br/>__I should be able to__ specify number of events,
    <br/>__So that__ I have control over the displayed event limit.

  - Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
    <br/>Given the main page is open;
    <br/>When user hasn't spcified a number of events to show;
    <br/>Then 32 events are shown;

  - Scenario 2: User can change the number of events displayed.
    <br/>Given the main page is open;
    <br/>When the user enter the number of events to show;
    <br/>Then the number of event entered by the user is shown.

- Feature 4: Use the App When Offline
    <br/>__As a__ user,
    <br/>__I should be able to__ use the app when offline,
    <br/>__So that__ when I am not connected to internet I can still use the app. 

  - Scenario 1: Show cached data when there’s no internet connection.
    <br/>Given user has no internet connection and open the app;
    <br/>When the main page is open;
    <br/>Then the cached events is shown.

  - Scenario 2: Show error when user changes search settings (city, number of events).
    <br/>Given the main page is open;
    <br/>When user enters a city to search or inputs a number of events to show;
    <br/>Then a message is shown informing the user that the app does not have internet access.

- Feature 5: Add an App Shortcut to the Home Screen
    <br/>__As a__ user,
    <br/>__I should be able to__ add an app shortcut to the Home screen,
    <br/>__So that__ I can quickly access the app from the home screen.

  - Scenario 1: User can install the meet app as a shortcut on their device home screen.
    <br/>Given app information;
    <br/>When user clicks in the button to add a shortcut on their device home screen;
    <br/>Then the user find a shortcut in ther device home screen.

- Feature 6: Display Charts Visualizing Event Details
    <br/>__As a__ user,
    <br/>__I should be able to__ display charts visualizing event details,
    <br/>__So that__ I can have a macro view of the available events. 

  - Scenario 1: Show a chart with the number of upcoming events in each city.
    <br/>Given the main page is open;
    <br/>When user click in the option to view a chart of upcoming events in each city;
    <br/>Then a chart with the number of upcoming events in each city is shown.
