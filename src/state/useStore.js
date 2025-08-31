import { create } from "zustand";

// Minimal, safe defaults so nothing crashes while refactoring.
const initialStudents = [
  { id: 1, name: "Emma Thompson", recentActivity: "none", status: "thriving", positiveRatio: 0.9 },
  { id: 2, name: "Liam Chen", recentActivity: "none", status: "growing",   positiveRatio: 0.7 },
  { id: 3, name: "Sophie Taylor", recentActivity: "none", status: "resting",  positiveRatio: 0.4 },
];

export const useStore = create((set, get) => ({
  // Auth
  user: null,
  token: null,
  error: null,
  login: async (username, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      set({ user: data.user, token: data.token, error: null });
    } catch (error) {
      set({ error: error.message });
    }
  },
  logout: () => set({ user: null, token: null }),

  // UI
  currentView: "weather", // "weather" | "garden" | "constellation" | "analytics"
  setView: (view) => set({ currentView: view }),

  // Data
  students: initialStudents,
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
  addLog: async (log) => {
    const { token } = get();
    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(log)
      });
      if (!response.ok) {
        throw new Error('Failed to save log');
      }
      const newLog = await response.json();
      set(state => ({ logs: [...state.logs, newLog] }));
    } catch (error) {
      set({ error: error.message });
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
    return students.slice(0, 2).map(s => ({
      studentId: s.id,
      studentName: s.name,
      behaviourId: positives[Math.floor(Math.random() * positives.length)].id,
      behaviourName: positives[0].name,
      confidence: Math.floor(70 + Math.random() * 30),
    }));
  },
}));
