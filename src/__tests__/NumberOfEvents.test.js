// src/__tests__/NumberOfEvents.test.js

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventComponent;
  beforeEach(() => {
    NumberOfEventComponent = render(<NumberOfEvents setCurrentNOE={() => { }} />);
  })

  test(('renders text input'), () => {
    const searchBox = NumberOfEventComponent.queryByRole('textbox');
    expect(searchBox).toBeInTheDocument();
    expect(searchBox).toHaveClass('number-events');
  });

  test('when user has not specified a number, 32 events are shown by default', () => {
    const searchBox = NumberOfEventComponent.queryByRole('textbox');
    expect(searchBox).toHaveValue('32');
  });

  test('user can change the number of events displayed', async () => {
    const user = userEvent.setup();
    const searchBox = NumberOfEventComponent.queryByRole('textbox');
    await user.type(searchBox, '{backspace}{backspace}20');

    expect(searchBox).toHaveValue('20');
  });
});