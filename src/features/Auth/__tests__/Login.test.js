import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useStore } from '../../../state/useStore';
import Login from '../Login';

// Mock the useStore hook
jest.mock('../../../state/useStore');

describe('Login', () => {
  test('renders login form', () => {
    useStore.mockReturnValue({ login: jest.fn(), error: null });
    render(<Login />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('calls login on form submit', async () => {
    const login = jest.fn();
    useStore.mockReturnValue({ login, error: null });
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('testuser', 'password');
    });
  });

  test('displays error message on failed login', () => {
    useStore.mockReturnValue({ login: jest.fn(), error: 'Invalid credentials' });
    render(<Login />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
