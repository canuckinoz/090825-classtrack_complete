import { create } from "zustand";
import axios from 'axios';

export const useStore = create((set, get) => ({
  // Auth State
  user: null,
  token: null,
  isAuthenticated: false,

  // UI
  loading: false,
  error: null,

  // Data
  students: [],
  logs: [],
  predictions: {},
  behaviours: [],

  // QuickLog behaviour types (aligned with your non‑punitive design)
  behaviourTypes: [
    { id: 1, name: "Participation",       type: "positive", color: "#4A7C59", icon: "✋" },
    { id: 2, name: "Helping Others",      type: "positive", color: "#673AB7", icon: "🤝" },
    { id: 3, name: "Problem Solving",     type: "positive", color: "#1976D2", icon: "🧩" },
    { id: 4, name: "Needs Movement",      type: "support",  color: "#FF9800", icon: "🏃" },
    { id: 5, name: "Feeling Overwhelmed", type: "support",  color: "#E91E63", icon: "🌊" },
    { id: 6, name: "Conflict Resolution", type: "growth",   color: "#9C27B0", icon: "🤝" },
  ],

  // Actions
  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post('/api/login', { username, password });
      const { user, token } = res.data;
      set({ user, token, isAuthenticated: true, loading: false });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      get().fetchLogs();
      get().fetchStudents();
    } catch (err) {
      set({ error: 'Invalid credentials', loading: false });
    }
  },

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('/api/students');
      set({ students: res.data, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch students', loading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false, logs: [], predictions: {} });
    delete axios.defaults.headers.common['Authorization'];
  },

  fetchLogs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('/api/logs');
      set({ logs: res.data, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch logs', loading: false });
    }
  },

  addLog: async (log) => {
    try {
      const res = await axios.post('/api/logs', log);
      set((state) => ({ logs: [...state.logs, res.data] }));
    } catch (err) {
      set({ error: 'Failed to add log' });
    }
  },

  fetchPredictions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('/api/predictions');
      set({ predictions: res.data, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch predictions', loading: false });
    }
  },

  logBehaviour: async ({ studentId, behaviourId, note = "" }) => {
    const entry = { studentId, behaviourId, note, timestamp: new Date().toISOString() };

    // Persist the log to the server
    await get().addLog(entry);

    // Optimistically update student's recentActivity
    const students = get().students.map(s =>
      s.id === studentId ? { ...s, recentActivity: "recent" } : s
    );

    // Optimistically tweak garden positiveRatio in memory
    const bt = get().behaviourTypes.find(b => b.id === behaviourId);
    if (bt) {
      const bump = bt.type === "positive" ? 0.05 : (bt.type === "support" || bt.type === "growth" ? -0.03 : 0);
      const updatedStudents = students.map(s =>
        s.id === studentId ? { ...s, positiveRatio: Math.max(0, Math.min(1, (s.positiveRatio ?? 0.5) + bump)) } : s
      );
      set({ students: updatedStudents });
    }
  },

  // Magic Moments (placeholder; plug real model later)
  getPredictedActions: () => {
    const { students, behaviourTypes } = get();
    if (!students.length) return [];
    const positives = behaviourTypes.filter(b => b.type === "positive");
    if (!positives.length) return [];
    return students.slice(0, 2).map(s => {
      const selectedBehaviour = positives[Math.floor(Math.random() * positives.length)];
      return {
        studentId: s.id,
        studentName: s.name,
        behaviourId: selectedBehaviour.id,
        behaviourName: selectedBehaviour.name,
        confidence: Math.floor(70 + Math.random() * 30),
      };
    });
  },
}));
