import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useStore } from '../state/useStore';
import App from '../App';
import Layout from '../components/Layout';

const renderWithProviders = (ui, { initialState = {}, route = '/' } = {}) => {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>
      {children}
    </MemoryRouter>
  );
  useStore.setState(initialState, true);
  return render(ui, { wrapper: Wrapper });
};

describe('Authorization', () => {
  it('should allow a teacher to see all dashboards', () => {
    const initialState = {
      user: {
        username: 'teacher',
        role: 'teacher',
        scope: ['weather', 'garden', 'constellation', 'analytics'],
      },
      token: 'fake-token',
    };
    renderWithProviders(<Layout><div /></Layout>, { initialState });

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Student Garden')).toBeInTheDocument();
    expect(screen.getByText('Constellation')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  it('should restrict a demo user to the weather dashboard', () => {
    const initialState = {
      user: {
        username: 'demo',
        role: 'user',
        scope: ['weather'],
      },
      token: 'fake-token',
    };
    renderWithProviders(<Layout><div /></Layout>, { initialState });

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Student Garden')).toBeNull();
    expect(screen.queryByText('Constellation')).toBeNull();
    expect(screen.queryByText('Reports')).toBeNull();
  });

  it('should allow a developer to see all dashboards', () => {
    const initialState = {
      user: {
        username: 'developer',
        role: 'developer',
        scope: ['*'],
      },
      token: 'fake-token',
    };
    renderWithProviders(<Layout><div /></Layout>, { initialState });

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Student Garden')).toBeInTheDocument();
    expect(screen.getByText('Constellation')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });
});
