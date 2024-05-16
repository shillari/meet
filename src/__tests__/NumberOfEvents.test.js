// src/__tests__/NumberOfEvents.test.js

import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventComponent;
  beforeEach(() => {
    NumberOfEventComponent = render(<NumberOfEvents setCurrentNOE={() => { }} />);
  })

  test(('renders text input'), () => {
    const searchBox = NumberOfEventComponent.queryByRole('spinbutton');

    expect(searchBox).toBeInTheDocument();
    expect(searchBox).toHaveClass('number-events');
  });

  test('when user has not specified a number, 32 events are shown by default', () => {
    const searchBox = NumberOfEventComponent.queryByRole('spinbutton');
    expect(searchBox).toHaveValue(32);
  });
});