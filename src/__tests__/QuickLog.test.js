import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuickLog from '../features/quicklog';
import { useStore } from '../state/useStore';

test('opens QuickLog overlay and logs a behaviour', () => {
  // Arrange: stub logBehaviour so we can assert it was called
  const original = useStore.getState().logBehaviour;
  const spy = jest.fn();
  useStore.setState({ logBehaviour: spy });

  render(<QuickLog.Trigger />);

  // Open overlay
  fireEvent.click(screen.getByRole('button', { name: /log behaviour/i }));

  // Click the first student tile
  const studentButtons = screen.getAllByRole('button');
  // The first button is the close ×; Trigger button is not in overlay tree now.
  // Find a student tile by looking for two-letter initials element text length 2
  const studentTile =
    studentButtons.find((b) => (b.textContent || '').trim().length === 2) ||
    studentButtons[1];
  fireEvent.click(studentTile);

  // Click the first behaviour type button
  const behaviourButtons = screen.getAllByRole('button');
  const behaviourBtn =
    behaviourButtons.find((b) =>
      /positive|support|growth/i.test(b.textContent || '')
    ) || behaviourButtons[0];
  fireEvent.click(behaviourBtn);

  expect(spy).toHaveBeenCalled();

  // Cleanup
  useStore.setState({ logBehaviour: original });
});
