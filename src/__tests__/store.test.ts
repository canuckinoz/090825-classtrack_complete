import '@testing-library/jest-dom';
import { useStore } from '../state/useStore';

describe('useStore auth slice', () => {
  beforeEach(() => {
    useStore.setState({
      auth: {
        user: null,
        token: null,
        login: useStore.getState().auth.login,
        logout: useStore.getState().auth.logout,
        hydrateFromStorage: useStore.getState().auth.hydrateFromStorage,
      },
      behaviours: [],
    });
  });

  test('login sets user and token', async () => {
    // mock /api/login
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ user: { username: 'teacher' }, token: 't' }),
      })
    ) as any;
    await useStore
      .getState()
      .auth.login({ username: 'teacher@example.com', password: 'password' });
    const { user, token } = useStore.getState().auth;
    expect(user?.username).toBe('teacher');
    expect(token).toBe('t');
  });

  test('logout clears auth', () => {
    useStore.setState({
      auth: {
        ...useStore.getState().auth,
        user: { username: 'x' } as any,
        token: 't',
      },
    });
    useStore.getState().auth.logout();
    expect(useStore.getState().auth.user).toBeNull();
    expect(useStore.getState().auth.token).toBeNull();
  });
});

describe('useStore logBehaviour', () => {
  test('updates only the target student', () => {
    const before = useStore
      .getState()
      .students.map((s) => ({ id: s.id, ratio: s.positiveRatio }));
    const targetId = before[0].id;
    useStore
      .getState()
      .logBehaviour({ studentId: targetId, behaviourId: 1, note: '' });
    const after = useStore.getState().students.map((s) => ({
      id: s.id,
      ratio: s.positiveRatio,
      recent: s.recentActivity,
    }));
    // Only first student recent and ratio changed
    expect(after[0].recent).toBe('recent');
    expect(after[0].ratio).not.toBe(before[0].ratio);
    for (let i = 1; i < after.length; i++) {
      expect(after[i].ratio).toBe(before[i].ratio);
      expect(after[i].recent).not.toBe('recent');
    }
  });

  test('logs 1000 events within reasonable time', () => {
    const t0 = performance.now();
    for (let i = 0; i < 1000; i++) {
      useStore.getState().logBehaviour({ studentId: 1, behaviourId: 1 });
    }
    const t1 = performance.now();
    expect(t1 - t0).toBeLessThan(500); // 0.5s threshold for CI environments
  });
});
