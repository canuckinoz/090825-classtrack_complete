import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { useStore } from '../state/useStore';

test('AppLayout shows active nav on /quick-log', () => {
  useStore.setState({
    auth: {
      user: { username: 'teacher' },
      token: 't',
      login: useStore.getState().auth.login,
      logout: useStore.getState().auth.logout,
      hydrateFromStorage: useStore.getState().auth.hydrateFromStorage,
    },
  });
  render(
    <MemoryRouter initialEntries={['/quick-log']}>
      <App />
    </MemoryRouter>
  );
  const link = screen.getByRole('link', { name: /Quick Log/i });
  expect(link).toHaveAttribute('aria-current', 'page');
});
