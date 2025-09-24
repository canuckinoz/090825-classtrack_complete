import { j as e, r as c } from './ui-vendor-D6t9Fqz9.js';
import { E as v, u as f } from './index-DxxIEH0w.js';
import './react-vendor-DTDVRx5A.js';
import './data-vendor-CMp-lYVg.js';
const y = {
    1: {
      icon: '☀️',
      label: 'Sunny',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
    },
    2: {
      icon: '🌤️',
      label: 'Mostly Sunny',
      color: 'text-yellow-400',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
    },
    3: {
      icon: '⛅',
      label: 'Partly Cloudy',
      color: 'text-blue-400',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    4: {
      icon: '🌧️',
      label: 'Rainy',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      border: 'border-blue-300',
    },
    5: {
      icon: '⛈️',
      label: 'Stormy',
      color: 'text-gray-600',
      bg: 'bg-gray-100',
      border: 'border-gray-300',
    },
  },
  N = {
    low: 'bg-green-50 border-green-200 text-green-800',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    high: 'bg-orange-50 border-orange-200 text-orange-800',
    critical: 'bg-red-50 border-red-200 text-red-800',
  },
  w = {
    improving: { icon: '📈', color: 'text-green-600', label: 'Improving' },
    stable: { icon: '➡️', color: 'text-blue-600', label: 'Stable' },
    declining: { icon: '📉', color: 'text-red-600', label: 'Needs Support' },
  };
function S(t) {
  return {
    class_id: t.class_id,
    morningForecast: t.risk_level,
    overallProbability: t.overall_probability,
    summary: t.weather_metaphor,
    criticalTimes: (t.critical_times || []).map((s, r) => ({
      time: `${s.hour}:00`,
      hour: s.hour,
      probability: s.probability,
      label: s.label,
      severity:
        s.probability > 0.7
          ? 'critical'
          : s.probability > 0.5
            ? 'high'
            : s.probability > 0.3
              ? 'medium'
              : 'low',
      actions: _(s.hour, s.probability),
    })),
    focusStudents: (t.focus_students || []).map((s) => ({
      studentId: s.student_id,
      riskLevel: s.risk,
      supportNote: C(s.risk),
      trend: s.risk > 0.6 ? 'declining' : s.risk > 0.4 ? 'stable' : 'improving',
    })),
    confidenceLevel:
      t.diagnostics?.total_logs > 50
        ? 'high'
        : t.diagnostics?.total_logs > 20
          ? 'medium'
          : 'low',
    dataQuality:
      t.diagnostics?.total_logs > 100
        ? 'excellent'
        : t.diagnostics?.total_logs > 50
          ? 'good'
          : t.diagnostics?.total_logs > 20
            ? 'fair'
            : 'poor',
    patterns: [],
    recommendations: k(t),
    diagnostics: {
      sample_size: t.diagnostics?.total_logs || 0,
      generated_at: t.generated_at,
      processing_time_ms: t.diagnostics?.processing_time_ms,
    },
  };
}
function _(t, s) {
  const r = [];
  return (
    t === 10
      ? (r.push('Schedule calming activities during mid-morning break'),
        r.push('Consider movement breaks before this time'))
      : t === 14
        ? (r.push('Plan engaging post-lunch activities'),
          r.push('Monitor energy levels closely'))
        : t === 15
          ? (r.push('Prepare end-of-day transition activities'),
            r.push('Consider early dismissal preparation'))
          : (r.push('Monitor class dynamics closely'),
            r.push('Have calming strategies ready')),
    s > 0.7 &&
      (r.push('Consider reducing challenging activities'),
      r.push('Ensure additional adult support is available')),
    r
  );
}
function C(t) {
  return t > 0.7
    ? 'Requires immediate attention and support strategies'
    : t > 0.5
      ? 'Would benefit from additional check-ins and support'
      : t > 0.3
        ? 'Monitor for early intervention opportunities'
        : 'Showing positive engagement patterns';
}
function k(t) {
  const s = [];
  return (
    t.risk_level >= 4
      ? (s.push('Consider implementing additional calming strategies today'),
        s.push('Ensure extra adult support is available during critical times'),
        s.push('Review and adjust daily schedule if possible'))
      : t.risk_level >= 3
        ? (s.push('Monitor class dynamics closely throughout the day'),
          s.push('Have intervention strategies prepared'))
        : (s.push('Maintain current positive strategies'),
          s.push('Continue regular monitoring and observation')),
    t.critical_times?.length > 2 &&
      s.push('Focus support during identified high-risk periods'),
    t.focus_students?.length > 3 &&
      s.push('Consider small group activities to provide targeted support'),
    s
  );
}
function T(t, s = 3e5) {
  const [r, i] = c.useState(null),
    [a, l] = c.useState(!1),
    [n, m] = c.useState(null),
    [u, h] = c.useState(null),
    o = c.useRef(null),
    g = c.useCallback(
      async (x = !1) => {
        if (!t) {
          l(!1);
          return;
        }
        if (!(o.current && !x))
          try {
            (l(!0),
              m(null),
              o.current && o.current.abort(),
              (o.current = new AbortController()));
            const d = await fetch(`/api/class-forecast/${t}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              signal: o.current.signal,
            });
            if (!d.ok)
              throw new Error(
                `Failed to fetch forecast: ${d.status} ${d.statusText}`
              );
            const b = await d.json(),
              j = S(b);
            (i(j), h(new Date()));
          } catch (d) {
            d.name !== 'AbortError' &&
              (console.error('Weather data fetch failed:', d),
              m(d.message || 'Failed to load weather data'));
          } finally {
            (l(!1), (o.current = null));
          }
      },
      [t]
    );
  c.useEffect(() => {
    if (t) {
      g();
      const x = setInterval(() => {
        g();
      }, s);
      return () => {
        (clearInterval(x), o.current && o.current.abort());
      };
    }
  }, [t, g, s]);
  const p = c.useCallback(() => g(!0), [g]);
  return { data: r, loading: a, error: n, lastUpdated: u, refresh: p };
}
function $() {
  const [t, s] = c.useState(''),
    r = c.useCallback((i) => {
      (s(i), setTimeout(() => s(''), 1e3));
    }, []);
  return { announcement: t, announce: r };
}
function E() {
  const { user: t, isAuthenticated: s } = f(),
    { selectedClassId: r, currentUser: i } = f(),
    { data: a, loading: l, error: n, lastUpdated: m, refresh: u } = T(r),
    { announcement: h, announce: o } = $(),
    [g, p] = c.useState('today'),
    [x, d] = c.useState(!1);
  return (
    c.useEffect(() => {
      if (a && !l) {
        const b = a.morningForecast;
        b >= 4 && o(`High support period detected. Risk level ${b} out of 5.`);
      }
    }, [a, l, o]),
    !s || !t
      ? e.jsx(R, {})
      : r
        ? n
          ? e.jsx(Q, { error: n, onRetry: u })
          : l && !a
            ? e.jsx(H, {})
            : a
              ? e.jsxs('div', {
                  className: 'space-y-6 p-6 max-w-7xl mx-auto',
                  'data-ct': 'weather-forecast',
                  role: 'main',
                  'aria-label': 'Behaviour Weather Dashboard',
                  children: [
                    e.jsx('div', {
                      'aria-live': 'polite',
                      'aria-atomic': 'true',
                      className: 'sr-only',
                      children: h,
                    }),
                    e.jsx(L, {
                      weatherData: a,
                      lastUpdated: m,
                      onRefresh: u,
                      loading: l,
                      selectedTimeRange: g,
                      onTimeRangeChange: p,
                      showDetails: x,
                      onToggleDetails: d,
                    }),
                    e.jsx(A, { forecast: a, showDetails: x }),
                    a.criticalTimes?.length > 0 &&
                      e.jsx(F, { times: a.criticalTimes, showDetails: x }),
                    a.focusStudents?.length > 0 &&
                      e.jsx(W, {
                        students: a.focusStudents,
                        userRole: i?.role,
                        showDetails: x,
                      }),
                    a.patterns?.length > 0 &&
                      e.jsx(D, {
                        patterns: a.patterns,
                        recommendations: a.recommendations,
                      }),
                    e.jsx(M, {
                      quality: a.dataQuality,
                      confidenceLevel: a.confidenceLevel,
                      sampleSize: a.diagnostics?.sample_size,
                    }),
                  ],
                })
              : e.jsx(q, { onRefresh: u })
        : e.jsx(P, {})
  );
}
function L({
  weatherData: t,
  lastUpdated: s,
  onRefresh: r,
  loading: i,
  selectedTimeRange: a,
  onTimeRangeChange: l,
  showDetails: n,
  onToggleDetails: m,
}) {
  const u = y[t.morningForecast];
  return e.jsxs('header', {
    className: 'bg-white rounded-xl p-6 border border-gray-200 shadow-sm',
    children: [
      e.jsxs('div', {
        className: 'flex items-center justify-between',
        children: [
          e.jsxs('div', {
            className: 'flex items-center gap-4',
            children: [
              e.jsx('div', {
                className: 'text-4xl',
                'aria-hidden': 'true',
                children: u.icon,
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('h1', {
                    className: 'text-2xl font-bold text-gray-900',
                    children: 'Behaviour Weather Station',
                  }),
                  e.jsx('p', {
                    className: 'text-gray-600 mt-1',
                    children: t.summary,
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'flex items-center gap-3',
            children: [
              e.jsxs('select', {
                value: a,
                onChange: (h) => l(h.target.value),
                className:
                  'px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'aria-label': 'Select time range for forecast',
                children: [
                  e.jsx('option', { value: 'today', children: 'Today' }),
                  e.jsx('option', { value: 'week', children: 'This Week' }),
                  e.jsx('option', { value: 'month', children: 'This Month' }),
                ],
              }),
              e.jsx('button', {
                onClick: () => m(!n),
                className:
                  'px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                'aria-pressed': n,
                'aria-label': n
                  ? 'Hide detailed information'
                  : 'Show detailed information',
                children: n ? 'Hide Details' : 'Show Details',
              }),
              e.jsx('button', {
                onClick: () => {
                  const { setActiveView: h } = f.getState();
                  h('behaviourLog');
                },
                className:
                  'px-4 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
                'aria-label': 'Navigate to Behaviour Log',
                children: '📝 Log Behaviour',
              }),
              e.jsxs('button', {
                onClick: r,
                disabled: i,
                className:
                  'px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
                'aria-label': 'Refresh weather data',
                children: [
                  e.jsx('span', {
                    className: `inline-block ${i ? 'animate-spin' : ''}`,
                    children: '🔄',
                  }),
                  e.jsx('span', {
                    className: 'ml-2',
                    children: i ? 'Updating...' : 'Refresh',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      e.jsxs('div', {
        className:
          'mt-4 flex items-center justify-between text-sm text-gray-500',
        children: [
          e.jsxs('div', {
            className: 'flex items-center gap-4',
            children: [
              e.jsxs('span', {
                children: [
                  'Last updated: ',
                  s ? s.toLocaleTimeString() : 'Never',
                ],
              }),
              e.jsxs('span', {
                className: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${t.confidenceLevel === 'high' ? 'bg-green-100 text-green-800' : t.confidenceLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`,
                children: [t.confidenceLevel, ' confidence'],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'flex items-center gap-2',
            children: [
              e.jsx('div', {
                className: `w-2 h-2 rounded-full ${t.dataQuality === 'excellent' ? 'bg-green-500' : t.dataQuality === 'good' ? 'bg-yellow-500' : t.dataQuality === 'fair' ? 'bg-orange-500' : 'bg-red-500'}`,
                'aria-hidden': 'true',
              }),
              e.jsxs('span', { children: ['Data quality: ', t.dataQuality] }),
            ],
          }),
        ],
      }),
    ],
  });
}
function A({ forecast: t, showDetails: s }) {
  const r = y[t.morningForecast];
  return e.jsxs('section', {
    className: `rounded-xl p-6 border-2 ${r.bg} ${r.border} shadow-sm`,
    'aria-labelledby': 'morning-forecast-title',
    children: [
      e.jsx('h2', {
        id: 'morning-forecast-title',
        className: 'text-xl font-semibold text-gray-900 mb-4',
        children: 'Morning Forecast',
      }),
      e.jsxs('div', {
        className: 'grid grid-cols-1 lg:grid-cols-3 gap-6',
        children: [
          e.jsxs('div', {
            className: 'lg:col-span-2',
            children: [
              e.jsxs('div', {
                className: 'flex items-center gap-4',
                children: [
                  e.jsx('div', {
                    className: 'text-6xl',
                    'aria-hidden': 'true',
                    children: r.icon,
                  }),
                  e.jsxs('div', {
                    children: [
                      e.jsx('div', {
                        className: `text-3xl font-bold ${r.color}`,
                        children: r.label,
                      }),
                      e.jsxs('div', {
                        className: 'text-gray-600 mt-1',
                        children: ['Support Level: ', t.morningForecast, '/5'],
                      }),
                      e.jsx('div', {
                        className: 'text-sm text-gray-500 mt-2',
                        children: t.summary,
                      }),
                    ],
                  }),
                ],
              }),
              s &&
                e.jsxs('div', {
                  className: 'mt-4 p-4 bg-white bg-opacity-50 rounded-lg',
                  children: [
                    e.jsx('h3', {
                      className: 'font-medium text-gray-900 mb-2',
                      children: 'Forecast Details',
                    }),
                    e.jsxs('dl', {
                      className: 'grid grid-cols-2 gap-3 text-sm',
                      children: [
                        e.jsxs('div', {
                          children: [
                            e.jsx('dt', {
                              className: 'font-medium text-gray-700',
                              children: 'Overall Probability',
                            }),
                            e.jsxs('dd', {
                              className: 'text-gray-600',
                              children: [
                                Math.round(t.overallProbability * 100),
                                '%',
                              ],
                            }),
                          ],
                        }),
                        e.jsxs('div', {
                          children: [
                            e.jsx('dt', {
                              className: 'font-medium text-gray-700',
                              children: 'Confidence Level',
                            }),
                            e.jsx('dd', {
                              className: 'text-gray-600 capitalize',
                              children: t.confidenceLevel,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          e.jsxs('div', {
            className: 'space-y-3',
            children: [
              e.jsxs('div', {
                className: 'bg-white bg-opacity-70 rounded-lg p-4',
                children: [
                  e.jsx('div', {
                    className: 'text-2xl font-bold text-gray-900',
                    children: t.criticalTimes?.length || 0,
                  }),
                  e.jsx('div', {
                    className: 'text-sm text-gray-600',
                    children: 'Critical Times',
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'bg-white bg-opacity-70 rounded-lg p-4',
                children: [
                  e.jsx('div', {
                    className: 'text-2xl font-bold text-gray-900',
                    children: t.focusStudents?.length || 0,
                  }),
                  e.jsx('div', {
                    className: 'text-sm text-gray-600',
                    children: 'Focus Students',
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'bg-white bg-opacity-70 rounded-lg p-4',
                children: [
                  e.jsx('div', {
                    className: 'text-2xl font-bold text-gray-900',
                    children: t.patterns?.length || 0,
                  }),
                  e.jsx('div', {
                    className: 'text-sm text-gray-600',
                    children: 'Patterns Detected',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function F({ times: t, showDetails: s }) {
  return e.jsxs('section', {
    className: 'bg-white rounded-xl p-6 border border-gray-200 shadow-sm',
    'aria-labelledby': 'critical-times-title',
    children: [
      e.jsx('h2', {
        id: 'critical-times-title',
        className: 'text-lg font-semibold text-gray-900 mb-4',
        children: 'Critical Support Times',
      }),
      e.jsx('div', {
        className: 'space-y-3',
        children: t.map((r, i) =>
          e.jsxs(
            'div',
            {
              className: `p-4 rounded-lg border ${N[r.severity]}`,
              role: 'article',
              'aria-labelledby': `critical-time-${i}`,
              children: [
                e.jsxs('div', {
                  className: 'flex items-center justify-between',
                  children: [
                    e.jsxs('div', {
                      className: 'flex items-center gap-3',
                      children: [
                        e.jsx('div', {
                          className: 'text-lg font-mono font-bold',
                          children: r.time,
                        }),
                        e.jsxs('div', {
                          children: [
                            e.jsx('div', {
                              id: `critical-time-${i}`,
                              className: 'font-medium',
                              children: r.label,
                            }),
                            e.jsxs('div', {
                              className: 'text-sm opacity-75',
                              children: [
                                Math.round(r.probability * 100),
                                '% probability',
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsx('div', {
                      className: `px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${r.severity === 'critical' ? 'bg-red-200 text-red-800' : r.severity === 'high' ? 'bg-orange-200 text-orange-800' : r.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`,
                      children: r.severity,
                    }),
                  ],
                }),
                s &&
                  r.actions?.length > 0 &&
                  e.jsxs('div', {
                    className:
                      'mt-3 pt-3 border-t border-current border-opacity-20',
                    children: [
                      e.jsx('h4', {
                        className: 'text-sm font-medium mb-2',
                        children: 'Suggested Actions:',
                      }),
                      e.jsx('ul', {
                        className: 'text-sm space-y-1',
                        children: r.actions.map((a, l) =>
                          e.jsxs(
                            'li',
                            {
                              className: 'flex items-start gap-2',
                              children: [
                                e.jsx('span', {
                                  className: 'text-xs mt-1',
                                  children: '•',
                                }),
                                e.jsx('span', { children: a }),
                              ],
                            },
                            l
                          )
                        ),
                      }),
                    ],
                  }),
              ],
            },
            `${r.hour}-${i}`
          )
        ),
      }),
      t.length === 0 &&
        e.jsxs('div', {
          className: 'text-center py-8 text-gray-500',
          children: [
            e.jsx('div', { className: 'text-4xl mb-2', children: '✅' }),
            e.jsx('p', { children: 'No critical support periods identified' }),
            e.jsx('p', {
              className: 'text-sm mt-1',
              children: 'Maintain regular monitoring throughout the day',
            }),
          ],
        }),
    ],
  });
}
function W({ students: t, userRole: s, showDetails: r }) {
  const i = ['teacher', 'principal', 'admin'].includes(s);
  return e.jsxs('section', {
    className: 'bg-white rounded-xl p-6 border border-gray-200 shadow-sm',
    'aria-labelledby': 'focus-students-title',
    children: [
      e.jsx('h2', {
        id: 'focus-students-title',
        className: 'text-lg font-semibold text-gray-900 mb-4',
        children: 'Students Needing Extra Support',
      }),
      e.jsx('div', {
        className: 'space-y-3',
        children: t.map((a, l) => {
          const n = w[a.trend];
          return e.jsx(
            'div',
            {
              className: 'p-4 bg-gray-50 rounded-lg border border-gray-200',
              role: 'article',
              'aria-labelledby': `student-${l}`,
              children: e.jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                  e.jsxs('div', {
                    className: 'flex items-center gap-3',
                    children: [
                      e.jsx('div', {
                        className:
                          'w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm',
                        children: i
                          ? a.student_name
                              ?.split(' ')
                              .map((m) => m[0])
                              .join('') || a.student_id?.slice(-2)
                          : l + 1,
                      }),
                      e.jsxs('div', {
                        children: [
                          e.jsx('div', {
                            id: `student-${l}`,
                            className: 'font-medium text-gray-900',
                            children: i
                              ? a.student_name ||
                                `Student ${a.student_id?.slice(-4)}`
                              : `Student ${l + 1}`,
                          }),
                          e.jsx('div', {
                            className: 'text-sm text-gray-600',
                            children: a.supportNote,
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'flex items-center gap-2',
                    children: [
                      e.jsxs('div', {
                        className: `flex items-center gap-1 ${n.color}`,
                        children: [
                          e.jsx('span', {
                            'aria-hidden': 'true',
                            children: n.icon,
                          }),
                          e.jsx('span', {
                            className: 'text-sm font-medium',
                            children: n.label,
                          }),
                        ],
                      }),
                      r &&
                        e.jsx('div', {
                          className: 'text-right',
                          children: e.jsxs('div', {
                            className: 'text-sm font-mono',
                            children: [
                              'Risk: ',
                              Math.round((a.risk || 0) * 100),
                              '%',
                            ],
                          }),
                        }),
                    ],
                  }),
                ],
              }),
            },
            a.student_id
          );
        }),
      }),
      t.length === 0 &&
        e.jsxs('div', {
          className: 'text-center py-8 text-gray-500',
          children: [
            e.jsx('div', { className: 'text-4xl mb-2', children: '🌟' }),
            e.jsx('p', { children: 'All students are doing well' }),
            e.jsx('p', {
              className: 'text-sm mt-1',
              children: 'No students requiring additional support identified',
            }),
          ],
        }),
    ],
  });
}
function D({ patterns: t, recommendations: s }) {
  return e.jsxs('section', {
    className: 'bg-white rounded-xl p-6 border border-gray-200 shadow-sm',
    'aria-labelledby': 'patterns-title',
    children: [
      e.jsx('h2', {
        id: 'patterns-title',
        className: 'text-lg font-semibold text-gray-900 mb-4',
        children: 'Pattern Recognition & Recommendations',
      }),
      e.jsxs('div', {
        className: 'space-y-4',
        children: [
          t.length > 0 &&
            e.jsxs('div', {
              children: [
                e.jsx('h3', {
                  className: 'text-sm font-medium text-gray-700 mb-2',
                  children: 'Detected Patterns',
                }),
                e.jsx('div', {
                  className: 'flex flex-wrap gap-2',
                  children: t.map((r, i) =>
                    e.jsxs(
                      'span',
                      {
                        className:
                          'inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-800 rounded-full border border-purple-200 text-sm',
                        children: [
                          e.jsx('span', {
                            'aria-hidden': 'true',
                            children: '🔍',
                          }),
                          e.jsx('span', { children: r }),
                        ],
                      },
                      i
                    )
                  ),
                }),
              ],
            }),
          s?.length > 0 &&
            e.jsxs('div', {
              children: [
                e.jsx('h3', {
                  className: 'text-sm font-medium text-gray-700 mb-2',
                  children: 'Recommended Actions',
                }),
                e.jsx('ul', {
                  className: 'space-y-2',
                  children: s.map((r, i) =>
                    e.jsxs(
                      'li',
                      {
                        className:
                          'flex items-start gap-2 text-sm text-gray-600',
                        children: [
                          e.jsx('span', {
                            className: 'text-green-500 mt-1',
                            'aria-hidden': 'true',
                            children: '✓',
                          }),
                          e.jsx('span', { children: r }),
                        ],
                      },
                      i
                    )
                  ),
                }),
              ],
            }),
        ],
      }),
      e.jsx('div', {
        className: 'mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200',
        children: e.jsxs('p', {
          className: 'text-sm text-blue-800',
          children: [
            e.jsx('strong', { children: 'Advisory Notice:' }),
            ' These patterns and recommendations are advisory only and should be used to inform, not prescribe, support strategies.',
          ],
        }),
      }),
    ],
  });
}
function M({ quality: t, confidenceLevel: s, sampleSize: r }) {
  const i = {
    excellent: 'text-green-600',
    good: 'text-blue-600',
    fair: 'text-yellow-600',
    poor: 'text-red-600',
  }[t];
  return e.jsx('div', {
    className: 'bg-gray-50 rounded-lg p-4 border border-gray-200',
    children: e.jsxs('div', {
      className: 'flex items-center justify-between text-sm',
      children: [
        e.jsxs('div', {
          className: 'flex items-center gap-4',
          children: [
            e.jsxs('div', {
              children: [
                e.jsx('span', {
                  className: 'text-gray-700',
                  children: 'Data Quality: ',
                }),
                e.jsx('span', { className: `font-medium ${i}`, children: t }),
              ],
            }),
            e.jsxs('div', {
              children: [
                e.jsx('span', {
                  className: 'text-gray-700',
                  children: 'Sample Size: ',
                }),
                e.jsxs('span', {
                  className: 'font-medium',
                  children: [r || 0, ' observations'],
                }),
              ],
            }),
          ],
        }),
        e.jsx('div', {
          className: 'text-xs text-gray-500',
          children:
            'Forecast accuracy improves with more observations over time',
        }),
      ],
    }),
  });
}
function R() {
  return e.jsxs('div', {
    className: 'p-6 text-center max-w-md mx-auto',
    'data-ct': 'weather-forecast',
    children: [
      e.jsx('div', { className: 'text-4xl mb-4', children: '🔐' }),
      e.jsx('h3', {
        className: 'text-lg font-semibold text-gray-900 mb-2',
        children: 'Authentication Required',
      }),
      e.jsx('p', {
        className: 'text-gray-600',
        children:
          'Please sign in to view class weather forecasts and support insights.',
      }),
    ],
  });
}
function P() {
  return e.jsxs('div', {
    className: 'p-6 text-center max-w-md mx-auto',
    'data-ct': 'weather-forecast',
    children: [
      e.jsx('div', { className: 'text-4xl mb-4', children: '📚' }),
      e.jsx('h3', {
        className: 'text-lg font-semibold text-gray-900 mb-2',
        children: 'Select a Class',
      }),
      e.jsx('p', {
        className: 'text-gray-600',
        children:
          'Choose a class to see the behaviour weather forecast and support recommendations.',
      }),
    ],
  });
}
function Q({ error: t, onRetry: s }) {
  return e.jsxs('div', {
    className: 'p-6 text-center max-w-md mx-auto',
    'data-ct': 'weather-forecast',
    children: [
      e.jsx('div', { className: 'text-4xl mb-4', children: '⚠️' }),
      e.jsx('h3', {
        className: 'text-lg font-semibold text-gray-900 mb-2',
        children: 'Unable to Load Weather Data',
      }),
      e.jsx('p', { className: 'text-gray-600 mb-4', children: t }),
      e.jsx('button', {
        onClick: s,
        className:
          'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        children: 'Try Again',
      }),
    ],
  });
}
function q({ onRefresh: t }) {
  return e.jsxs('div', {
    className: 'p-6 text-center max-w-md mx-auto',
    'data-ct': 'weather-forecast',
    children: [
      e.jsx('div', { className: 'text-4xl mb-4', children: '📊' }),
      e.jsx('h3', {
        className: 'text-lg font-semibold text-gray-900 mb-2',
        children: 'Building Forecast',
      }),
      e.jsx('p', {
        className: 'text-gray-600 mb-4',
        children:
          'Gathering class data to generate your behaviour weather forecast...',
      }),
      e.jsx('button', {
        onClick: t,
        className:
          'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        children: 'Refresh Data',
      }),
    ],
  });
}
function H() {
  return e.jsxs('div', {
    className: 'space-y-6 p-6',
    'data-ct': 'weather-forecast',
    children: [
      e.jsxs('div', {
        className: 'animate-pulse',
        children: [
          e.jsx('div', { className: 'bg-gray-200 rounded-xl h-32 mb-6' }),
          e.jsx('div', { className: 'bg-gray-200 rounded-xl h-48 mb-6' }),
          e.jsx('div', { className: 'bg-gray-200 rounded-xl h-32 mb-6' }),
          e.jsx('div', { className: 'bg-gray-200 rounded-xl h-40' }),
        ],
      }),
      e.jsx('div', {
        className: 'text-center text-gray-500 mt-4',
        children: e.jsxs('div', {
          className: 'inline-flex items-center gap-2',
          children: [
            e.jsx('div', {
              className:
                'animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full',
            }),
            e.jsx('span', { children: 'Loading weather forecast...' }),
          ],
        }),
      }),
    ],
  });
}
function O() {
  return e.jsx(v, {
    fallback: e.jsxs('div', {
      className: 'p-6 text-center',
      'data-ct': 'weather-forecast',
      children: [
        e.jsx('div', { className: 'text-4xl mb-4', children: '🌩️' }),
        e.jsx('h3', {
          className: 'text-lg font-semibold text-gray-900 mb-2',
          children: 'Weather System Unavailable',
        }),
        e.jsx('p', {
          className: 'text-gray-600',
          children:
            'The weather forecasting system is temporarily unavailable. Please try again later.',
        }),
      ],
    }),
    children: e.jsx(E, {}),
  });
}
export {
  R as AuthenticationRequired,
  P as ClassSelectionRequired,
  F as CriticalTimesSection,
  W as FocusStudentsSection,
  A as MorningForecast,
  q as NoDataAvailable,
  D as PatternRecognitionSection,
  E as WeatherDashboard,
  Q as WeatherError,
  H as WeatherSkeleton,
  O as default,
};
