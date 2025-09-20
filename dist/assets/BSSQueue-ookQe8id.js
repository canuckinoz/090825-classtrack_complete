import { r as c, j as e } from './ui-vendor-D6t9Fqz9.js';
import { s as R, L as d } from './index-DxxIEH0w.js';
import { R as u, U as p, a as _, b as B } from './referral-CxgCGxa_.js';
import './react-vendor-DTDVRx5A.js';
import './data-vendor-CMp-lYVg.js';
function q() {
  const [n, h] = c.useState([]),
    [g, x] = c.useState(!0),
    [r, i] = c.useState({
      status: ['escalated_bss_review', 'accepted_bss'],
      urgency: [],
      searchTerm: '',
    });
  c.useEffect(() => {
    j();
  }, [r]);
  const j = async () => {
      try {
        x(!0);
        const s = new URLSearchParams({
            roleScope: 'bss',
            status: r.status.join(','),
            ...(r.urgency.length > 0 && { urgency: r.urgency.join(',') }),
            ...(r.searchTerm && { searchTerm: r.searchTerm }),
            pageSize: '50',
          }),
          t = await fetch(`/api/referrals?${s}`);
        if (!t.ok) throw new Error('Failed to load referrals');
        const a = await t.json();
        h(a.referrals);
      } catch (s) {
        (console.error('Error loading referrals:', s),
          R('Failed to load referrals', 'error'));
      } finally {
        x(!1);
      }
    },
    y = (s, t) => {
      i((a) => ({
        ...a,
        status: t ? [...a.status, s] : a.status.filter((l) => l !== s),
      }));
    },
    N = (s, t) => {
      i((a) => ({
        ...a,
        urgency: t ? [...a.urgency, s] : a.urgency.filter((l) => l !== s),
      }));
    },
    b = () => {
      const s = {};
      return (
        n.forEach((t) => {
          s[t.status] = (s[t.status] || 0) + 1;
        }),
        s
      );
    },
    f = () => {
      const s = {};
      return (
        n.forEach((t) => {
          s[t.urgency] = (s[t.urgency] || 0) + 1;
        }),
        s
      );
    },
    v = (s) => {
      const t = new Date(s),
        l = Math.floor((new Date() - t) / (1e3 * 60 * 60));
      if (l < 1) return 'Just now';
      if (l < 24) return `${l}h ago`;
      const m = Math.floor(l / 24);
      return m < 7 ? `${m}d ago` : t.toLocaleDateString();
    },
    o = (s) => {
      const t = s.statusHistory?.find((a) => a.to === 'escalated_bss_review');
      return t?.reason || t?.note;
    },
    w = b(),
    S = f();
  return g
    ? e.jsx('div', {
        className: 'min-h-screen bg-gray-50 flex items-center justify-center',
        children: e.jsxs('div', {
          className: 'text-center',
          children: [
            e.jsx('div', {
              className:
                'animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4',
            }),
            e.jsx('p', {
              className: 'text-gray-600',
              children: 'Loading BSS queue...',
            }),
          ],
        }),
      })
    : e.jsxs('div', {
        className: 'min-h-screen bg-gray-50',
        children: [
          e.jsx('div', {
            className: 'bg-white border-b border-gray-200',
            children: e.jsx('div', {
              className: 'max-w-7xl mx-auto px-6 py-6',
              children: e.jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                  e.jsxs('div', {
                    children: [
                      e.jsx('h1', {
                        className: 'text-2xl font-bold text-gray-900',
                        children: 'BSS Queue',
                      }),
                      e.jsx('p', {
                        className: 'text-gray-600 mt-1',
                        children:
                          'Behaviour Support Specialist referrals requiring specialist review',
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'flex items-center space-x-4',
                    children: [
                      e.jsxs('div', {
                        className: 'text-sm text-gray-500',
                        children: [n.length, ' referrals'],
                      }),
                      e.jsx(d, {
                        to: '/referrals/analytics',
                        className:
                          'px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700',
                        children: '📊 Analytics',
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          e.jsx('div', {
            className: 'max-w-7xl mx-auto px-6 py-6',
            children: e.jsxs('div', {
              className: 'flex gap-6',
              children: [
                e.jsx('div', {
                  className: 'w-64 flex-shrink-0',
                  children: e.jsxs('div', {
                    className: 'bg-white rounded-lg shadow-sm p-6 sticky top-6',
                    children: [
                      e.jsxs('div', {
                        className: 'mb-6',
                        children: [
                          e.jsx('label', {
                            className:
                              'block text-sm font-medium text-gray-700 mb-2',
                            children: 'Search',
                          }),
                          e.jsx('input', {
                            type: 'text',
                            value: r.searchTerm,
                            onChange: (s) =>
                              i((t) => ({ ...t, searchTerm: s.target.value })),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500',
                            placeholder: 'Student, school, referrer...',
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'mb-6',
                        children: [
                          e.jsx('h3', {
                            className: 'text-sm font-medium text-gray-700 mb-3',
                            children: 'Status',
                          }),
                          e.jsx('div', {
                            className: 'space-y-2',
                            children: [
                              'escalated_bss_review',
                              'accepted_bss',
                            ].map((s) =>
                              e.jsxs(
                                'label',
                                {
                                  className: 'flex items-center',
                                  children: [
                                    e.jsx('input', {
                                      type: 'checkbox',
                                      checked: r.status.includes(s),
                                      onChange: (t) => y(s, t.target.checked),
                                      className:
                                        'h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded',
                                    }),
                                    e.jsxs('span', {
                                      className:
                                        'ml-2 text-sm text-gray-700 flex items-center justify-between w-full',
                                      children: [
                                        u[s],
                                        e.jsx('span', {
                                          className:
                                            'text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded',
                                          children: w[s] || 0,
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                s
                              )
                            ),
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'mb-6',
                        children: [
                          e.jsx('h3', {
                            className: 'text-sm font-medium text-gray-700 mb-3',
                            children: 'Urgency',
                          }),
                          e.jsx('div', {
                            className: 'space-y-2',
                            children: ['critical', 'medium', 'low'].map((s) =>
                              e.jsxs(
                                'label',
                                {
                                  className: 'flex items-center',
                                  children: [
                                    e.jsx('input', {
                                      type: 'checkbox',
                                      checked: r.urgency.includes(s),
                                      onChange: (t) => N(s, t.target.checked),
                                      className:
                                        'h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded',
                                    }),
                                    e.jsxs('span', {
                                      className:
                                        'ml-2 text-sm text-gray-700 flex items-center justify-between w-full',
                                      children: [
                                        p[s],
                                        e.jsx('span', {
                                          className:
                                            'text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded',
                                          children: S[s] || 0,
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                s
                              )
                            ),
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'border-t border-gray-200 pt-4',
                        children: [
                          e.jsx('h3', {
                            className: 'text-sm font-medium text-gray-700 mb-3',
                            children: 'BSS Role',
                          }),
                          e.jsxs('div', {
                            className: 'text-sm text-gray-600 space-y-2',
                            children: [
                              e.jsx('p', {
                                children: '• Complex behaviour support',
                              }),
                              e.jsx('p', {
                                children: '• Multi-disciplinary planning',
                              }),
                              e.jsx('p', {
                                children: '• Risk assessment & safety',
                              }),
                              e.jsx('p', {
                                children: '• Specialist interventions',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                e.jsx('div', {
                  className: 'flex-1',
                  children:
                    n.length === 0
                      ? e.jsxs('div', {
                          className:
                            'bg-white rounded-lg shadow-sm p-12 text-center',
                          children: [
                            e.jsx('div', {
                              className: 'text-gray-400 text-6xl mb-4',
                              children: '🎯',
                            }),
                            e.jsx('h3', {
                              className:
                                'text-lg font-medium text-gray-900 mb-2',
                              children: 'No BSS referrals',
                            }),
                            e.jsx('p', {
                              className: 'text-gray-600',
                              children:
                                r.searchTerm || r.urgency.length > 0
                                  ? 'Try adjusting your filters to see more results'
                                  : 'No referrals have been escalated to BSS level at this time',
                            }),
                          ],
                        })
                      : e.jsx('div', {
                          className: 'space-y-4',
                          children: n.map((s) =>
                            e.jsx(
                              'div',
                              {
                                className:
                                  'bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow',
                                children: e.jsxs('div', {
                                  className: 'p-6',
                                  children: [
                                    e.jsxs('div', {
                                      className:
                                        'flex items-start justify-between',
                                      children: [
                                        e.jsxs('div', {
                                          className: 'flex-1',
                                          children: [
                                            e.jsxs('div', {
                                              className:
                                                'flex items-center space-x-3 mb-2',
                                              children: [
                                                e.jsx(d, {
                                                  to: `/referrals/${s.id}`,
                                                  className:
                                                    'text-lg font-semibold text-purple-600 hover:text-purple-700',
                                                  children: s.studentName,
                                                }),
                                                e.jsx('span', {
                                                  className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${_[s.urgency]}`,
                                                  children: p[s.urgency],
                                                }),
                                                e.jsx('span', {
                                                  className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${B[s.status]}`,
                                                  children: u[s.status],
                                                }),
                                                s.status ===
                                                  'escalated_bss_review' &&
                                                  e.jsx('span', {
                                                    className:
                                                      'inline-flex px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full',
                                                    children: '🔺 Escalated',
                                                  }),
                                              ],
                                            }),
                                            e.jsxs('div', {
                                              className:
                                                'text-sm text-gray-600 mb-2',
                                              children: [
                                                e.jsx('span', {
                                                  className: 'font-medium',
                                                  children: s.yearLevel,
                                                }),
                                                ' •',
                                                e.jsx('span', {
                                                  className: 'ml-1',
                                                  children: s.schoolName,
                                                }),
                                                ' •',
                                                e.jsxs('span', {
                                                  className: 'ml-1',
                                                  children: [
                                                    'Referred by ',
                                                    s.referrerName,
                                                  ],
                                                }),
                                                s.reviewerLpbsName &&
                                                  e.jsxs('span', {
                                                    className: 'ml-1',
                                                    children: [
                                                      '• LPBS: ',
                                                      s.reviewerLpbsName,
                                                    ],
                                                  }),
                                              ],
                                            }),
                                            e.jsx('p', {
                                              className:
                                                'text-gray-700 text-sm leading-relaxed line-clamp-2 mb-3',
                                              children: s.summaryOfConcerns,
                                            }),
                                            s.status ===
                                              'escalated_bss_review' &&
                                              o(s) &&
                                              e.jsxs('div', {
                                                className:
                                                  'bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3',
                                                children: [
                                                  e.jsx('h4', {
                                                    className:
                                                      'text-sm font-medium text-orange-900 mb-1',
                                                    children:
                                                      'Escalation Reason:',
                                                  }),
                                                  e.jsx('p', {
                                                    className:
                                                      'text-sm text-orange-800',
                                                    children: o(s),
                                                  }),
                                                ],
                                              }),
                                            s.supportRequested &&
                                              s.supportRequested.length > 0 &&
                                              e.jsx('div', {
                                                className: 'mt-3',
                                                children: e.jsxs('div', {
                                                  className:
                                                    'flex flex-wrap gap-1',
                                                  children: [
                                                    s.supportRequested
                                                      .slice(0, 3)
                                                      .map((t) =>
                                                        e.jsx(
                                                          'span',
                                                          {
                                                            className:
                                                              'inline-flex px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded',
                                                            children: t,
                                                          },
                                                          t
                                                        )
                                                      ),
                                                    s.supportRequested.length >
                                                      3 &&
                                                      e.jsxs('span', {
                                                        className:
                                                          'inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded',
                                                        children: [
                                                          '+',
                                                          s.supportRequested
                                                            .length - 3,
                                                          ' more',
                                                        ],
                                                      }),
                                                  ],
                                                }),
                                              }),
                                          ],
                                        }),
                                        e.jsxs('div', {
                                          className:
                                            'flex flex-col items-end space-y-2 ml-4',
                                          children: [
                                            e.jsx('div', {
                                              className:
                                                'text-sm text-gray-500',
                                              children: v(s.createdAt),
                                            }),
                                            e.jsx(d, {
                                              to: `/referrals/${s.id}`,
                                              className:
                                                'px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700',
                                              children: 'Review',
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    s.status === 'escalated_bss_review' &&
                                      e.jsx('div', {
                                        className:
                                          'mt-4 pt-4 border-t border-gray-100',
                                        children: e.jsxs('div', {
                                          className:
                                            'flex items-center text-sm text-orange-600',
                                          children: [
                                            e.jsx('div', {
                                              className:
                                                'w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse',
                                            }),
                                            'Awaiting BSS specialist review',
                                          ],
                                        }),
                                      }),
                                    s.status === 'accepted_bss' &&
                                      e.jsx('div', {
                                        className:
                                          'mt-4 pt-4 border-t border-gray-100',
                                        children: e.jsxs('div', {
                                          className:
                                            'flex items-center text-sm text-purple-600',
                                          children: [
                                            e.jsx('div', {
                                              className:
                                                'w-2 h-2 bg-purple-400 rounded-full mr-2',
                                            }),
                                            'BSS specialist support in progress',
                                            s.reviewerBssName &&
                                              e.jsxs('span', {
                                                className: 'ml-2 text-gray-500',
                                                children: [
                                                  '• ',
                                                  s.reviewerBssName,
                                                ],
                                              }),
                                          ],
                                        }),
                                      }),
                                    e.jsx('div', {
                                      className:
                                        'mt-4 pt-4 border-t border-gray-100',
                                      children: e.jsxs('div', {
                                        className:
                                          'flex items-center space-x-4 text-sm text-gray-600',
                                        children: [
                                          s.hasBehaviourSupportPlan &&
                                            e.jsx('span', {
                                              className: 'flex items-center',
                                              children: '📋 Has BSP',
                                            }),
                                          s.hasStudentSafetyPlan &&
                                            e.jsx('span', {
                                              className: 'flex items-center',
                                              children: '🛡️ Has Safety Plan',
                                            }),
                                          s.externalAgenciesInvolved &&
                                            e.jsx('span', {
                                              className: 'flex items-center',
                                              children: '🤝 External Agencies',
                                            }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                              },
                              s.id
                            )
                          ),
                        }),
                }),
              ],
            }),
          }),
        ],
      });
}
export { q as default };
