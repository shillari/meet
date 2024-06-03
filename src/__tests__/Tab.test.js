// src/__tests__/Tab.test.js

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import Tab from '../components/Tab';

class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}

describe('<Tab /> component', () => {
  window.ResizeObserver = ResizeObserver;
  let tabComponent;
  beforeEach(() => {
    tabComponent = render(<Tab />).container.firstChild;
  });

  test('citySearch should be hide as default', () => {
    expect(screen.getByTestId('filter-div')).toHaveClass('filter-options inactive');
    expect(tabComponent.querySelector('#city-search')).toBeInTheDocument();
  });

  test('numberOfEvents should be hide as default', () => {
    expect(screen.getByTestId('filter-div')).toHaveClass('filter-options inactive');
    expect(tabComponent.querySelector('#number-events-search')).toBeInTheDocument();
  });

  test('renders list of events in default tab', () => {
    expect(tabComponent.querySelector('#event-list')).toBeInTheDocument();
  });

  test('renders img', () => {
    let image = tabComponent.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'logo-name.png');
    expect(image).toHaveAttribute('alt', 'logo name');
  });

  test('render filter button', () => {
    const filter = tabComponent.querySelector('.filter-button');
    expect(filter).toBeInTheDocument();
  });

  test('user can click to see filters', async () => {
    const filter = tabComponent.querySelector('.filter-button');
    const user = userEvent.setup();

    await user.click(filter);

    expect(screen.getByTestId('filter-div')).toHaveClass('filter-options active');
  });

  test('user can hide filter', async () => {
    const filter = tabComponent.querySelector('.filter-button');
    const user = userEvent.setup();

    await user.click(filter);

    expect(screen.getByTestId('filter-div')).toHaveClass('filter-options active');

    await user.click(filter);

    expect(screen.getByTestId('filter-div')).toHaveClass('filter-options inactive');
  });

  test('renders default tab button active', () => {
    const tabHeader = tabComponent.querySelector('.tab-header');
    const eventButton = screen.getByText('Events');
    const dataVisualization = screen.getByText('Data visualization');

    expect(tabHeader).toBeInTheDocument();
    expect(eventButton).toHaveClass('active');
    expect(dataVisualization).not.toHaveClass('active');
  });

  test('button click changes active tab class', async () => {
    const user = userEvent.setup();
    const eventButton = screen.getByText('Events');
    const dataVisualization = screen.getByText('Data visualization');

    expect(eventButton).toHaveClass('active');
    expect(dataVisualization).not.toHaveClass('active');

    await user.click(dataVisualization);

    expect(eventButton).not.toHaveClass('active');
    expect(dataVisualization).toHaveClass('active');
  });
});

describe('<Tab /> integration', () => {
  let tabComponent;
  beforeEach(() => {
    tabComponent = render(<Tab />).container.firstChild;
  });

  test('user can change the number of events displayed', async () => {
    const user = userEvent.setup();
    const filter = tabComponent.querySelector('.filter-button');

    await user.click(filter);

    const NumberOfEventsComponent = tabComponent.querySelector('#number-events-search');
    const NumberOfEventsInput = within(NumberOfEventsComponent).queryByRole('spinbutton');

    await user.type(NumberOfEventsInput, '{backspace}{backspace}20');

    let EventListDOM = tabComponent.querySelector('#event-list');
    let allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

    expect(allRenderedEventItems.length).toBe(20);
  });

  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const filter = tabComponent.querySelector('.filter-button');

    await user.click(filter);

    const CitySearchDOM = tabComponent.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = tabComponent.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

    const allEvents = await getEvents();

    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
});