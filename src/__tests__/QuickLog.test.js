import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useStore } from '../state/useStore';
import QuickLog from '../features/quicklog';
import axios from 'axios';

jest.mock('axios');

const initialStoreState = useStore.getState();

describe('QuickLog', () => {
  beforeEach(() => {
    useStore.setState(initialStoreState);
    axios.post.mockResolvedValue({ data: {} });
  });

  test('can log a behaviour via QuickLog', async () => {
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
    // and that the state has been updated.
    const state = useStore.getState();
    expect(state.behaviours.length).toBe(1);
    expect(state.behaviours[0].studentId).toBe(1);
    expect(state.behaviours[0].behaviourId).toBe(1);
  });
});