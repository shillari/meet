import { render, waitFor, within } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideFilters.feature');

defineFeature(feature, test => {
  test('Filters should be hide as default', ({ given, when, then }) => {
    let AppComponent;
    given('the main is open', () => {
      AppComponent = render(<App />).container.firstChild;
    });

    when('user has not click to show filters', () => {

    });

    then('the filters are not shown', () => {
      expect(AppComponent.querySelector('.filter-options.inactive')).toBeInTheDocument();
    });
  });

  test('User can enable filters display', ({ given, when, then }) => {
    let AppComponent;
    given('the main is open', () => {
      AppComponent = render(<App />).container.firstChild;
    });

    when('user clicks on the filter button', async () => {
      const filterBtn = AppComponent.querySelector('.filter-button');
      const user = userEvent.setup();

      await user.click(filterBtn);
    });

    then('the filters are shown', () => {
      expect(AppComponent.querySelector('.filter-options.active')).toBeInTheDocument();
    });
  });

  test('User can disable filters display', ({ given, when, then }) => {
    let AppComponent;
    let filterBtn;
    let user = userEvent.setup();
    given('the filters are shown', async () => {
      AppComponent = render(<App />).container.firstChild;
      filterBtn = AppComponent.querySelector('.filter-button');

      await user.click(filterBtn);

      expect(AppComponent.querySelector('.filter-options.active')).toBeInTheDocument();
    });

    when('user clicks on the filter button', async () => {
      await user.click(filterBtn);
    });

    then('the filters are hidden', () => {
      expect(AppComponent.querySelector('.filter-options.inactive')).toBeInTheDocument();
    });
  });
});