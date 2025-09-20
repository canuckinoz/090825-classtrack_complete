import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { useStore } from '../state/useStore';

function renderAt(route = '/') {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
}

test('unauthenticated navigate to /dashboard redirects to /login', () => {
  // ensure logged out
  useStore.setState({ auth: { user: null, token: null } });
  renderAt('/dashboard');
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});

test('direct URL to /quick-log loads the page (after auth)', () => {
  useStore.setState({ auth: { user: { username: 'teacher' }, token: 't' } });
  renderAt('/quick-log');
  expect(screen.getAllByText(/Quick Log/i)[0]).toBeInTheDocument();
});
