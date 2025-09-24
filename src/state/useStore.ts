import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Student, BehaviourLog } from '../types/models';

export type StoreState = {
  ui: Record<string, unknown>;
  auth: {
    user: User | null;
    token: string | null;
    ready?: boolean;
    login: (args: {
      username: string;
      password: string;
    }) => Promise<{ user: User; token: string }>;
    logout: () => void;
    hydrateFromStorage: () => { user: User | null; token: string | null };
    bootstrap?: () => Promise<void>;
  };
  students: Student[];
  studentIndexById: Record<string | number, number>;
  studentsVersion: number;
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
  // memoised selectors
  getStudentsArray: () => Student[];
  getStudentById: (id: Student['id']) => Student | undefined;
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

function buildIndex(students: Student[]): Record<string | number, number> {
  const map: Record<string | number, number> = {};
  for (let i = 0; i < students.length; i++) map[students[i].id] = i;
  return map;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => {
      // memo cache
      let memoStudents: { version: number; value: Student[] } = {
        version: -1,
        value: [],
      };

      return {
        ui: {},
        auth: {
          user: null,
          token: null,
          ready: false,
          async login({ username, password }) {
            const res = await fetch('/auth/login', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({ email: username, password }),
            });
            const parsed = (await res.json().catch(() => ({}))) as any;
            if (!res.ok || !parsed?.ok)
              throw new Error(parsed?.error || 'Invalid credentials');
            const user = parsed.user as User;
            set((state) => ({
              auth: { ...state.auth, user, ready: true },
            }));
            return { user, token: get().auth.token || '' };
          },
          logout() {
            set((state) => ({
              auth: { ...state.auth, user: null, token: null },
            }));
          },
          hydrateFromStorage() {
            return get().auth;
          },
          async bootstrap() {
            try {
              const res = await fetch('/api/me', { credentials: 'include' });
              const data = await res.json().catch(() => ({ ok: false }) as any);
              set((state) => ({
                auth: {
                  ...state.auth,
                  user: (data as any).ok ? (data as any).user : null,
                  ready: true,
                },
              }));
              // eslint-disable-next-line no-console
              console.log(
                '[AUTH/bootstrap] user=',
                (data as any).ok ? (data as any).user : null
              );
            } catch (e: any) {
              set((state) => ({
                auth: { ...state.auth, user: null, ready: true },
              }));
              // eslint-disable-next-line no-console
              console.warn('[AUTH/bootstrap] failed:', e?.message);
            }
          },
        },
        students: initialStudents,
        studentIndexById: buildIndex(initialStudents),
        studentsVersion: 0,
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
          const now = Date.now();
          set((state) => {
            const entry: BehaviourLog = {
              id: now,
              studentId,
              behaviourId,
              note,
              timestamp: new Date(),
            };
            const newBehaviours = state.behaviours.concat(entry);

            const idx = state.studentIndexById[studentId as any];
            if (idx === undefined)
              return { behaviours: newBehaviours } as Partial<StoreState>;

            const students = state.students.slice();
            const current = students[idx];
            const bt = state.behaviourTypes.find(
              (b) => b.id === Number(behaviourId)
            );
            const bump =
              bt?.type === 'positive'
                ? +0.05
                : bt?.type === 'support' || bt?.type === 'growth'
                  ? -0.03
                  : 0;
            const nextRatio = Math.max(
              0,
              Math.min(1, (current.positiveRatio ?? 0.5) + bump)
            );
            students[idx] = {
              ...current,
              recentActivity: 'recent',
              positiveRatio: nextRatio,
            };

            return {
              behaviours: newBehaviours,
              students,
              studentsVersion: state.studentsVersion + 1,
            } as Partial<StoreState>;
          });
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
        getStudentsArray: () => {
          const { studentsVersion, students } = get();
          if (memoStudents.version !== studentsVersion) {
            memoStudents = { version: studentsVersion, value: students };
          }
          return memoStudents.value;
        },
        getStudentById: (id) => {
          const { studentIndexById, students } = get();
          const idx = studentIndexById[id as any];
          return idx === undefined ? undefined : students[idx];
        },
        async bootstrapApp() {
          return true;
        },
      };
    },
    { name: 'classtrack-store', partialize: (state) => ({ auth: state.auth }) }
  )
);
