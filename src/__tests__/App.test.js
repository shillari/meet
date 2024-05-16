// src/__tests__/App.test.js

import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test('render Tab', () => {
    expect(AppDOM.querySelector('#tabs')).toBeInTheDocument();
  });

});