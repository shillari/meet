import { render, waitFor, within } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  let AppComponent;
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('the main page is open', () => {
      AppComponent = render(<App />).container.firstChild;
    });

    when('the list of event is displayed', async () => {
      const EventListDOM = AppComponent.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });

    then('the event details are hidden', () => {
      expect(AppComponent.querySelector('#details')).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    let AppComponent;
    let EventListItems;
    given('the list of events is displayed and each event has a button SHOW', async () => {
      AppComponent = render(<App />).container.firstChild;
      const EventListDOM = AppComponent.querySelector('#event-list');

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');

        EventListItems.forEach(event => {
          const button = within(event).getByRole('button');
          expect(button).toHaveClass('detail-btn');
        });
        expect(EventListItems.length).toBe(32);
      });
    });

    let eventSelected;
    when('the user click in the button SHOW in one event', async () => {
      eventSelected = EventListItems[0];
      const detailsButton = eventSelected.querySelector('.detail-btn');
      const user = userEvent.setup();

      await user.click(detailsButton);
    });

    then('the event details are shown below the event', () => {
      expect(eventSelected.querySelector('#details')).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    let eventSelected;
    let detailsButton;
    given('the event details are shown with a button HIDE', async () => {
      const AppComponent = render(<App />).container.firstChild;
      const EventListDOM = AppComponent.querySelector('#event-list');

      let EventListItems;
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });

      eventSelected = EventListItems[0];
      detailsButton = within(eventSelected).getByRole('button');
      const user = userEvent.setup();

      await user.click(detailsButton);

      expect(detailsButton.textContent).toContain('hide details');
    });

    when('the user clicks the button HIDE in the event', async () => {
      const user = userEvent.setup();

      await user.click(detailsButton);
    });

    then('the details are hidden', () => {
      expect(eventSelected.querySelector('#details')).not.toBeInTheDocument();
      expect(detailsButton.textContent).toContain('show details');
    });
  });

});