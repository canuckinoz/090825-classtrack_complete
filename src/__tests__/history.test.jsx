import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { useStore } from '../state/useStore';

function renderAppAt(route = '/') {
  window.history.pushState({}, 'Test', route);
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

test('back/forward buttons update view correctly', async () => {
  useStore.setState({ auth: { user: { username: 'teacher' }, token: 't' } });
  renderAppAt('/dashboard');

  // Dashboard visible
  expect(screen.getByText(/Morning Behaviour Forecast/i)).toBeInTheDocument();

  // Navigate to Quick Log via header link
  await userEvent.click(screen.getByRole('link', { name: /Quick Log/i }));
  expect(screen.getAllByText(/Quick Log/i)[0]).toBeInTheDocument();

  // Back to Dashboard
  window.history.back();
  await screen.findByText(/Morning Behaviour Forecast/i);
  expect(screen.getByText(/Morning Behaviour Forecast/i)).toBeInTheDocument();

  // Forward to Quick Log
  window.history.forward();
  await screen.findAllByText(/Quick Log/i);
  expect(screen.getAllByText(/Quick Log/i)[0]).toBeInTheDocument();
});
