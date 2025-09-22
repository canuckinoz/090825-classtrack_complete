import { useStore } from '../state/useStore';
import axios from 'axios';

jest.mock('axios');

describe('useStore', () => {
  const initialStoreState = useStore.getState();

  beforeEach(() => {
    useStore.setState(initialStoreState, true);
    axios.get.mockReset();
    axios.post.mockReset();
  });

  describe('Actions', () => {
    test('fetchStudents should fetch students and update the store', async () => {
      const mockStudents = [{ id: 1, name: 'John Doe' }];
      axios.get.mockResolvedValue({ data: mockStudents });

      await useStore.getState().fetchStudents();

      expect(axios.get).toHaveBeenCalledWith('/api/students');
      expect(useStore.getState().students).toEqual(mockStudents);
      expect(useStore.getState().loading).toBe(false);
    });

    test('logBehaviour should post a log and optimistically update the state', async () => {
      const newLog = { studentId: 1, behaviourId: 1, note: 'Test note' };
      axios.post.mockResolvedValue({ data: { ...newLog, id: 123 } });

      // Set initial students for the optimistic update
      useStore.setState({ students: [{ id: 1, name: 'Test Student', positiveRatio: 0.5 }] });

      await useStore.getState().logBehaviour(newLog);

      // It should call addLog which posts to the server
      expect(axios.post).toHaveBeenCalledWith('/api/logs', expect.any(Object));

      // It should optimistically update the student's state
      const updatedStudent = useStore.getState().students.find(s => s.id === 1);
      expect(updatedStudent.recentActivity).toBe('recent');
      expect(updatedStudent.positiveRatio).toBeGreaterThan(0.5);
    });
  });

  describe('Selectors', () => {
    test('getPredictedActions should have consistent behaviourId and behaviourName', () => {
      const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.6);
      useStore.setState({ students: initialStoreState.students });

      const { getPredictedActions, behaviourTypes } = useStore.getState();
      const predictions = getPredictedActions();

      const positives = behaviourTypes.filter(b => b.type === 'positive');
      const expectedBehaviour = positives[1];

      const firstPrediction = predictions[0];
      expect(firstPrediction.behaviourId).toBe(expectedBehaviour.id);
      expect(firstPrediction.behaviourName).toBe(expectedBehaviour.name);

      randomSpy.mockRestore();
    });
  });
});
