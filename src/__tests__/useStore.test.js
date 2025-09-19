import { useStore } from '../state/useStore';

describe('useStore', () => {
  // Reset the store before each test to ensure isolation
  const initialStoreState = useStore.getState();
  beforeEach(() => {
    useStore.setState(initialStoreState, true);
  });

  test('getPredictedActions should have consistent behaviourId and behaviourName', () => {
    // There are 3 positive behaviours.  A value of 0.6 will select index 1.
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.6);

    const { getPredictedActions, behaviourTypes } = useStore.getState();
    const predictions = getPredictedActions();

    // Find the behaviour that should have been selected
    const positives = behaviourTypes.filter(b => b.type === 'positive');
    const expectedBehaviour = positives[1]; // from Math.floor(0.6 * 3)

    // The bug is that behaviourName is always positives[0].name
    const bugBehaviourName = positives[0].name;

    // We expect the first prediction to have the correct details
    const firstPrediction = predictions[0];
    expect(firstPrediction.behaviourId).toBe(expectedBehaviour.id);

    // This is the assertion that should now pass
    expect(firstPrediction.behaviourName).toBe(expectedBehaviour.name);

    randomSpy.mockRestore();
  });
});
