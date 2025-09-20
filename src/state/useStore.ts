import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Student, BehaviourLog } from '../types/models';

export type StoreState = {
  ui: Record<string, unknown>;
  auth: {
    user: User | null;
    token: string | null;
    login: (args: {
      username: string;
      password: string;
    }) => Promise<{ user: User; token: string }>;
    logout: () => void;
    hydrateFromStorage: () => { user: User | null; token: string | null };
  };
  students: Student[];
  behaviours: BehaviourLog[];
  behaviourTypes: {
    id: number;
    name: string;
    type: 'positive' | 'support' | 'growth';
    color: string;
    icon: string;
  }[];
  logBehaviour: (args: {
    studentId: Student['id'];
    behaviourId: number | string;
    note?: string;
  }) => void;
  getPredictedActions: () => {
    studentId: Student['id'];
    studentName: string;
    behaviourId: number | string;
    behaviourName: string;
    confidence: number;
  }[];
  bootstrapApp: () => Promise<boolean>;
};

const initialStudents: Student[] = [
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

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ui: {},
      auth: {
        user: null,
        token: null,
        async login({ username, password }) {
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });
          if (!res.ok) throw new Error('Invalid credentials');
          const data = (await res.json()) as { user: User; token: string };
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
          return get().auth;
        },
      },
      students: initialStudents,
      behaviours: [],
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
      logBehaviour: ({ studentId, behaviourId, note = '' }) => {
        const entry: BehaviourLog = {
          id: Date.now(),
          studentId,
          behaviourId,
          note,
          timestamp: new Date(),
        };
        const behaviours = [...get().behaviours, entry];
        const students = get().students.map((s) =>
          s.id === studentId ? { ...s, recentActivity: 'recent' } : s
        );
        const bt = get().behaviourTypes.find(
          (b) => b.id === Number(behaviourId)
        );
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
      async bootstrapApp() {
        return true;
      },
    }),
    { name: 'classtrack-store', partialize: (state) => ({ auth: state.auth }) }
  )
);
