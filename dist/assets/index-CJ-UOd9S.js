import { r as n, j as e } from './ui-vendor-D6t9Fqz9.js';
import { u as f } from './index-DxxIEH0w.js';
import './react-vendor-DTDVRx5A.js';
import './data-vendor-CMp-lYVg.js';
function u(t) {
  return (
    {
      calm: 'bg-green-100 border-green-300 text-green-800',
      focused: 'bg-blue-100 border-blue-300 text-blue-800',
      agitated: 'bg-red-100 border-red-300 text-red-800',
      withdrawn: 'bg-amber-100 border-amber-300 text-amber-800',
      energetic: 'bg-purple-100 border-purple-300 text-purple-800',
    }[t] || 'bg-gray-100 border-gray-300 text-gray-800'
  );
}
function j({ seat: t, onClick: s }) {
  const a = u(t.behaviourIndicator);
  return e.jsxs('div', {
    className: `relative border-2 rounded-lg p-3 cursor-pointer hover:shadow-lg transition-all duration-200 ${a}`,
    onClick: () => s && s(t),
    onKeyDown: (i) => {
      (i.key === 'Enter' || i.key === ' ') && (i.preventDefault(), s && s(t));
    },
    role: 'button',
    tabIndex: 0,
    style: {
      gridRowStart: t.position.row,
      gridColumnStart: t.position.col,
      minHeight: '80px',
    },
    children: [
      e.jsx('div', {
        className: 'bg-amber-200 rounded border border-amber-300 mb-2',
        style: { height: '8px' },
      }),
      e.jsxs('div', {
        className: 'text-center',
        children: [
          e.jsx('div', {
            className: 'text-xs font-medium truncate',
            children: t.studentName,
          }),
          e.jsx('div', {
            className: 'text-xs opacity-75 capitalize',
            children: t.behaviourIndicator,
          }),
        ],
      }),
      e.jsx('div', {
        className:
          'absolute top-1 right-1 w-3 h-3 rounded-full border border-white shadow-sm',
        style: { backgroundColor: y(t.behaviourIndicator) },
      }),
    ],
  });
}
function y(t) {
  return (
    {
      calm: '#10B981',
      focused: '#3B82F6',
      agitated: '#EF4444',
      withdrawn: '#F59E0B',
      energetic: '#8B5CF6',
    }[t] || '#6B7280'
  );
}
function N({ seat: t, onClose: s }) {
  return t
    ? e.jsx('div', {
        className:
          'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
        onClick: s,
        onKeyDown: (a) => {
          a.key === 'Escape' && s();
        },
        role: 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': 'student-detail-title',
        tabIndex: -1,
        children: e.jsxs('div', {
          className: 'bg-white rounded-lg p-6 max-w-sm w-full mx-4',
          onClick: (a) => a.stopPropagation(),
          onKeyDown: (a) => a.stopPropagation(),
          children: [
            e.jsxs('div', {
              className: 'flex justify-between items-start mb-4',
              children: [
                e.jsx('h3', {
                  id: 'student-detail-title',
                  className: 'text-lg font-semibold text-gray-900',
                  children: t.studentName,
                }),
                e.jsx('button', {
                  onClick: s,
                  onKeyDown: (a) => {
                    (a.key === 'Enter' || a.key === ' ') &&
                      (a.preventDefault(), s());
                  },
                  className:
                    'text-gray-400 hover:text-gray-600 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 rounded',
                  'aria-label': 'Close student details',
                  children: '×',
                }),
              ],
            }),
            e.jsxs('div', {
              className: 'space-y-3',
              children: [
                e.jsxs('div', {
                  className: 'flex items-center gap-2',
                  children: [
                    e.jsx('span', {
                      className: 'text-sm text-gray-600',
                      children: 'Position:',
                    }),
                    e.jsxs('span', {
                      className: 'text-sm font-medium',
                      children: [
                        'Row ',
                        t.position.row,
                        ', Col ',
                        t.position.col,
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'flex items-center gap-2',
                  children: [
                    e.jsx('span', {
                      className: 'text-sm text-gray-600',
                      children: 'Current State:',
                    }),
                    e.jsx('span', {
                      className: `text-sm font-medium px-2 py-1 rounded capitalize ${u(t.behaviourIndicator)}`,
                      children: t.behaviourIndicator,
                    }),
                  ],
                }),
                e.jsx('div', {
                  className: 'mt-4 p-3 bg-gray-50 rounded-lg',
                  children: e.jsxs('p', {
                    className: 'text-xs text-gray-600',
                    children: ['Student ID: ', t.studentId],
                  }),
                }),
              ],
            }),
          ],
        }),
      })
    : null;
}
function D() {
  const { selectedClassId: t } = f(),
    [s, a] = n.useState(null),
    [i, o] = n.useState(!1),
    [c, x] = n.useState(null),
    [b, m] = n.useState(null),
    d = n.useCallback(async () => {
      if (!t) {
        a(null);
        return;
      }
      try {
        (o(!0), x(null));
        const r = await fetch(`/api/seat-map/${t}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!r.ok)
          throw new Error(
            `Failed to fetch seat map: ${r.status} ${r.statusText}`
          );
        const v = await r.json();
        a(v);
      } catch (r) {
        (console.error('Seat map fetch failed:', r),
          x(r.message || 'Failed to load seat map data'));
      } finally {
        o(!1);
      }
    }, [t]);
  n.useEffect(() => {
    d();
  }, [d]);
  const p = (r) => {
      m(r);
    },
    g = () => {
      m(null);
    };
  if (!t)
    return e.jsx('div', {
      className:
        'min-h-[60vh] rounded-xl p-8 bg-white border-2 border-dashed border-gray-300 flex items-center justify-center',
      'data-ct': 'seat-map',
      children: e.jsxs('div', {
        className: 'text-center',
        children: [
          e.jsx('div', { className: 'text-6xl mb-4', children: '🪑' }),
          e.jsx('h3', {
            className: 'text-xl font-semibold text-gray-900 mb-2',
            children: 'Select a Class',
          }),
          e.jsx('p', {
            className: 'text-gray-600 mb-4',
            children: 'Choose a class to view the seating arrangement.',
          }),
          e.jsxs('div', {
            className: 'text-sm text-gray-500 bg-gray-100 p-4 rounded',
            children: [
              e.jsx('p', { children: 'Debug Info:' }),
              e.jsxs('p', { children: ['selectedClassId: ', t || 'null'] }),
            ],
          }),
        ],
      }),
    });
  if (i)
    return e.jsx('div', {
      className:
        'min-h-[60vh] rounded-xl p-8 bg-gradient-to-b from-blue-300 via-sky-50 to-cyan-300 relative overflow-hidden flex items-center justify-center',
      'data-ct': 'seat-map',
      children: e.jsxs('div', {
        className: 'text-center',
        children: [
          e.jsx('div', {
            className: 'text-6xl mb-4 animate-pulse',
            children: '🪑',
          }),
          e.jsx('h3', {
            className: 'text-xl font-semibold text-navy mb-2',
            children: 'Arranging Seats...',
          }),
          e.jsx('p', {
            className: 'text-navy/70',
            children: 'Setting up the classroom layout',
          }),
        ],
      }),
    });
  if (c)
    return e.jsx('div', {
      className:
        'min-h-[60vh] rounded-xl p-8 bg-gradient-to-b from-blue-300 via-sky-50 to-cyan-300 relative overflow-hidden flex items-center justify-center',
      'data-ct': 'seat-map',
      children: e.jsxs('div', {
        className: 'text-center',
        children: [
          e.jsx('div', { className: 'text-6xl mb-4', children: '🥀' }),
          e.jsx('h3', {
            className: 'text-xl font-semibold text-navy mb-2',
            children: 'Seating Chart Unavailable',
          }),
          e.jsx('p', { className: 'text-navy/70 mb-4', children: c }),
          e.jsx('button', {
            onClick: d,
            className:
              'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors',
            children: 'Try Again',
          }),
        ],
      }),
    });
  if (!s || !s.seats || s.seats.length === 0)
    return e.jsx('div', {
      className:
        'min-h-[60vh] rounded-xl p-8 bg-gradient-to-b from-blue-300 via-sky-50 to-cyan-300 relative overflow-hidden flex items-center justify-center',
      'data-ct': 'seat-map',
      children: e.jsxs('div', {
        className: 'text-center',
        children: [
          e.jsx('div', { className: 'text-6xl mb-4', children: '🪑' }),
          e.jsx('h3', {
            className: 'text-xl font-semibold text-navy mb-2',
            children: 'No Students Seated',
          }),
          e.jsx('p', {
            className: 'text-navy/70',
            children: "This class doesn't have any assigned seats yet.",
          }),
        ],
      }),
    });
  const { layout: l, seats: h } = s;
  return e.jsxs('div', {
    className:
      'min-h-[60vh] rounded-xl p-8 bg-gradient-to-b from-blue-300 via-sky-50 to-cyan-300 relative overflow-hidden',
    'data-ct': 'seat-map',
    children: [
      e.jsxs('div', {
        className: 'text-center mb-6',
        children: [
          e.jsxs('div', {
            className: 'flex items-center justify-between mb-4',
            children: [
              e.jsx('div', {}),
              e.jsx('h2', {
                className: 'text-2xl font-semibold text-navy',
                children: '🪑 Classroom Seating Chart',
              }),
              e.jsxs('div', {
                className: 'text-sm text-navy/70',
                children: [
                  h.length,
                  ' students • ',
                  l.rows,
                  '×',
                  l.cols,
                  ' layout',
                ],
              }),
            ],
          }),
          e.jsx('p', {
            className: 'text-navy/70',
            children:
              'Click on any seat to view student details and behavior indicators.',
          }),
        ],
      }),
      e.jsx('div', {
        className: 'flex justify-center mb-6',
        children: e.jsxs('div', {
          className:
            'bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/50',
          children: [
            e.jsx('div', {
              className: 'text-sm font-medium text-navy mb-2',
              children: 'Behavior Indicators:',
            }),
            e.jsxs('div', {
              className: 'flex flex-wrap gap-3 text-xs',
              children: [
                e.jsxs('div', {
                  className: 'flex items-center gap-1',
                  children: [
                    e.jsx('div', {
                      className: 'w-3 h-3 rounded-full bg-green-500',
                    }),
                    e.jsx('span', { children: 'Calm' }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'flex items-center gap-1',
                  children: [
                    e.jsx('div', {
                      className: 'w-3 h-3 rounded-full bg-blue-500',
                    }),
                    e.jsx('span', { children: 'Focused' }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'flex items-center gap-1',
                  children: [
                    e.jsx('div', {
                      className: 'w-3 h-3 rounded-full bg-red-500',
                    }),
                    e.jsx('span', { children: 'Agitated' }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'flex items-center gap-1',
                  children: [
                    e.jsx('div', {
                      className: 'w-3 h-3 rounded-full bg-amber-500',
                    }),
                    e.jsx('span', { children: 'Withdrawn' }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'flex items-center gap-1',
                  children: [
                    e.jsx('div', {
                      className: 'w-3 h-3 rounded-full bg-purple-500',
                    }),
                    e.jsx('span', { children: 'Energetic' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      e.jsx('div', {
        className: 'max-w-4xl mx-auto',
        style: {
          display: 'grid',
          gridTemplateRows: `repeat(${l.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${l.cols}, 1fr)`,
          gap: '12px',
          aspectRatio: `${l.cols} / ${l.rows}`,
        },
        children: h.map((r) =>
          e.jsx(
            j,
            { seat: r, onClick: p },
            `${r.position.row}-${r.position.col}`
          )
        ),
      }),
      e.jsx(N, { seat: b, onClose: g }),
    ],
  });
}
export { D as default };
