import { render, waitFor, within } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user has not specified a number, 32 events are shown by default', ({ given, when, then }) => {
    let AppComponent;
    given('the main page is open', () => {
      AppComponent = render(<App />).container.firstChild;
    });

    when('user has not specified a number of events to show', () => {

    });

    then('thirty-two events are shown', async () => {
      const EventListDOM = AppComponent.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User can change the number of events displayed', ({ given, and, when, then }) => {
    let AppComponent;
    given('the main page is open', () => {
      AppComponent = render(<App />).container.firstChild;
    });

    let user = userEvent.setup();
    and('user clicks to enable filters display', async () => {
      const filter = AppComponent.querySelector('.filter-button');

      await user.click(filter);
    });

    when('the user enters the number of events to show', async () => {
      const eventsInput = AppComponent.querySelector('.number-events');

      await user.type(eventsInput, '{backspace}{backspace}20');
    });

    then('the number of event entered by the user is shown', () => {
      const EventListDOM = AppComponent.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');

      expect(EventListItems).toHaveLength(20);
    });
  });
});