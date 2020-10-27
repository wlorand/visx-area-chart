import React from 'react';

import { render } from '@testing-library/react';

// child components
import App from './App';

test('renders App component', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  // TODO: define first assertion for component to be there - react-testting-lib 101
});
