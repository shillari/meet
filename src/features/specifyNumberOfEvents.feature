Feature: Specify Number of Events
  Scenario: When user has not specified a number, 32 events are shown by default
    Given the main page is open
    When user has not specified a number of events to show
    Then thirty-two events are shown

  Scenario: User can change the number of events displayed
    Given the main page is open
    And user clicks to enable filters display
    When the user enters the number of events to show
    Then the number of event entered by the user is shown