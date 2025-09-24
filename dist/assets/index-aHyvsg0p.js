import { r as d, R as p, j as e } from './ui-vendor-D6t9Fqz9.js';
import { u as v } from './index-DxxIEH0w.js';
import { a as f } from './api-8CS6GFDC.js';
import './react-vendor-DTDVRx5A.js';
import './data-vendor-CMp-lYVg.js';
import './utils-vendor-BoBknyFz.js';
function E() {
  const { selectedClassId: l, students: a } = v(),
    [n, u] = d.useState(''),
    [r, i] = d.useState(null),
    [x, m] = d.useState(!1),
    [c, h] = d.useState(null);
  p.useEffect(() => {
    console.log('Reports component mounted successfully');
  }, []);
  const g = p.useMemo(() => {
    if (!Array.isArray(a))
      return (console.log('Students is not an array:', a), []);
    if (!l) return (console.log('No selectedClassId:', l), []);
    const t = a.filter((s) => s?.classId === l || s?.schoolId === l);
    return (console.log('Filtered students:', t.length, 'out of', a.length), t);
  }, [a, l]);
  d.useEffect(() => {
    n ? b(n) : i(null);
  }, [n]);
  const b = async (t) => {
      try {
        (m(!0), h(null), console.log('Fetching report for student:', t));
        const s = await f(t);
        (console.log('Report data received:', s), i(s));
      } catch (s) {
        (console.error('Error fetching report:', s),
          h(s.message || 'Failed to load report'),
          i(null));
      } finally {
        m(!1);
      }
    },
    N = () => {
      window.print();
    },
    j = (t) => {
      u(t.target.value);
    },
    o = l ? g : a || [];
  return (
    console.log('Display students:', o.length, 'selectedClassId:', l),
    !l && (!a || a.length === 0)
      ? e.jsxs('div', {
          className: 'p-4 text-center text-slate-600',
          children: [
            e.jsx('div', {
              className: 'text-lg font-medium mb-2',
              children: 'No Class Selected',
            }),
            e.jsx('div', {
              className: 'text-sm',
              children: 'Please select a class to view student reports.',
            }),
          ],
        })
      : o.length === 0
        ? e.jsxs('div', {
            className: 'p-4 text-center text-slate-600',
            children: [
              e.jsx('div', {
                className: 'text-lg font-medium mb-2',
                children: l ? 'No Students Found' : 'No Students Available',
              }),
              e.jsx('div', {
                className: 'text-sm',
                children: l
                  ? "This class doesn't have any students yet."
                  : 'Please select a class or add students to get started.',
              }),
            ],
          })
        : e.jsxs('div', {
            className: 'p-4 space-y-6',
            children: [
              e.jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                  e.jsx('h1', {
                    className: 'text-2xl font-semibold text-navy',
                    children: 'Student Reports',
                  }),
                  r &&
                    e.jsx('button', {
                      onClick: N,
                      className:
                        'px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors print:hidden',
                      children: '🖨️ Print Report',
                    }),
                ],
              }),
              e.jsxs('div', {
                className: 'bg-white rounded-xl border border-slate-200 p-6',
                children: [
                  e.jsx('label', {
                    htmlFor: 'student-select',
                    className: 'block text-sm font-medium text-slate-700 mb-2',
                    children: 'Select Student',
                  }),
                  e.jsxs('select', {
                    id: 'student-select',
                    value: n,
                    onChange: j,
                    className:
                      'w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    children: [
                      e.jsx('option', {
                        value: '',
                        children:
                          o.length === 0
                            ? 'No students available'
                            : 'Choose a student...',
                      }),
                      o.map((t) =>
                        e.jsx(
                          'option',
                          {
                            value: t?.id || '',
                            children: t?.name || 'Unknown Student',
                          },
                          t?.id || Math.random()
                        )
                      ),
                    ],
                  }),
                ],
              }),
              x &&
                e.jsx('div', {
                  className: 'text-center py-8',
                  children: e.jsx('div', {
                    className: 'text-slate-600',
                    children: 'Generating report...',
                  }),
                }),
              c &&
                e.jsxs('div', {
                  className: 'bg-red-50 border border-red-200 rounded-lg p-4',
                  children: [
                    e.jsx('div', {
                      className: 'text-red-800 font-medium',
                      children: 'Error',
                    }),
                    e.jsx('div', {
                      className: 'text-red-600 text-sm',
                      children: c,
                    }),
                  ],
                }),
              r &&
                e.jsxs('div', {
                  className:
                    'bg-white rounded-xl border border-slate-200 p-6 print:border-0 print:shadow-none',
                  children: [
                    e.jsxs('div', {
                      className: 'text-center mb-8 print:mb-6',
                      children: [
                        e.jsx('h2', {
                          className:
                            'text-3xl font-bold text-navy mb-2 print:text-2xl',
                          children: 'Student Progress Report',
                        }),
                        e.jsx('div', {
                          className: 'text-lg text-slate-600 mb-1',
                          children: r.studentName || 'Student Name',
                        }),
                        e.jsx('div', {
                          className: 'text-sm text-slate-500',
                          children: r.reportPeriod || 'Current Period',
                        }),
                        e.jsxs('div', {
                          className: 'text-xs text-slate-400 mt-2',
                          children: [
                            'Generated: ',
                            r.generatedAt
                              ? new Date(r.generatedAt).toLocaleDateString()
                              : new Date().toLocaleDateString(),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs('div', {
                      className: 'mb-8 print:mb-6',
                      children: [
                        e.jsx('h3', {
                          className:
                            'text-xl font-semibold text-navy mb-4 print:text-lg',
                          children: '📊 Data Story',
                        }),
                        e.jsx('div', {
                          className:
                            'bg-blue-50 border border-blue-200 rounded-lg p-4 print:bg-white print:border-0',
                          children: e.jsx('p', {
                            className:
                              'text-slate-700 leading-relaxed text-justify',
                            children:
                              r.dataStory ||
                              'No data story available for this student.',
                          }),
                        }),
                      ],
                    }),
                    e.jsxs('div', {
                      className: 'mb-8 print:mb-6',
                      children: [
                        e.jsx('h3', {
                          className:
                            'text-xl font-semibold text-navy mb-4 print:text-lg',
                          children: "⭐ Student's Superpowers",
                        }),
                        e.jsx('div', {
                          className: 'grid grid-cols-1 md:grid-cols-2 gap-3',
                          children:
                            (r.superpowers || []).length > 0
                              ? r.superpowers.map((t, s) =>
                                  e.jsx(
                                    'div',
                                    {
                                      className:
                                        'bg-green-50 border border-green-200 rounded-lg p-3 print:bg-white print:border-0',
                                      children: e.jsxs('div', {
                                        className: 'flex items-center',
                                        children: [
                                          e.jsx('span', {
                                            className: 'text-green-600 mr-2',
                                            children: '✨',
                                          }),
                                          e.jsx('span', {
                                            className:
                                              'text-slate-700 font-medium',
                                            children: t || 'Unknown superpower',
                                          }),
                                        ],
                                      }),
                                    },
                                    s
                                  )
                                )
                              : e.jsx('div', {
                                  className:
                                    'bg-gray-50 border border-gray-200 rounded-lg p-3 print:bg-white print:border-0',
                                  children: e.jsxs('div', {
                                    className: 'flex items-center',
                                    children: [
                                      e.jsx('span', {
                                        className: 'text-gray-600 mr-2',
                                        children: '📝',
                                      }),
                                      e.jsx('span', {
                                        className: 'text-slate-700 font-medium',
                                        children:
                                          'No superpowers identified yet',
                                      }),
                                    ],
                                  }),
                                }),
                        }),
                      ],
                    }),
                    e.jsxs('div', {
                      className: 'mb-8 print:mb-6',
                      children: [
                        e.jsx('h3', {
                          className:
                            'text-xl font-semibold text-navy mb-4 print:text-lg',
                          children: '🎉 Growth Celebrations',
                        }),
                        e.jsx('div', {
                          className: 'space-y-3',
                          children:
                            (r.growthCelebrations || []).length > 0
                              ? r.growthCelebrations.map((t, s) =>
                                  e.jsx(
                                    'div',
                                    {
                                      className:
                                        'bg-yellow-50 border border-yellow-200 rounded-lg p-3 print:bg-white print:border-0',
                                      children: e.jsxs('div', {
                                        className: 'flex items-start',
                                        children: [
                                          e.jsx('span', {
                                            className:
                                              'text-yellow-600 mr-2 mt-0.5',
                                            children: '🎯',
                                          }),
                                          e.jsx('span', {
                                            className: 'text-slate-700',
                                            children:
                                              t || 'Growth milestone achieved',
                                          }),
                                        ],
                                      }),
                                    },
                                    s
                                  )
                                )
                              : e.jsx('div', {
                                  className:
                                    'bg-gray-50 border border-gray-200 rounded-lg p-3 print:bg-white print:border-0',
                                  children: e.jsxs('div', {
                                    className: 'flex items-start',
                                    children: [
                                      e.jsx('span', {
                                        className: 'text-gray-600 mr-2 mt-0.5',
                                        children: '📈',
                                      }),
                                      e.jsx('span', {
                                        className: 'text-slate-700',
                                        children:
                                          'No growth celebrations recorded yet',
                                      }),
                                    ],
                                  }),
                                }),
                        }),
                      ],
                    }),
                    e.jsx('div', {
                      className: 'border-t border-slate-200 pt-6 print:pt-4',
                      children: e.jsxs('div', {
                        className: 'text-center text-sm text-slate-500',
                        children: [
                          e.jsx('p', {
                            children:
                              "This report was generated using ClassTrack's AI-powered insights",
                          }),
                          e.jsx('p', {
                            className: 'mt-1',
                            children:
                              "For questions or concerns, please contact your child's teacher",
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              !n &&
                !x &&
                !c &&
                e.jsxs('div', {
                  className: 'text-center py-12',
                  children: [
                    e.jsx('div', {
                      className: 'text-6xl mb-4',
                      children: '📊',
                    }),
                    e.jsx('div', {
                      className: 'text-xl font-medium text-slate-700 mb-2',
                      children: 'Ready to Generate Reports',
                    }),
                    e.jsx('div', {
                      className: 'text-slate-500',
                      children:
                        'Select a student from the dropdown above to generate their personalized progress report.',
                    }),
                  ],
                }),
            ],
          })
  );
}
export { E as default };
