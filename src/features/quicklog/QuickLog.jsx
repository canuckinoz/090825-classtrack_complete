import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalState';

/**
 * QuickLog provides a fast way to log behaviour within two clicks.  It
 * collects the minimal information necessary and dispatches an action
 * to add the log to the global state and persists it to the server.
 */
export default function QuickLog() {
  const { state, dispatch } = useGlobalContext();
  const [student, setStudent] = useState('');
  const [type, setType] = useState('positive');
  const [description, setDescription] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const newLog = { student, type, description, timestamp: Date.now() };
    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`
        },
        body: JSON.stringify(newLog)
      });
      if (!response.ok) {
        throw new Error('Failed to save log');
      }
      dispatch({ type: 'ADD_LOG', payload: newLog });
      // clear form
      setStudent('');
      setType('positive');
      setDescription('');
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-4">
      <div>
        <label htmlFor="quicklog-student" className="block text-sm font-medium mb-1">Student</label>
        <input
          id="quicklog-student"
          type="text"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label htmlFor="quicklog-type" className="block text-sm font-medium mb-1">Type</label>
        <select
          id="quicklog-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
      </div>
      <div>
        <label htmlFor="quicklog-description" className="block text-sm font-medium mb-1">Description</label>
        <textarea
          id="quicklog-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
          rows="2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-dark text-white py-2 rounded hover:bg-primary text-base font-medium"
      >
        Log Behaviour
      </button>
    </form>
  );
}
