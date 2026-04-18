import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page title', () => {
  render(<App />);
  expect(screen.getByText(/smart agriculture project/i)).toBeInTheDocument();
});
