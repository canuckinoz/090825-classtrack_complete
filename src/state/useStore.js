import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Minimal, safe defaults so nothing crashes while refactoring.
const initialStudents = [
  {
    id: 1,
    name: 'Emma Thompson',
    recentActivity: 'none',
    status: 'thriving',
    positiveRatio: 0.9,
  },
  {
    id: 2,
    name: 'Liam Chen',
    recentActivity: 'none',
    status: 'growing',
    positiveRatio: 0.7,
  },
  {
    id: 3,
    name: 'Sophie Taylor',
    recentActivity: 'none',
    status: 'resting',
    positiveRatio: 0.4,
  },
];

export const useStore = create(
  persist(
    (set, get) => ({
      // UI slice (placeholder for future)
      ui: {},

      // Auth slice
      auth: {
        user: null,
        token: null,
        async login({ username, password }) {
          // Prefer real API origin (production or local API server)
          const base =
            (typeof window !== 'undefined' && window.__API_ORIGIN__) ||
            process.env.REACT_APP_API_ORIGIN ||
            'http://localhost:3005';
          const res = await fetch(`${base}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: username, password }),
          });
          if (!res.ok) throw new Error('Invalid credentials');
          const data = await res.json();
          set((state) => ({
            auth: { ...state.auth, user: data.user, token: data.token },
          }));
          return data;
        },
        logout() {
          set((state) => ({
            auth: { ...state.auth, user: null, token: null },
          }));
        },
        hydrateFromStorage() {
          // persist middleware hydrates automatically; expose for API stability
          return get().auth;
        },
      },

      // Students/data slice
      students: initialStudents,
      behaviours: [],

      // QuickLog behaviour types (aligned with your non‑punitive design)
      behaviourTypes: [
        {
          id: 1,
          name: 'Participation',
          type: 'positive',
          color: '#4A7C59',
          icon: '✋',
        },
        {
          id: 2,
          name: 'Helping Others',
          type: 'positive',
          color: '#673AB7',
          icon: '🤝',
        },
        {
          id: 3,
          name: 'Problem Solving',
          type: 'positive',
          color: '#1976D2',
          icon: '🧩',
        },
        {
          id: 4,
          name: 'Needs Movement',
          type: 'support',
          color: '#FF9800',
          icon: '🏃',
        },
        {
          id: 5,
          name: 'Feeling Overwhelmed',
          type: 'support',
          color: '#E91E63',
          icon: '🌊',
        },
        {
          id: 6,
          name: 'Conflict Resolution',
          type: 'growth',
          color: '#9C27B0',
          icon: '🤝',
        },
      ],

      // Actions
      logBehaviour: ({ studentId, behaviourId, note = '' }) => {
        const entry = {
          id: Date.now(),
          studentId,
          behaviourId,
          note,
          timestamp: new Date(),
        };
        const behaviours = [...get().behaviours, entry];

        // light update to student's recentActivity
        const students = get().students.map((s) =>
          s.id === studentId ? { ...s, recentActivity: 'recent' } : s
        );

        // tweak garden positiveRatio in memory (never punitive)
        const bt = get().behaviourTypes.find((b) => b.id === behaviourId);
        const bump =
          bt?.type === 'positive'
            ? +0.05
            : bt?.type === 'support' || bt?.type === 'growth'
              ? -0.03
              : 0;
        const students2 = students.map((s) =>
          s.id === studentId
            ? {
                ...s,
                positiveRatio: Math.max(
                  0,
                  Math.min(1, (s.positiveRatio ?? 0.5) + bump)
                ),
              }
            : s
        );

        set({ behaviours, students: students2 });
      },

      // Magic Moments (placeholder; plug real model later)
      getPredictedActions: () => {
        const { students, behaviourTypes } = get();
        if (!students.length) return [];
        const positives = behaviourTypes.filter((b) => b.type === 'positive');
        return students.slice(0, 2).map((s) => ({
          studentId: s.id,
          studentName: s.name,
          behaviourId:
            positives[Math.floor(Math.random() * positives.length)].id,
          behaviourName: positives[0].name,
          confidence: Math.floor(70 + Math.random() * 30),
        }));
      },

      // App bootstrap thunk placeholder
      async bootstrapApp() {
        try {
          const base =
            (typeof window !== 'undefined' && window.__API_ORIGIN__) ||
            process.env.REACT_APP_API_ORIGIN ||
            'http://localhost:3005';
          const res = await fetch(`${base}/api/me`, { credentials: 'include' });
          if (!res.ok) return true;
          const data = await res.json();
          if (data && data.ok && data.user) {
            set((state) => ({ auth: { ...state.auth, user: data.user } }));
          }
        } catch (_e) {}
        return true;
      },
    }),
    {
      name: 'classtrack-store',
      partialize: (state) => ({ auth: state.auth }),
    }
  )
);
