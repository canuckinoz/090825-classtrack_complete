import {
  R as b,
  j as e,
  r as o,
  c as y,
  B as S,
  C as A,
  X as D,
  Y as $,
  T as f,
  d as k,
  P as B,
  e as R,
  f as P,
} from './ui-vendor-D6t9Fqz9.js';
import './react-vendor-DTDVRx5A.js';
function v({ title: t, summary: n, data: x, columns: c, children: i }) {
  const l = b.useId();
  return e.jsxs('figure', {
    'aria-describedby': l,
    className: 'w-full',
    children: [
      e.jsx('figcaption', { className: 'visually-hidden', children: t }),
      i,
      e.jsxs('div', {
        id: l,
        className: 'visually-hidden',
        children: [
          e.jsx('p', { children: n }),
          e.jsxs('table', {
            children: [
              e.jsx('thead', {
                children: e.jsx('tr', {
                  children: c.map((d) =>
                    e.jsx('th', { children: d.header }, d.key)
                  ),
                }),
              }),
              e.jsx('tbody', {
                children: x.map((d, h) =>
                  e.jsx(
                    'tr',
                    {
                      children: c.map((r) =>
                        e.jsx('td', { children: d[r.key] }, r.key)
                      ),
                    },
                    h
                  )
                ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function T() {
  const [t, n] = o.useState(null),
    [x, c] = o.useState(!0),
    [i, l] = o.useState(null),
    [d, h] = o.useState('overview'),
    [r, g] = o.useState(null);
  o.useEffect(() => {
    (async () => {
      try {
        c(!0);
        const u = await fetch(
          '/api/analytics/550e8400-e29b-41d4-a716-446655440001'
        );
        if (!u.ok) throw new Error(`Failed to fetch analytics: ${u.status}`);
        const C = await u.json();
        (n(C), l(null));
      } catch (a) {
        (console.error('Failed to fetch analytics data:', a),
          l('Failed to load analytics data'));
      } finally {
        c(!1);
      }
    })();
  }, []);
  const j = b.useMemo(
      () =>
        t?.hourlyFrequency
          ? t.hourlyFrequency.map((s) => ({
              hour: `${s.hour}:00`,
              count: s.count,
            }))
          : [],
      [t]
    ),
    m = b.useMemo(() => (t?.typeDistribution ? t.typeDistribution : []), [t]),
    p = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  if (x)
    return e.jsxs('div', {
      className: 'rounded-xl bg-white p-6 shadow space-y-6',
      children: [
        e.jsx('h2', {
          className: 'text-2xl font-light text-navy mb-2',
          children: 'Reports & Analytics',
        }),
        e.jsx('div', {
          className: 'flex items-center justify-center h-64',
          children: e.jsx('p', {
            className: 'text-gray-600',
            children: 'Loading analytics data...',
          }),
        }),
      ],
    });
  if (i)
    return e.jsxs('div', {
      className: 'rounded-xl bg-white p-6 shadow space-y-6',
      children: [
        e.jsx('h2', {
          className: 'text-2xl font-light text-navy mb-2',
          children: 'Reports & Analytics',
        }),
        e.jsx('div', {
          className: 'flex items-center justify-center h-64',
          children: e.jsx('p', { className: 'text-red-600', children: i }),
        }),
      ],
    });
  if (!t)
    return e.jsxs('div', {
      className: 'rounded-xl bg-white p-6 shadow space-y-6',
      children: [
        e.jsx('h2', {
          className: 'text-2xl font-light text-navy mb-2',
          children: 'Reports & Analytics',
        }),
        e.jsx('div', {
          className: 'flex items-center justify-center h-64',
          children: e.jsx('p', {
            className: 'text-gray-600',
            children: 'No analytics data available',
          }),
        }),
      ],
    });
  const N = [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'critical', label: 'Critical Patterns', icon: '🚨' },
    ],
    w = () => {
      switch (d) {
        case 'overview':
          return e.jsxs(e.Fragment, {
            children: [
              e.jsxs('div', {
                className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                children: [
                  e.jsxs('div', {
                    children: [
                      e.jsx('h3', {
                        className: 'text-lg font-medium text-navy mb-4',
                        children: 'Behavior Frequency by Hour',
                      }),
                      e.jsx(v, {
                        title: 'Behavior frequency by hour',
                        summary:
                          'Chart shows the number of behaviors logged at different hours of the day.',
                        data: j,
                        columns: [
                          { key: 'hour', header: 'Hour' },
                          { key: 'count', header: 'Count' },
                        ],
                        children: e.jsx(y, {
                          width: '100%',
                          height: 260,
                          children: e.jsxs(S, {
                            data: j,
                            role: 'img',
                            'aria-label':
                              'Bar chart of behavior frequency by hour',
                            children: [
                              e.jsx(A, { strokeDasharray: '3 3' }),
                              e.jsx(D, { dataKey: 'hour' }),
                              e.jsx($, {}),
                              e.jsx(f, {}),
                              e.jsx(k, { dataKey: 'count', fill: '#1A237E' }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    children: [
                      e.jsx('h3', {
                        className: 'text-lg font-medium text-navy mb-4',
                        children: 'Behavior Types Distribution',
                      }),
                      e.jsx(v, {
                        title: 'Behavior types distribution',
                        summary:
                          'Pie chart showing the distribution of different behavior types.',
                        data: m,
                        columns: [
                          { key: 'type', header: 'Type' },
                          { key: 'count', header: 'Count' },
                        ],
                        children: e.jsx(y, {
                          width: '100%',
                          height: 260,
                          children: e.jsxs(B, {
                            role: 'img',
                            'aria-label': 'Pie chart of behavior types',
                            children: [
                              e.jsx(R, {
                                data: m,
                                cx: '50%',
                                cy: '50%',
                                labelLine: !1,
                                label: ({ type: s, percent: a }) =>
                                  `${s} ${(a * 100).toFixed(0)}%`,
                                outerRadius: 80,
                                fill: '#8884d8',
                                dataKey: 'count',
                                children: m.map((s, a) =>
                                  e.jsx(
                                    P,
                                    { fill: p[a % p.length] },
                                    `cell-${a}`
                                  )
                                ),
                              }),
                              e.jsx(f, {}),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'mt-8',
                children: [
                  e.jsx('h3', {
                    className: 'text-lg font-medium text-navy mb-4',
                    children: 'Summary Statistics',
                  }),
                  e.jsxs('div', {
                    className: 'grid grid-cols-1 md:grid-cols-4 gap-4',
                    children: [
                      e.jsxs('div', {
                        className: 'bg-blue-50 p-4 rounded-lg',
                        children: [
                          e.jsx('div', {
                            className: 'text-2xl font-bold text-blue-600',
                            children: t.summaryStatistics.totalLogs,
                          }),
                          e.jsx('div', {
                            className: 'text-sm text-blue-800',
                            children: 'Total Behaviors',
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'bg-green-50 p-4 rounded-lg',
                        children: [
                          e.jsx('div', {
                            className: 'text-2xl font-bold text-green-600',
                            children: t.summaryStatistics.studentCount,
                          }),
                          e.jsx('div', {
                            className: 'text-sm text-green-800',
                            children: 'Students',
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'bg-purple-50 p-4 rounded-lg',
                        children: [
                          e.jsx('div', {
                            className: 'text-2xl font-bold text-purple-600',
                            children: m.length,
                          }),
                          e.jsx('div', {
                            className: 'text-sm text-purple-800',
                            children: 'Behavior Types',
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'bg-orange-50 p-4 rounded-lg',
                        children: [
                          e.jsx('div', {
                            className: 'text-2xl font-bold text-orange-600',
                            children: t.summaryStatistics.avgPerStudent,
                          }),
                          e.jsx('div', {
                            className: 'text-sm text-orange-800',
                            children: 'Avg per Student',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        case 'critical':
          return e.jsxs('div', {
            className: 'space-y-6',
            children: [
              e.jsxs('div', {
                className:
                  'bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-200',
                children: [
                  e.jsxs('div', {
                    className: 'flex items-center gap-3 mb-4',
                    children: [
                      e.jsx('div', { className: 'text-2xl', children: '🚨' }),
                      e.jsxs('div', {
                        children: [
                          e.jsx('h4', {
                            className: 'text-lg font-semibold text-red-900',
                            children: 'Administrative Alert System',
                          }),
                          e.jsx('p', {
                            className: 'text-sm text-red-700',
                            children:
                              'Critical patterns requiring immediate attention',
                          }),
                        ],
                      }),
                    ],
                  }),
                  t.trends?.criticalPatterns?.length === 0
                    ? e.jsxs('div', {
                        className: 'text-center py-8',
                        children: [
                          e.jsx('div', {
                            className: 'text-4xl mb-2',
                            children: '✅',
                          }),
                          e.jsx('p', {
                            className: 'text-green-700 font-medium',
                            children: 'No critical patterns detected',
                          }),
                          e.jsx('p', {
                            className: 'text-sm text-green-600',
                            children:
                              'All systems operating within normal parameters',
                          }),
                        ],
                      })
                    : e.jsx('div', {
                        className: 'space-y-4',
                        children: t.trends?.criticalPatterns?.map((s, a) =>
                          e.jsx(
                            q,
                            {
                              pattern: s,
                              onClick: () => g(s),
                              isSelected: r?.title === s.title,
                            },
                            a
                          )
                        ),
                      }),
                ],
              }),
              e.jsxs('div', {
                className:
                  'bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 border border-amber-200',
                children: [
                  e.jsxs('h4', {
                    className:
                      'text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2',
                    children: [
                      e.jsx('span', { children: '📋' }),
                      'Contributing Behaviors',
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'grid gap-4 md:grid-cols-2',
                    children: [
                      e.jsxs('div', {
                        className:
                          'bg-white p-4 rounded-lg border border-amber-200',
                        children: [
                          e.jsx('h5', {
                            className: 'font-medium text-amber-800 mb-3',
                            children: 'Most Common Behaviors',
                          }),
                          e.jsx('div', {
                            className: 'space-y-2',
                            children: t.typeDistribution
                              ?.slice(0, 4)
                              .map((s, a) =>
                                e.jsxs(
                                  'div',
                                  {
                                    className:
                                      'flex items-center justify-between text-sm',
                                    children: [
                                      e.jsx('span', {
                                        className: 'text-amber-700',
                                        children: s.type,
                                      }),
                                      e.jsxs('span', {
                                        className:
                                          'bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium',
                                        children: [s.count, ' times'],
                                      }),
                                    ],
                                  },
                                  a
                                )
                              ),
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className:
                          'bg-white p-4 rounded-lg border border-amber-200',
                        children: [
                          e.jsx('h5', {
                            className: 'font-medium text-amber-800 mb-3',
                            children: 'Behavior Distribution',
                          }),
                          e.jsxs('div', {
                            className: 'space-y-2',
                            children: [
                              e.jsxs('div', {
                                className:
                                  'flex items-center justify-between text-sm',
                                children: [
                                  e.jsx('span', {
                                    className: 'text-amber-700',
                                    children: 'Positive Behaviors',
                                  }),
                                  e.jsx('span', {
                                    className:
                                      'bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium',
                                    children:
                                      t.typeDistribution
                                        ?.filter(
                                          (s) =>
                                            s.type.includes('Active') ||
                                            s.type.includes('Peer') ||
                                            s.type.includes('On Task') ||
                                            s.type.includes('Creative')
                                        )
                                        .reduce((s, a) => s + a.count, 0) || 0,
                                  }),
                                ],
                              }),
                              e.jsxs('div', {
                                className:
                                  'flex items-center justify-between text-sm',
                                children: [
                                  e.jsx('span', {
                                    className: 'text-amber-700',
                                    children: 'Challenging Behaviors',
                                  }),
                                  e.jsx('span', {
                                    className:
                                      'bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium',
                                    children:
                                      t.typeDistribution
                                        ?.filter(
                                          (s) =>
                                            s.type.includes('Needs') ||
                                            s.type.includes('Disengaged') ||
                                            s.type.includes('Conflict') ||
                                            s.type.includes('Attention')
                                        )
                                        .reduce((s, a) => s + a.count, 0) || 0,
                                  }),
                                ],
                              }),
                              e.jsxs('div', {
                                className:
                                  'flex items-center justify-between text-sm',
                                children: [
                                  e.jsx('span', {
                                    className: 'text-amber-700',
                                    children: 'Leadership Behaviors',
                                  }),
                                  e.jsx('span', {
                                    className:
                                      'bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium',
                                    children:
                                      t.typeDistribution
                                        ?.filter(
                                          (s) =>
                                            s.type.includes('Leadership') ||
                                            s.type.includes('Mentoring')
                                        )
                                        .reduce((s, a) => s + a.count, 0) || 0,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              r &&
                e.jsxs('div', {
                  className:
                    'bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200',
                  children: [
                    e.jsxs('div', {
                      className: 'flex items-center justify-between mb-6',
                      children: [
                        e.jsxs('div', {
                          className: 'flex items-center gap-3',
                          children: [
                            e.jsx('div', {
                              className: 'text-2xl',
                              children: '🔍',
                            }),
                            e.jsxs('div', {
                              children: [
                                e.jsxs('h4', {
                                  className:
                                    'text-lg font-semibold text-blue-900',
                                  children: ['Drill-Down: ', r.title],
                                }),
                                e.jsx('p', {
                                  className: 'text-sm text-blue-700',
                                  children: r.description,
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsx('button', {
                          onClick: () => g(null),
                          className:
                            'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors',
                          children: 'Close',
                        }),
                      ],
                    }),
                    e.jsxs('div', {
                      className: 'grid gap-6 md:grid-cols-2',
                      children: [
                        e.jsxs('div', {
                          className:
                            'bg-white p-4 rounded-lg border border-blue-200',
                          children: [
                            e.jsx('h5', {
                              className: 'font-medium text-blue-800 mb-3',
                              children: 'Students Requiring Attention',
                            }),
                            e.jsx('div', {
                              className: 'space-y-3 max-h-64 overflow-y-auto',
                              children: r.contributingStudents?.map((s, a) =>
                                e.jsxs(
                                  'div',
                                  {
                                    className:
                                      'flex items-center justify-between p-3 bg-blue-50 rounded-lg',
                                    children: [
                                      e.jsxs('div', {
                                        className: 'flex items-center gap-3',
                                        children: [
                                          e.jsx('div', {
                                            className:
                                              'w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium',
                                            children: a + 1,
                                          }),
                                          e.jsx('span', {
                                            className:
                                              'text-blue-800 font-medium',
                                            children: s.name,
                                          }),
                                        ],
                                      }),
                                      e.jsxs('div', {
                                        className:
                                          'text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded',
                                        children: [
                                          'Student ID: ',
                                          s.id.slice(-4),
                                        ],
                                      }),
                                    ],
                                  },
                                  s.id
                                )
                              ),
                            }),
                          ],
                        }),
                        e.jsxs('div', {
                          className:
                            'bg-white p-4 rounded-lg border border-blue-200',
                          children: [
                            e.jsx('h5', {
                              className: 'font-medium text-blue-800 mb-3',
                              children: 'Recommended Actions',
                            }),
                            e.jsxs('div', {
                              className: 'space-y-4',
                              children: [
                                e.jsxs('div', {
                                  className: 'p-3 bg-blue-50 rounded-lg',
                                  children: [
                                    e.jsx('h6', {
                                      className:
                                        'font-medium text-blue-800 mb-2',
                                      children: 'Immediate Action Required',
                                    }),
                                    e.jsx('p', {
                                      className: 'text-sm text-blue-700',
                                      children: r.actionRequired,
                                    }),
                                  ],
                                }),
                                e.jsxs('div', {
                                  className: 'p-3 bg-blue-50 rounded-lg',
                                  children: [
                                    e.jsx('h6', {
                                      className:
                                        'font-medium text-blue-800 mb-2',
                                      children: 'Stakeholders to Notify',
                                    }),
                                    e.jsx('div', {
                                      className: 'flex flex-wrap gap-2',
                                      children: r.stakeholders?.map((s, a) =>
                                        e.jsx(
                                          'span',
                                          {
                                            className:
                                              'px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full',
                                            children: s,
                                          },
                                          a
                                        )
                                      ),
                                    }),
                                  ],
                                }),
                                e.jsxs('div', {
                                  className: 'p-3 bg-blue-50 rounded-lg',
                                  children: [
                                    e.jsx('h6', {
                                      className:
                                        'font-medium text-blue-800 mb-2',
                                      children: 'Severity Level',
                                    }),
                                    e.jsxs('div', {
                                      className: 'flex items-center gap-2',
                                      children: [
                                        e.jsxs('span', {
                                          className: `px-3 py-1 rounded-full text-xs font-medium ${r.severity === 'High' ? 'bg-red-100 text-red-800' : r.severity === 'Medium' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'}`,
                                          children: [r.severity, ' Priority'],
                                        }),
                                        e.jsxs('span', {
                                          className: 'text-sm text-blue-600',
                                          children: [
                                            '(',
                                            r.frequency,
                                            ' students affected)',
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          });
        default:
          return null;
      }
    };
  return e.jsxs('div', {
    className: 'rounded-xl bg-white p-6 shadow space-y-6',
    children: [
      e.jsx('h2', {
        className: 'text-2xl font-light text-navy mb-2',
        children: 'Reports & Analytics',
      }),
      e.jsx('div', {
        className: 'mb-6',
        children: e.jsx('div', {
          className: 'bg-gray-50 rounded-lg p-1',
          children: e.jsx('nav', {
            className: 'flex space-x-1',
            children: N.map((s) =>
              e.jsx(
                'button',
                {
                  onClick: () => h(s.id),
                  className: `flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${d === s.id ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`,
                  children: e.jsxs('div', {
                    className: 'text-center',
                    children: [
                      e.jsx('div', {
                        className: 'text-lg mb-1',
                        children: s.icon,
                      }),
                      e.jsx('div', {
                        className: 'font-semibold',
                        children: s.label,
                      }),
                    ],
                  }),
                },
                s.id
              )
            ),
          }),
        }),
      }),
      w(),
    ],
  });
}
function q({ pattern: t, onClick: n, isSelected: x }) {
  const i = ((l) => {
    switch (l) {
      case 'high':
        return {
          bg: 'from-red-500 to-red-600',
          border: 'border-red-300',
          text: 'text-red-900',
          bgLight: 'bg-red-50',
          badge: 'bg-red-100 text-red-800',
        };
      case 'medium':
        return {
          bg: 'from-orange-500 to-orange-600',
          border: 'border-orange-300',
          text: 'text-orange-900',
          bgLight: 'bg-orange-50',
          badge: 'bg-orange-100 text-orange-800',
        };
      default:
        return {
          bg: 'from-yellow-500 to-yellow-600',
          border: 'border-yellow-300',
          text: 'text-yellow-900',
          bgLight: 'bg-yellow-50',
          badge: 'bg-yellow-100 text-yellow-800',
        };
    }
  })(t.severity);
  return e.jsxs('div', {
    className: `border-2 ${i.border} rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105 ${x ? 'ring-2 ring-blue-500 ring-opacity-50 scale-105' : ''}`,
    onClick: n,
    onKeyDown: (l) => {
      (l.key === 'Enter' || l.key === ' ') && (l.preventDefault(), n());
    },
    tabIndex: 0,
    role: 'button',
    'aria-label': `Drill down into ${t.pattern} pattern`,
    children: [
      e.jsx('div', {
        className: `bg-gradient-to-r ${i.bg} px-4 py-3`,
        children: e.jsxs('div', {
          className: 'flex items-center justify-between',
          children: [
            e.jsxs('div', {
              className: 'flex items-center gap-3',
              children: [
                e.jsx('span', { className: 'text-xl', children: '⚠️' }),
                e.jsxs('div', {
                  children: [
                    e.jsx('h5', {
                      className: 'font-bold text-white text-sm',
                      children: t.pattern,
                    }),
                    e.jsx('p', {
                      className: 'text-white text-xs opacity-90',
                      children: t.description,
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs('div', {
              className: `px-3 py-1 rounded-full text-xs font-bold ${i.badge}`,
              children: [t.severity.toUpperCase(), ' PRIORITY'],
            }),
          ],
        }),
      }),
      e.jsxs('div', {
        className: `${i.bgLight} p-4`,
        children: [
          e.jsxs('div', {
            className: 'grid gap-3 md:grid-cols-2',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('h6', {
                    className: `font-semibold ${i.text} mb-2`,
                    children: 'Required Action',
                  }),
                  e.jsx('p', {
                    className: `text-sm ${i.text} opacity-80`,
                    children: t.actionRequired,
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('h6', {
                    className: `font-semibold ${i.text} mb-2`,
                    children: 'Stakeholders',
                  }),
                  e.jsx('div', {
                    className: 'flex flex-wrap gap-1',
                    children: t.stakeholders?.map((l, d) =>
                      e.jsx(
                        'span',
                        {
                          className: `px-2 py-1 rounded text-xs font-medium ${i.badge}`,
                          children: l,
                        },
                        d
                      )
                    ),
                  }),
                ],
              }),
            ],
          }),
          e.jsx('div', {
            className: 'mt-3 pt-3 border-t border-gray-200',
            children: e.jsxs('div', {
              className: 'flex items-center justify-between text-sm',
              children: [
                e.jsxs('span', {
                  className: `${i.text} font-medium`,
                  children: [t.frequency, ' affected students'],
                }),
                e.jsx('span', {
                  className: `${i.text} opacity-70`,
                  children: 'Immediate attention required',
                }),
              ],
            }),
          }),
          e.jsx('div', {
            className: 'bg-gray-50 px-4 py-2 border-t border-gray-200',
            children: e.jsxs('div', {
              className:
                'flex items-center justify-between text-xs text-gray-600',
              children: [
                e.jsx('span', {
                  children: '🔍 Click to drill down into student details',
                }),
                e.jsx('span', { children: '→' }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
export { T as default };
