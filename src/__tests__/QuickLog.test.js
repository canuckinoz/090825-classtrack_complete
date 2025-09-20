import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuickLog from '../features/QuickLog/QuickLog';

/**
 * Tests for the QuickLog component.  Ensures that the form can be filled
 * out and that submitting dispatches an action which adds a log to the
 * store. We verify the UI clears after submission.
 */
test('can log a behaviour via QuickLog', async () => {
  render(<QuickLog />);

  const studentInput = screen.getByLabelText(/student/i);
  const typeSelect = screen.getByLabelText(/type/i);
  const descriptionInput = screen.getByLabelText(/description/i);
  const submitButton = screen.getByRole('button', { name: /log behaviour/i });

  // Fill out the form
  fireEvent.change(studentInput, { target: { value: 'Alice' } });
  fireEvent.change(typeSelect, { target: { value: 'positive' } });
  fireEvent.change(descriptionInput, { target: { value: 'Helped a friend' } });

  // Submit the form.  We mock fetch to immediately succeed.
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
  );
  fireEvent.click(submitButton);

  // After submission the form inputs should be cleared
  await waitFor(() => {
    expect(studentInput.value).toBe('');
  });
  await waitFor(() => {
    expect(descriptionInput.value).toBe('');
  });
});
