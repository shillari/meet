Feature: User can show/hide filters
  Scenario: Filters should be hide as default
    Given the main is open
    When user has not click to show filters
    Then the filters are not shown

  Scenario: User can enable filters display
    Given the main is open
    When user clicks on the filter button
    Then the filters are shown

  Scenario: User can disable filters display
    Given the filters are shown
    When user clicks on the filter button
    Then the filters are hidden