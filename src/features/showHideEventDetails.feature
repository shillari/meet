Feature: Show/Hide Event Details
  Scenario: An event element is collapsed by default.
    Given the main page is open
    When the list of event is displayed
    Then the event details are hidden

  Scenario: User can expand an event to see details
    Given the list of events is displayed and each event has a button SHOW
    When the user click in the button SHOW in one event
    Then the event details are shown below the event

  Scenario: User can collapse an event to hide details
    Given the event details are shown with a button HIDE
    When the user clicks the button HIDE in the event
    Then the details are hidden