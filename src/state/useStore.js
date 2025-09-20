import { create } from "zustand";
import axios from 'axios';

// Minimal, safe defaults so nothing crashes while refactoring.
const initialStudents = [
  { id: 1, name: "Emma Thompson", recentActivity: "none", status: "thriving", positiveRatio: 0.9 },
  { id: 2, name: "Liam Chen", recentActivity: "none", status: "growing",   positiveRatio: 0.7 },
  { id: 3, name: "Sophie Taylor", recentActivity: "none", status: "resting",  positiveRatio: 0.4 },
];

export const useStore = create((set, get) => ({
  // Auth
  user: JSON.parse(localStorage.getItem('user')),
  token: localStorage.getItem('token'),
  error: null,
  login: async (username, password) => {
    try {
      const { data } = await axios.post('/api/login', { username, password });
      set({ user: data.user, token: data.token, error: null });
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      get().fetchData();
    } catch (error) {
      set({ error: 'Failed to login. Please check your credentials.' });
    }
  },
  devLogin: async (username) => {
    try {
      const { data } = await axios.post(`/api/dev-login`, { username });
      set({ user: data.user, token: data.token, error: null });
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      get().fetchData();
    } catch (error) {
      set({ error: 'Failed to login. Please check your credentials.' });
    }
  },
  logout: () => {
    set({ user: null, token: null, logs: [], predictions: {}, error: null });
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  // UI
  currentView: "weather", // "weather" | "garden" | "constellation" | "analytics"
  setView: (view) => set({ currentView: view }),

  // Data
  students: initialStudents,
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
  fetchData: async () => {
    try {
      const { data: logs } = await axios.get('/api/logs');
      const { data: predictions } = await axios.get('/api/predictions');
      set({ logs, predictions });
    } catch (error) {
      set({ error: 'Failed to fetch data.' });
    }
  },
  logBehaviour: ({ studentId, behaviourId, note = "" }) => {
    const entry = { id: Date.now(), studentId, behaviourId, note, timestamp: new Date() };
    const behaviours = [...get().behaviours, entry];

    // light update to student's recentActivity
    const students = get().students.map(s =>
      s.id === studentId ? { ...s, recentActivity: "recent" } : s
    );

    // tweak garden positiveRatio in memory (never punitive)
    const bt = get().behaviourTypes.find(b => b.id === behaviourId);
    const bump = bt?.type === "positive" ? +0.05 : bt?.type === "support" || bt?.type === "growth" ? -0.03 : 0;
    const students2 = students.map(s =>
      s.id === studentId ? { ...s, positiveRatio: Math.max(0, Math.min(1, (s.positiveRatio ?? 0.5) + bump)) } : s
    );

    set({ behaviours, students: students2 });
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
