// src/__tests__/Event.test.js

import { render } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;
  let event;
  beforeEach(async () => {
    allEvents = await getEvents();
    event = allEvents[0];
    EventComponent = render(<Event event={event} />);
  })

  test('has an element with "listitem"', () => {
    expect(EventComponent.queryByRole('listitem')).toBeInTheDocument();
  });

  test('renders event title', () => {
    // Checks if exists 'h1'
    expect(EventComponent.queryByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
  });

  test('renders date of event', () => {
    expect(EventComponent.queryByText(event.created)).toBeInTheDocument();
  });

  test('renders location of the event', () => {
    expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
  });

  test('an event element is collapsed by default', () => {
    expect(EventComponent.container.querySelector('#details')).not.toBeInTheDocument();
  });

  test('user can expand an event to see details', async () => {
    const user = userEvent.setup();
    const buttonDetails = EventComponent.queryByText('show details');
    await user.click(buttonDetails);

    expect(EventComponent.container.querySelector('#details')).toBeInTheDocument();
    expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
  });

  test('user can collapse an event to hide details', async () => {
    const user = userEvent.setup();
    let buttonDetails = EventComponent.queryByText('show details');
    await user.click(buttonDetails);

    expect(EventComponent.container.querySelector('#details')).toBeInTheDocument();
    expect(EventComponent.queryByText('hide details')).toBeInTheDocument();

    buttonDetails = EventComponent.queryByText('hide details');
    await user.click(buttonDetails);

    expect(EventComponent.container.querySelector('#details')).not.toBeInTheDocument();
  });
});