import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useStore } from '../state/useStore';
import QuickLog from '../features/quicklog';
import axios from 'axios';

jest.mock('axios');

const initialStoreState = useStore.getState();
const mockStudents = [
  { id: 1, name: 'Emma Thompson', recentActivity: 'none', status: 'thriving', positiveRatio: 0.9 },
  { id: 2, name: 'Liam Chen', recentActivity: 'none', status: 'growing',   positiveRatio: 0.7 },
];

describe('QuickLog', () => {
  beforeEach(() => {
    // Reset store and mock axios before each test
    useStore.setState(initialStoreState, true);
    axios.post.mockImplementation(async (url, data) => {
      return { data: { ...data, id: Date.now() } };
    });
  });

  test('can log a behaviour via QuickLog', async () => {
    // Set mock students in the store for the test
    useStore.setState({ students: mockStudents });

    render(<QuickLog.Trigger />);

    // Open the QuickLog overlay
    fireEvent.click(screen.getByRole('button', { name: /log behaviour/i }));

    // Select a student
    const studentButton = await screen.findByText('Emma Thompson');
    fireEvent.click(studentButton);

    // Select a behaviour
    const behaviourButton = await screen.findByText('Participation');
    fireEvent.click(behaviourButton);

    // The overlay should close after logging
    await waitFor(() => {
      expect(screen.queryByText('Who are you logging for?')).not.toBeInTheDocument();
    });

    // Verify that the addLog action was called (indirectly, via logBehaviour)
    // and that the `logs` state has been updated correctly.
    const state = useStore.getState();
    expect(state.logs.length).toBe(1);
    expect(state.logs[0].studentId).toBe(1);
    expect(state.logs[0].behaviourId).toBe(1);
  });
});