import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useStore } from '../state/useStore';
import App from '../App';

// Mock the components that are rendered by the routes
jest.mock('../features/Auth/Login', () => () => <div>Login Page</div>);
jest.mock('../features/weather', () => () => <div>Weather Dashboard</div>);
jest.mock('../features/garden', () => () => <div>Garden Dashboard</div>);
jest.mock('../features/constellation', () => () => <div>Constellation Dashboard</div>);
jest.mock('../features/analytics', () => () => <div>Analytics View</div>);

const initialStoreState = useStore.getState();

describe('App Routing', () => {
  beforeEach(() => {
    useStore.setState(initialStoreState, true);
  });

  test('renders login page for the /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('redirects to login page from a protected route if not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders the dashboard page when authenticated', () => {
    useStore.setState({ isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Weather Dashboard')).toBeInTheDocument();
  });

  test('renders the garden page when authenticated', () => {
    useStore.setState({ isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={['/garden']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Garden Dashboard')).toBeInTheDocument();
  });

  test('renders the constellation page when authenticated', () => {
    useStore.setState({ isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={['/constellation']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Constellation Dashboard')).toBeInTheDocument();
  });

  test('renders the analytics page when authenticated', () => {
    useStore.setState({ isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={['/analytics']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Analytics View')).toBeInTheDocument();
  });

  test('redirects to the dashboard for an unknown route when authenticated', () => {
    useStore.setState({ isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Weather Dashboard')).toBeInTheDocument();
  });
});
