import React, { useState } from 'react';
import { useStore } from '../../state/useStore';

/**
 * QuickLog provides a fast way to log behaviour. It uses the Zustand store
 * to handle the logging logic and state updates.
 */
export default function QuickLog() {
  const { addLog, error } = useStore();
  const [student, setStudent] = useState('');
  const [type, setType] = useState('positive');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLog = { student, type, description, timestamp: Date.now() };
    await addLog(newLog);
    if (!error) {
      setStudent('');
      setType('positive');
      setDescription('');
    }
  };

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
