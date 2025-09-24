import { r as c, j as e } from './ui-vendor-D6t9Fqz9.js';
import { s as L, L as o } from './index-DxxIEH0w.js';
import { R as u, U as h, a as k, b as T } from './referral-CxgCGxa_.js';
import './react-vendor-DTDVRx5A.js';
import './data-vendor-CMp-lYVg.js';
function P() {
  const [l, g] = c.useState([]),
    [p, m] = c.useState(!0),
    [a, d] = c.useState({
      status: [
        'submitted',
        'in_review_lpbs',
        'returned_for_more_info',
        'lpbs_support_underway',
      ],
      urgency: [],
      searchTerm: '',
    }),
    [i, f] = c.useState(null);
  c.useEffect(() => {
    (y(), b());
  }, [a]);
  const y = async () => {
      try {
        m(!0);
        const s = new URLSearchParams({
            roleScope: 'lpbs',
            status: a.status.join(','),
            ...(a.urgency.length > 0 && { urgency: a.urgency.join(',') }),
            ...(a.searchTerm && { searchTerm: a.searchTerm }),
            pageSize: '50',
          }),
          t = await fetch(`/api/referrals?${s}`);
        if (!t.ok) throw new Error('Failed to load referrals');
        const r = await t.json();
        g(r.referrals);
      } catch (s) {
        (console.error('Error loading referrals:', s),
          L('Failed to load referrals', 'error'));
      } finally {
        m(!1);
      }
    },
    b = async () => {
      try {
        const s = await fetch('/api/referrals/analytics');
        if (s.ok) {
          const t = await s.json();
          f(t);
        }
      } catch (s) {
        console.error('Error loading analytics:', s);
      }
    },
    j = (s, t) => {
      d((r) => ({
        ...r,
        status: t ? [...r.status, s] : r.status.filter((n) => n !== s),
      }));
    },
    N = (s, t) => {
      d((r) => ({
        ...r,
        urgency: t ? [...r.urgency, s] : r.urgency.filter((n) => n !== s),
      }));
    },
    v = () => {
      const s = {};
      return (
        l.forEach((t) => {
          s[t.status] = (s[t.status] || 0) + 1;
        }),
        s
      );
    },
    w = () => {
      const s = {};
      return (
        l.forEach((t) => {
          s[t.urgency] = (s[t.urgency] || 0) + 1;
        }),
        s
      );
    },
    S = (s) => {
      const t = new Date(s),
        n = Math.floor((new Date() - t) / (1e3 * 60 * 60));
      if (n < 1) return 'Just now';
      if (n < 24) return `${n}h ago`;
      const x = Math.floor(n / 24);
      return x < 7 ? `${x}d ago` : t.toLocaleDateString();
    },
    R = v(),
    _ = w();
  return p
    ? e.jsx('div', {
        className: 'min-h-screen bg-gray-50 flex items-center justify-center',
        children: e.jsxs('div', {
          className: 'text-center',
          children: [
            e.jsx('div', {
              className:
                'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4',
            }),
            e.jsx('p', {
              className: 'text-gray-600',
              children: 'Loading LPBS queue...',
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
                        children: 'LPBS Queue',
                      }),
                      e.jsx('p', {
                        className: 'text-gray-600 mt-1',
                        children:
                          'Learning Partner Behaviour Support referrals requiring review',
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'flex items-center space-x-4',
                    children: [
                      e.jsxs('div', {
                        className: 'text-sm text-gray-500',
                        children: [l.length, ' referrals'],
                      }),
                      e.jsx(o, {
                        to: '/referrals/analytics',
                        className:
                          'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700',
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
                            value: a.searchTerm,
                            onChange: (s) =>
                              d((t) => ({ ...t, searchTerm: s.target.value })),
                            className:
                              'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
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
                              'submitted',
                              'in_review_lpbs',
                              'returned_for_more_info',
                              'lpbs_support_underway',
                            ].map((s) =>
                              e.jsxs(
                                'label',
                                {
                                  className: 'flex items-center',
                                  children: [
                                    e.jsx('input', {
                                      type: 'checkbox',
                                      checked: a.status.includes(s),
                                      onChange: (t) => j(s, t.target.checked),
                                      className:
                                        'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
                                    }),
                                    e.jsxs('span', {
                                      className:
                                        'ml-2 text-sm text-gray-700 flex items-center justify-between w-full',
                                      children: [
                                        u[s],
                                        e.jsx('span', {
                                          className:
                                            'text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded',
                                          children: R[s] || 0,
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
                                      checked: a.urgency.includes(s),
                                      onChange: (t) => N(s, t.target.checked),
                                      className:
                                        'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
                                    }),
                                    e.jsxs('span', {
                                      className:
                                        'ml-2 text-sm text-gray-700 flex items-center justify-between w-full',
                                      children: [
                                        h[s],
                                        e.jsx('span', {
                                          className:
                                            'text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded',
                                          children: _[s] || 0,
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
                      i &&
                        e.jsxs('div', {
                          className: 'border-t border-gray-200 pt-4',
                          children: [
                            e.jsx('h3', {
                              className:
                                'text-sm font-medium text-gray-700 mb-3',
                              children: 'Quick Stats',
                            }),
                            e.jsxs('div', {
                              className: 'space-y-2 text-sm',
                              children: [
                                e.jsxs('div', {
                                  className: 'flex justify-between',
                                  children: [
                                    e.jsx('span', {
                                      className: 'text-gray-600',
                                      children: 'Avg Response:',
                                    }),
                                    e.jsxs('span', {
                                      className: 'font-medium',
                                      children: [i.timeToFirstResponse, 'd'],
                                    }),
                                  ],
                                }),
                                e.jsxs('div', {
                                  className: 'flex justify-between',
                                  children: [
                                    e.jsx('span', {
                                      className: 'text-gray-600',
                                      children: 'Escalation Rate:',
                                    }),
                                    e.jsxs('span', {
                                      className: 'font-medium',
                                      children: [
                                        Math.round(i.escalationRate * 100),
                                        '%',
                                      ],
                                    }),
                                  ],
                                }),
                                e.jsxs('div', {
                                  className: 'flex justify-between',
                                  children: [
                                    e.jsx('span', {
                                      className: 'text-gray-600',
                                      children: 'Return Rate:',
                                    }),
                                    e.jsxs('span', {
                                      className: 'font-medium',
                                      children: [
                                        Math.round(i.returnForInfoRate * 100),
                                        '%',
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
                }),
                e.jsx('div', {
                  className: 'flex-1',
                  children:
                    l.length === 0
                      ? e.jsxs('div', {
                          className:
                            'bg-white rounded-lg shadow-sm p-12 text-center',
                          children: [
                            e.jsx('div', {
                              className: 'text-gray-400 text-6xl mb-4',
                              children: '📋',
                            }),
                            e.jsx('h3', {
                              className:
                                'text-lg font-medium text-gray-900 mb-2',
                              children: 'No referrals found',
                            }),
                            e.jsx('p', {
                              className: 'text-gray-600',
                              children:
                                a.searchTerm || a.urgency.length > 0
                                  ? 'Try adjusting your filters to see more results'
                                  : 'All referrals have been processed or there are no new submissions',
                            }),
                          ],
                        })
                      : e.jsx('div', {
                          className: 'space-y-4',
                          children: l.map((s) =>
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
                                                e.jsx(o, {
                                                  to: `/referrals/${s.id}`,
                                                  className:
                                                    'text-lg font-semibold text-blue-600 hover:text-blue-700',
                                                  children: s.studentName,
                                                }),
                                                e.jsx('span', {
                                                  className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${k[s.urgency]}`,
                                                  children: h[s.urgency],
                                                }),
                                                e.jsx('span', {
                                                  className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${T[s.status]}`,
                                                  children: u[s.status],
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
                                              ],
                                            }),
                                            e.jsx('p', {
                                              className:
                                                'text-gray-700 text-sm leading-relaxed line-clamp-2',
                                              children: s.summaryOfConcerns,
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
                                                              'inline-flex px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded',
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
                                              children: S(s.createdAt),
                                            }),
                                            e.jsx(o, {
                                              to: `/referrals/${s.id}`,
                                              className:
                                                'px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700',
                                              children: 'Review',
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    s.status === 'in_review_lpbs' &&
                                      e.jsx('div', {
                                        className:
                                          'mt-4 pt-4 border-t border-gray-100',
                                        children: e.jsxs('div', {
                                          className:
                                            'flex items-center text-sm text-amber-600',
                                          children: [
                                            e.jsx('div', {
                                              className:
                                                'w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse',
                                            }),
                                            'Awaiting LPBS review • Target response: 2-3 business days',
                                          ],
                                        }),
                                      }),
                                    s.status === 'returned_for_more_info' &&
                                      e.jsx('div', {
                                        className:
                                          'mt-4 pt-4 border-t border-gray-100',
                                        children: e.jsxs('div', {
                                          className:
                                            'flex items-center text-sm text-orange-600',
                                          children: [
                                            e.jsx('div', {
                                              className:
                                                'w-2 h-2 bg-orange-400 rounded-full mr-2',
                                            }),
                                            'Waiting for additional information from referrer',
                                          ],
                                        }),
                                      }),
                                    s.status === 'lpbs_support_underway' &&
                                      e.jsx('div', {
                                        className:
                                          'mt-4 pt-4 border-t border-gray-100',
                                        children: e.jsxs('div', {
                                          className:
                                            'flex items-center text-sm text-green-600',
                                          children: [
                                            e.jsx('div', {
                                              className:
                                                'w-2 h-2 bg-green-400 rounded-full mr-2',
                                            }),
                                            'LPBS support in progress',
                                            s.reviewerLpbsName &&
                                              e.jsxs('span', {
                                                className: 'ml-2 text-gray-500',
                                                children: [
                                                  '• ',
                                                  s.reviewerLpbsName,
                                                ],
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
export { P as default };
