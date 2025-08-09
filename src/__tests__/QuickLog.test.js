import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GlobalProvider } from '../context/GlobalState';
import QuickLog from '../features/QuickLog/QuickLog';

/**
 * Tests for the QuickLog component.  Ensures that the form can be filled
 * out and that submitting dispatches an action which adds a log to the
 * global state.  Because the global provider uses a reducer, we can
 * examine the UI to verify that the form clears after submission.
 */
test('can log a behaviour via QuickLog', async () => {
  render(
    <GlobalProvider>
      <QuickLog />
    </GlobalProvider>
  );

  const studentInput = screen.getByLabelText(/student/i);
  const typeSelect = screen.getByLabelText(/type/i);
  const descriptionInput = screen.getByLabelText(/description/i);
  const submitButton = screen.getByRole('button', { name: /log behaviour/i });

  // Fill out the form
  fireEvent.change(studentInput, { target: { value: 'Alice' } });
  fireEvent.change(typeSelect, { target: { value: 'positive' } });
  fireEvent.change(descriptionInput, { target: { value: 'Helped a friend' } });

  // Submit the form.  We mock fetch to immediately succeed.
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
  fireEvent.click(submitButton);

  // After submission the form inputs should be cleared
  await waitFor(() => {
    expect(studentInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });
});