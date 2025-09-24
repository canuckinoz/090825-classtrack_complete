import { r as f, j as e, R as Z } from './ui-vendor-D6t9Fqz9.js';
import { u as ee } from './index-DxxIEH0w.js';
import './react-vendor-DTDVRx5A.js';
import './data-vendor-CMp-lYVg.js';
const te = [
    'Transition between activities',
    'Unstructured time',
    'Academic challenge',
    'Social interaction',
    'Sensory overload',
    'Hunger or fatigue',
    'Change in routine',
    'Peer conflict',
    'Teacher attention',
    'Independent work',
  ],
  se = [
    'Provided choice of activities',
    'Offered movement break',
    'Gave positive reinforcement',
    'Used calming strategies',
    'Provided one-on-one support',
    'Modified task difficulty',
    'Created quiet space',
    'Facilitated peer support',
    'Used visual supports',
    'Provided calm-down space',
  ];
function ne({ onSubmit: a }) {
  const [d, u] = f.useState({
      antecedent: '',
      behavior: '',
      intensity: 1,
      consequence: '',
      notes: '',
    }),
    i = (n) => {
      (n.preventDefault(),
        !(!d.antecedent || !d.behavior || !d.consequence) &&
          (a(d),
          u({
            antecedent: '',
            behavior: '',
            intensity: 1,
            consequence: '',
            notes: '',
          })));
    },
    l = (n, x) => {
      u((s) => ({ ...s, [n]: x }));
    };
  return e.jsxs('div', {
    className: 'p-6',
    children: [
      e.jsx('h2', {
        className: 'text-xl font-semibold text-navy mb-4',
        children: 'Log New Incident',
      }),
      e.jsxs('form', {
        onSubmit: i,
        className: 'space-y-4',
        children: [
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                htmlFor: 'antecedent-select',
                className: 'block text-sm font-medium text-gray-700 mb-2',
                children: 'What happened before? (Antecedent)',
              }),
              e.jsxs('select', {
                id: 'antecedent-select',
                value: d.antecedent,
                onChange: (n) => l('antecedent', n.target.value),
                className:
                  'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent',
                required: !0,
                children: [
                  e.jsx('option', {
                    value: '',
                    children: 'Select antecedent...',
                  }),
                  te.map((n, x) =>
                    e.jsx('option', { value: n, children: n }, x)
                  ),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                htmlFor: 'behavior-textarea',
                className: 'block text-sm font-medium text-gray-700 mb-2',
                children: 'What did the student do? (Behavior)',
              }),
              e.jsx('textarea', {
                id: 'behavior-textarea',
                value: d.behavior,
                onChange: (n) => l('behavior', n.target.value),
                placeholder: 'Describe the behavior objectively...',
                className:
                  'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent resize-none',
                rows: 3,
                required: !0,
              }),
            ],
          }),
          e.jsxs('div', {
            children: [
              e.jsx('span', {
                className: 'block text-sm font-medium text-gray-700 mb-2',
                children: 'Intensity Level',
              }),
              e.jsx('div', {
                className: 'flex gap-4',
                children: [1, 2, 3].map((n) =>
                  e.jsxs(
                    'label',
                    {
                      className: 'flex items-center gap-2',
                      children: [
                        e.jsx('input', {
                          type: 'radio',
                          name: 'intensity',
                          value: n,
                          checked: d.intensity === n,
                          onChange: (x) =>
                            l('intensity', parseInt(x.target.value)),
                          className: 'text-navy focus:ring-navy',
                        }),
                        e.jsxs('span', {
                          className: 'text-sm',
                          children: [
                            n === 1 && 'Mild',
                            n === 2 && 'Moderate',
                            n === 3 && 'High',
                          ],
                        }),
                      ],
                    },
                    n
                  )
                ),
              }),
            ],
          }),
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                htmlFor: 'consequence-select',
                className: 'block text-sm font-medium text-gray-700 mb-2',
                children: 'How did you respond? (Consequence)',
              }),
              e.jsxs('select', {
                id: 'consequence-select',
                value: d.consequence,
                onChange: (n) => l('consequence', n.target.value),
                className:
                  'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent',
                required: !0,
                children: [
                  e.jsx('option', {
                    value: '',
                    children: 'Select response...',
                  }),
                  se.map((n, x) =>
                    e.jsx('option', { value: n, children: n }, x)
                  ),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                htmlFor: 'notes-textarea',
                className: 'block text-sm font-medium text-gray-700 mb-2',
                children: 'Additional Notes (Optional)',
              }),
              e.jsx('textarea', {
                id: 'notes-textarea',
                value: d.notes,
                onChange: (n) => l('notes', n.target.value),
                placeholder: 'Any additional context or observations...',
                className:
                  'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent resize-none',
                rows: 2,
              }),
            ],
          }),
          e.jsx('div', {
            className: 'pt-2',
            children: e.jsx('button', {
              type: 'submit',
              className:
                'w-full bg-navy text-white py-3 px-4 rounded-lg hover:bg-navy-dark transition-colors font-medium',
              children: 'Log Incident',
            }),
          }),
        ],
      }),
    ],
  });
}
const re = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  q = { start: 8, end: 16 };
Array.from({ length: 24 }, (a, d) => d);
function ae({ incidents: a = [] }) {
  const d = (i, l) =>
      a.filter((n) => {
        const x = new Date(n.timestamp),
          s = x.getDay(),
          c = x.getHours();
        return (s === 0 ? 6 : s - 1) === i && c === l;
      }).length,
    u = (i) =>
      i === 0
        ? 'bg-gray-100'
        : i === 1
          ? 'bg-yellow-200'
          : i === 2
            ? 'bg-orange-300'
            : i === 3
              ? 'bg-red-400'
              : 'bg-red-600';
  return e.jsxs('div', {
    className: 'p-6',
    children: [
      e.jsx('h3', {
        className: 'text-lg font-semibold text-navy mb-4',
        children: 'Incident Frequency Heatmap',
      }),
      e.jsx('div', {
        className: 'overflow-x-auto',
        children: e.jsxs('div', {
          className: 'min-w-max',
          children: [
            e.jsxs('div', {
              className: 'flex mb-2',
              children: [
                e.jsx('div', { className: 'w-16' }),
                ' ',
                Array.from({ length: q.end - q.start }, (i, l) => {
                  const n = q.start + l;
                  return e.jsx(
                    'div',
                    {
                      className: 'w-8 text-xs text-gray-500 text-center',
                      children:
                        n === 12 ? '12p' : n > 12 ? `${n - 12}p` : `${n}a`,
                    },
                    n
                  );
                }),
              ],
            }),
            re.map((i, l) =>
              e.jsxs(
                'div',
                {
                  className: 'flex items-center mb-1',
                  children: [
                    e.jsx('div', {
                      className: 'w-16 text-sm font-medium text-gray-700 pr-2',
                      children: i,
                    }),
                    Array.from({ length: q.end - q.start }, (n, x) => {
                      const s = q.start + x,
                        c = d(l, s);
                      return e.jsx(
                        'div',
                        {
                          className: `w-8 h-8 mx-0.5 rounded-sm border border-gray-200 ${u(c)} flex items-center justify-center text-xs font-medium transition-colors`,
                          title: `${i} ${s}:00 - ${c} incident${c !== 1 ? 's' : ''}`,
                          children: c > 0 && c,
                        },
                        s
                      );
                    }),
                  ],
                },
                i
              )
            ),
          ],
        }),
      }),
      e.jsxs('div', {
        className: 'mt-4 flex items-center gap-4 text-xs text-gray-600',
        children: [
          e.jsx('span', { children: 'Frequency:' }),
          e.jsxs('div', {
            className: 'flex items-center gap-1',
            children: [
              e.jsx('div', {
                className:
                  'w-4 h-4 bg-gray-100 border border-gray-200 rounded-sm',
              }),
              e.jsx('span', { children: '0' }),
            ],
          }),
          e.jsxs('div', {
            className: 'flex items-center gap-1',
            children: [
              e.jsx('div', {
                className:
                  'w-4 h-4 bg-yellow-200 border border-gray-200 rounded-sm',
              }),
              e.jsx('span', { children: '1' }),
            ],
          }),
          e.jsxs('div', {
            className: 'flex items-center gap-1',
            children: [
              e.jsx('div', {
                className:
                  'w-4 h-4 bg-orange-300 border border-gray-200 rounded-sm',
              }),
              e.jsx('span', { children: '2' }),
            ],
          }),
          e.jsxs('div', {
            className: 'flex items-center gap-1',
            children: [
              e.jsx('div', {
                className:
                  'w-4 h-4 bg-red-400 border border-gray-200 rounded-sm',
              }),
              e.jsx('span', { children: '3' }),
            ],
          }),
          e.jsxs('div', {
            className: 'flex items-center gap-1',
            children: [
              e.jsx('div', {
                className:
                  'w-4 h-4 bg-red-600 border border-gray-200 rounded-sm',
              }),
              e.jsx('span', { children: '4+' }),
            ],
          }),
        ],
      }),
      a.length === 0 &&
        e.jsx('div', {
          className: 'mt-4 text-center text-gray-500 text-sm',
          children:
            'No incidents logged yet. Start tracking to see patterns emerge.',
        }),
    ],
  });
}
function oe({ patterns: a, abcData: d = [] }) {
  const u = f.useMemo(() => {
    try {
      if (!d || !Array.isArray(d) || d.length === 0)
        return { topAntecedents: [], topBehaviors: [] };
      const i = {},
        l = {};
      d.forEach((s) => {
        if (s && typeof s == 'object') {
          const c = s.antecedent || 'Unknown';
          i[c] = (i[c] || 0) + 1;
          const v = s.behavior || 'Unknown';
          l[v] = (l[v] || 0) + 1;
        }
      });
      const n = Object.entries(i)
          .sort((s, c) => c[1] - s[1])
          .slice(0, 3),
        x = Object.entries(l)
          .sort((s, c) => c[1] - s[1])
          .slice(0, 3);
      return { topAntecedents: n, topBehaviors: x };
    } catch (i) {
      return (
        console.error('Analysis error:', i),
        { topAntecedents: [], topBehaviors: [] }
      );
    }
  }, [d]);
  return !d || d.length === 0
    ? e.jsxs('div', {
        className: 'p-4 text-center text-gray-500',
        children: [
          e.jsx('div', {
            className: 'font-semibold',
            children: 'No ABC Data Available',
          }),
          e.jsx('div', {
            className: 'text-sm mt-1',
            children: 'No data found for this class.',
          }),
        ],
      })
    : e.jsxs('div', {
        className: 'p-4 bg-gray-50 rounded-lg',
        children: [
          e.jsx('h3', {
            className: 'text-xl font-semibold mb-4 text-gray-700',
            children: 'Key Patterns',
          }),
          e.jsxs('div', {
            className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('h4', {
                    className: 'font-bold text-gray-600 mb-3',
                    children: 'Top Triggers (Antecedents)',
                  }),
                  u.topAntecedents.length > 0
                    ? e.jsx('ul', {
                        className: 'space-y-2',
                        children: u.topAntecedents.map(([i, l], n) =>
                          e.jsxs(
                            'li',
                            {
                              className:
                                'flex justify-between items-center bg-white p-3 rounded-md shadow-sm',
                              children: [
                                e.jsx('span', {
                                  className: 'text-gray-800',
                                  children: i,
                                }),
                                e.jsx('span', {
                                  className:
                                    'font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-sm',
                                  children: l,
                                }),
                              ],
                            },
                            `antecedent-${n}`
                          )
                        ),
                      })
                    : e.jsx('div', {
                        className: 'text-gray-500 text-sm',
                        children: 'No antecedent data available',
                      }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('h4', {
                    className: 'font-bold text-gray-600 mb-3',
                    children: 'Top Behaviors Observed',
                  }),
                  u.topBehaviors.length > 0
                    ? e.jsx('ul', {
                        className: 'space-y-2',
                        children: u.topBehaviors.map(([i, l], n) =>
                          e.jsxs(
                            'li',
                            {
                              className:
                                'flex justify-between items-center bg-white p-3 rounded-md shadow-sm',
                              children: [
                                e.jsx('span', {
                                  className: 'text-gray-800',
                                  children: i,
                                }),
                                e.jsx('span', {
                                  className:
                                    'font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full text-sm',
                                  children: l,
                                }),
                              ],
                            },
                            `behavior-${n}`
                          )
                        ),
                      })
                    : e.jsx('div', {
                        className: 'text-gray-500 text-sm',
                        children: 'No behavior data available',
                      }),
                ],
              }),
            ],
          }),
          e.jsx('div', {
            className: 'mt-6 pt-4 border-t border-gray-200',
            children: e.jsxs('div', {
              className: 'text-sm text-gray-600',
              children: [
                e.jsx('strong', { children: 'Total Records:' }),
                ' ',
                d.length,
              ],
            }),
          }),
        ],
      });
}
const ie = 14,
  ce = [
    'Participation',
    'Asking for Help',
    'Following Directions',
    'Helping Others',
    'Problem Solving',
    'Sharing',
    'Compliment',
    'On Task',
    'Leadership',
  ],
  de = [
    'Calling Out',
    'Off Task',
    'Refusal',
    'Disruption',
    'Argument',
    'Inappropriate Language',
    'Physical Aggression',
    'Property Damage',
  ];
function le(a) {
  if (!a) return null;
  if (a instanceof Date) return a;
  if (typeof a == 'number') return new Date(a);
  if (typeof a == 'string') {
    const d = new Date(a);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}
function K(a) {
  return (a || '').trim();
}
function Y(a, d = {}) {
  const {
      windowDays: u = ie,
      positiveBehaviors: i = ce,
      negativeBehaviors: l = de,
      minSamplesForPair: n = 5,
      topKPairs: x = 8,
      topKAntecedents: s = 8,
      topKConsequences: c = 8,
      topKContexts: v = 5,
      minSamplesPerStudent: C = 3,
      pairAlpha: _ = 1,
      priorNeg: I = 0.3,
    } = d,
    E = new Date(Date.now() - u * 24 * 60 * 60 * 1e3),
    B = new Set(i.map((t) => t.toLowerCase())),
    P = new Set(l.map((t) => t.toLowerCase())),
    j = new Map(),
    N = new Map(),
    k = new Map(),
    w = new Map(),
    A = new Map(),
    F = Array.from({ length: 24 }, () => ({ pos: 0, neg: 0 })),
    S = new Map();
  let p = 0,
    L = 0;
  for (const t of (Array.isArray(a) ? a : [a]) || []) {
    const r = le(t.timestamp);
    if (!r || r < E || r > new Date()) continue;
    const y = r.getHours(),
      o =
        typeof t.weight == 'number' && isFinite(t.weight) && t.weight > 0
          ? t.weight
          : 1,
      b = K(t.antecedent),
      T = K(t.behavior),
      W = K(t.consequence);
    if (!b || !T) continue;
    (j.set(T, (j.get(T) || 0) + o),
      N.set(b, (N.get(b) || 0) + o),
      W && k.set(W, (k.get(W) || 0) + o),
      w.has(b) || w.set(b, new Map()));
    const V = w.get(b);
    V.set(T, (V.get(T) || 0) + o);
    const G = t.studentId;
    A.has(G) || A.set(G, { pos: 0, neg: 0, intensitySum: 0, intensityN: 0 });
    const $ = A.get(G),
      R = T.toLowerCase();
    if (
      (B.has(R)
        ? (($.pos += o), (L += o), (F[y].pos += o))
        : P.has(R) && (($.neg += o), (F[y].neg += o)),
      typeof t.intensity == 'number' &&
        isFinite(t.intensity) &&
        (($.intensitySum += t.intensity * o), ($.intensityN += o)),
      t.tags && Array.isArray(t.tags))
    )
      for (const X of t.tags) {
        const U = K(X);
        if (!U) continue;
        S.has(U) || S.set(U, { pos: 0, neg: 0 });
        const J = S.get(U);
        B.has(R) ? (J.pos += o) : P.has(R) && (J.neg += o);
      }
    p += o;
  }
  const M = { start: E, end: new Date() },
    D = Array.from(N.entries())
      .sort((t, r) => r[1] - t[1])
      .slice(0, s)
      .map(([t, r]) => ({
        antecedent: t,
        count: r,
        percentage: p > 0 ? Math.round((r / p) * 100) : 0,
      })),
    z = Array.from(j.entries())
      .sort((t, r) => r[1] - t[1])
      .slice(0, 8)
      .map(([t, r]) => ({
        behavior: t,
        count: r,
        percentage: p > 0 ? Math.round((r / p) * 100) : 0,
      })),
    h = Array.from(k.entries())
      .sort((t, r) => r[1] - t[1])
      .slice(0, c)
      .map(([t, r]) => ({
        consequence: t,
        count: r,
        percentage: p > 0 ? Math.round((r / p) * 100) : 0,
      })),
    g = [];
  for (const [t, r] of w.entries()) {
    const y = N.get(t) || 0;
    for (const [o, b] of r.entries())
      b >= n &&
        g.push({
          antecedent: t,
          behavior: o,
          count: b,
          probability: y > 0 ? b / y : 0,
          confidence: b / (b + _),
        });
  }
  g.sort((t, r) => r.count - t.count).splice(x);
  const m = F.map((t, r) => ({ hour: r, count: t.pos + t.neg })).filter(
      (t) => t.count > 0
    ),
    H = Array.from(S.entries())
      .filter(([, t]) => t.pos + t.neg >= 3)
      .sort((t, r) => r[1].pos + r[1].neg - (t[1].pos + t[1].neg))
      .slice(0, v)
      .map(([t, r]) => ({
        context: t,
        count: r.pos + r.neg,
        behaviors: Array.from(j.keys()).slice(0, 3),
      })),
    O = Array.from(A.entries())
      .filter(([, t]) => t.pos + t.neg >= C)
      .map(([t, r]) => {
        const y = r.pos + r.neg,
          o = y > 0 ? r.neg / y : 0;
        return {
          studentId: t,
          riskScore: Math.round(o * 100),
          topBehaviors: Array.from(j.keys()).slice(0, 3),
        };
      })
      .filter((t) => t.riskScore > 40)
      .sort((t, r) => r.riskScore - t.riskScore)
      .slice(0, 5);
  return {
    totalEvents: p,
    dateRange: M,
    topAntecedents: D,
    topBehaviors: z,
    topConsequences: h,
    abcPairs: g,
    timePatterns: m,
    contextualInsights: H,
    positiveRatio: p > 0 ? Math.round((L / p) * 100) / 100 : 0,
    riskStudents: O,
  };
}
function Q(a) {
  if (!a || a.length === 0) return null;
  const d = a.map((s) => ({
      studentId: String(s.studentId || s.student_id || s.student || ''),
      timestamp: s.timestamp || s.created_at || Date.now(),
      antecedent: s.antecedent || s.A || s.trigger || '',
      behavior: s.behavior || s.B || s.action || '',
      consequence: s.consequence || s.C || s.outcome || '',
      intensity: typeof s.intensity == 'number' ? s.intensity : void 0,
      tags: Array.isArray(s.tags) ? s.tags : void 0,
    })),
    u = Y(d),
    i = (u.antecedents || [])
      .slice(0, 5)
      .map((s) => ({ antecedent: s.name, count: s.count })),
    l = (u.consequences || [])
      .slice(0, 5)
      .map((s) => ({
        consequence: s.name,
        successRate: Math.round((1 - u.summary.baselineNeg) * 100),
        count: s.count,
      })),
    n = { 1: 0, 2: 0, 3: 0 };
  for (const s of a) {
    const c = Number(s.intensity || 0);
    c >= 1 && c <= 3 && (n[c] += 1);
  }
  const x = Object.entries(n)
    .map(([s, c]) => ({ level: parseInt(s, 10), count: c }))
    .sort((s, c) => s.level - c.level);
  return {
    topTriggers: i,
    effectiveStrategies: l,
    intensityTrends: x,
    insights: u,
  };
}
function xe() {
  const {
    abcIncidents: a,
    addABCIncident: d,
    selectedClassId: u,
    schoolId: i,
    tenantId: l,
    setTenantContext: n,
  } = ee();
  Z.useEffect(() => {
    (!l || !i) &&
      (console.log('Setting default tenant context for ABC Tracker'),
      n(
        '123e4567-e89b-12d3-a456-426614174000',
        '987fcdeb-51a2-43d1-9f12-345678901234'
      ));
  }, [l, i, n]);
  const [x, s] = f.useState(null),
    [c, v] = f.useState([]),
    [C, _] = f.useState(!1),
    [I, E] = f.useState(null),
    [B, P] = f.useState(!1),
    [j, N] = f.useState(null),
    [k, w] = f.useState('');
  f.useEffect(() => {
    u ? A(u) : (v([]), s(null));
  }, [u]);
  const A = async (h) => {
    (_(!0), E(null));
    try {
      const g = new URLSearchParams();
      (i && i.trim() && g.append('schoolId', i),
        l && l.trim() && g.append('tenantId', l));
      const m = g.toString(),
        H = `/api/abc-data/${h}${m ? '?' + m : ''}`;
      console.log('Fetching ABC data from:', H);
      const O = await fetch(H);
      if (!O.ok) throw new Error(`Failed to fetch ABC data: ${O.status}`);
      const t = await O.json();
      if ((v(t.data || []), t.data && t.data.length > 0)) {
        const r = Y(
            t.data.map((o) => ({
              studentId: String(o.studentId || o.student_id || ''),
              timestamp: o.timestamp || o.created_at || Date.now(),
              antecedent: o.antecedent || o.A || o.trigger || '',
              behavior: o.behavior || o.B || o.action || '',
              consequence: o.consequence || o.C || o.outcome || '',
              intensity: typeof o.intensity == 'number' ? o.intensity : void 0,
              tags: Array.isArray(o.tags) ? o.tags : void 0,
            }))
          ),
          y = Q(t.data);
        s({ ...y, insights: r });
      } else s(null);
    } catch (g) {
      (console.error('Error fetching ABC data:', g),
        E(g.message),
        v([]),
        s(null));
    } finally {
      _(!1);
    }
  };
  f.useEffect(() => {
    if (a && a.length > 0) {
      const h = Y(
          a.map((m) => ({
            studentId: String(m.studentId || m.student_id || m.student || ''),
            timestamp: m.timestamp || m.created_at || Date.now(),
            antecedent: m.antecedent || m.A || m.trigger || '',
            behavior: m.behavior || m.B || m.action || '',
            consequence: m.consequence || m.C || m.outcome || '',
            intensity: typeof m.intensity == 'number' ? m.intensity : void 0,
            tags: Array.isArray(m.tags) ? m.tags : void 0,
          }))
        ),
        g = Q(a);
      s({ ...g, insights: h });
    } else c.length === 0 && s(null);
  }, [a, c]);
  const F = (h) => {
      const g = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...h,
      };
      d(g);
    },
    S = [...c, ...a],
    p = S.reduce((h, g) => {
      const m = String(g.studentId || g.student_id || g.student || '');
      return (m && (h[m] = (h[m] || 0) + 1), h);
    }, {}),
    L = Object.keys(p).sort((h, g) => p[g] - p[h])[0] || '',
    M = S.filter(
      (h) => String(h.studentId || h.student_id || h.student || '') === L
    ),
    D = !!L && M.length >= 5,
    z = async () => {
      if (D) {
        (P(!0), N(null), w(''));
        try {
          const h = '/api/ai/function-of-behavior';
          console.log('[AI] Posting to:', h, 'logs:', M.length);
          const g = await fetch(h, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ logs: M }),
          });
          if (!g.ok) throw new Error(`AI analysis failed: ${g.status}`);
          const m = await g.json();
          w(m.hypothesis || '');
        } catch (h) {
          (console.error('AI analysis error:', h), N(h.message));
        } finally {
          P(!1);
        }
      }
    };
  return e.jsx('div', {
    className: 'min-h-screen bg-gray-50 p-4 md:p-6',
    'data-ct': 'abc-tracker',
    children: e.jsxs('div', {
      className: 'max-w-7xl mx-auto space-y-6',
      children: [
        e.jsxs('div', {
          className: 'bg-white rounded-xl shadow-sm p-6 border border-gray-200',
          children: [
            e.jsx('h1', {
              className: 'text-3xl font-light text-navy mb-2',
              children: 'ABC Tracker',
            }),
            e.jsx('p', {
              className: 'text-slate-600',
              children:
                'Track antecedents, behaviors, and consequences to identify patterns and improve support strategies.',
            }),
            u &&
              e.jsx('div', {
                className: 'mt-2 text-sm text-slate-500',
                children: 'Analyzing data for selected class',
              }),
          ],
        }),
        !u &&
          e.jsxs('div', {
            className:
              'bg-blue-50 border border-blue-200 rounded-xl p-6 text-center',
            children: [
              e.jsx('h3', {
                className: 'text-lg font-medium text-blue-900 mb-2',
                children: 'Select a Class',
              }),
              e.jsx('p', {
                className: 'text-blue-700',
                children:
                  'Please select a class from the class selector to view ABC behavior data and analysis.',
              }),
            ],
          }),
        C &&
          e.jsxs('div', {
            className:
              'bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center',
            children: [
              e.jsx('div', {
                className:
                  'animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto mb-4',
              }),
              e.jsx('p', {
                className: 'text-slate-600',
                children: 'Loading ABC behavior data...',
              }),
            ],
          }),
        I &&
          e.jsxs('div', {
            className:
              'bg-red-50 border border-red-200 rounded-xl p-6 text-center',
            children: [
              e.jsx('h3', {
                className: 'text-lg font-medium text-red-900 mb-2',
                children: 'Error Loading Data',
              }),
              e.jsx('p', { className: 'text-red-700', children: I }),
              e.jsx('button', {
                onClick: () => u && A(u),
                className:
                  'mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors',
                children: 'Try Again',
              }),
            ],
          }),
        !C &&
          !I &&
          u &&
          e.jsxs('div', {
            className:
              'bg-white rounded-xl shadow-sm border border-gray-200 p-6',
            children: [
              e.jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                  e.jsxs('div', {
                    children: [
                      e.jsx('h3', {
                        className: 'text-xl font-semibold text-navy',
                        children: 'AI-Powered Insight',
                      }),
                      e.jsx('p', {
                        className: 'text-slate-600 text-sm',
                        children:
                          'Generate a strength-based Function of Behavior hypothesis for the student with the most logs.',
                      }),
                    ],
                  }),
                  e.jsx('button', {
                    onClick: z,
                    disabled: !D || B,
                    className: `px-4 py-2 rounded-lg text-white font-medium transition-colors ${!D || B ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`,
                    children: B
                      ? 'Analyzing...'
                      : 'Generate Behavior Hypothesis',
                  }),
                ],
              }),
              !D &&
                e.jsx('div', {
                  className: 'mt-3 text-sm text-slate-500',
                  children:
                    'Select a student and ensure there are at least 5 logs to enable analysis.',
                }),
              j &&
                e.jsx('div', {
                  className:
                    'mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-3',
                  children: j,
                }),
              k &&
                e.jsxs('div', {
                  className:
                    'mt-4 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-lg p-4',
                  children: [
                    e.jsx('div', {
                      className: 'text-sm font-semibold mb-1',
                      children: 'Function of Behavior Hypothesis',
                    }),
                    e.jsx('div', {
                      className: 'text-sm leading-relaxed',
                      children: k,
                    }),
                  ],
                }),
            ],
          }),
        e.jsx('div', {
          className: 'bg-white rounded-xl shadow-sm border border-gray-200',
          children: e.jsx(ne, { onSubmit: F }),
        }),
        !C &&
          !I &&
          (c.length > 0 || a.length > 0) &&
          e.jsxs('div', {
            className: 'grid lg:grid-cols-2 gap-6',
            children: [
              e.jsx('div', {
                className:
                  'bg-white rounded-xl shadow-sm border border-gray-200',
                children: e.jsx(ae, { incidents: [...c, ...a] }),
              }),
              e.jsx('div', {
                className:
                  'bg-white rounded-xl shadow-sm border border-gray-200',
                children: e.jsx(oe, { patterns: x, abcData: [...c, ...a] }),
              }),
            ],
          }),
        !C &&
          !I &&
          c.length === 0 &&
          a.length === 0 &&
          u &&
          e.jsxs('div', {
            className:
              'bg-gray-50 border border-gray-200 rounded-xl p-6 text-center',
            children: [
              e.jsx('h3', {
                className: 'text-lg font-medium text-gray-900 mb-2',
                children: 'No ABC Data Available',
              }),
              e.jsx('p', {
                className: 'text-gray-600',
                children:
                  'No behavior incidents have been logged for this class yet. Start tracking to see patterns emerge.',
              }),
            ],
          }),
      ],
    }),
  });
}
export { xe as default };
