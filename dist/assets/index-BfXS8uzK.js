import { r as s, j as e } from './ui-vendor-D6t9Fqz9.js';
import { u as j } from './index-DxxIEH0w.js';
import { g as S, c as N } from './api-8CS6GFDC.js';
import './react-vendor-DTDVRx5A.js';
import './data-vendor-CMp-lYVg.js';
import './utils-vendor-BoBknyFz.js';
function L() {
  const { selectedClassId: g, students: r, schoolId: a, setStudents: h } = j(),
    [l, i] = s.useState(''),
    [n, d] = s.useState(''),
    [f, u] = s.useState(''),
    [x, b] = s.useState(!1),
    [p, o] = s.useState(null),
    [v, c] = s.useState(!1);
  if (
    (s.useEffect(() => {
      a &&
        (c(!0),
        S(a)
          .then((t) => {
            (h(t), c(!1));
          })
          .catch((t) => {
            (console.error('Failed to fetch students:', t),
              o('Failed to load students'),
              c(!1));
          }));
    }, [a, h]),
    s.useEffect(() => {
      (i(''), d(''), u(''), o(null));
    }, [g]),
    !g)
  )
    return e.jsx('div', {
      className:
        'flex items-center justify-center h-full p-8 bg-gray-50 rounded-lg',
      children: e.jsx('p', {
        className: 'text-gray-600 text-lg',
        children: 'Please select a class to begin logging behavior.',
      }),
    });
  if (v || !r || r.length === 0)
    return e.jsx('div', {
      className:
        'flex items-center justify-center h-full p-8 bg-gray-50 rounded-lg',
      children: e.jsx('p', {
        className: 'text-gray-600 text-lg',
        children: v ? 'Loading students...' : 'No students available',
      }),
    });
  const y = async (t) => {
    if ((t.preventDefault(), !l || !n)) {
      o('Please select a student and a behaviour type.');
      return;
    }
    (b(!0), o(null));
    try {
      const m = {
        school_id: a,
        student_id: l,
        behaviour_type: n,
        note: f.trim() || null,
      };
      (await N(m), i(''), d(''), u(''), alert('Behavior logged successfully!'));
    } catch (m) {
      o('Failed to log behavior: ' + m.message);
    } finally {
      b(!1);
    }
  };
  return e.jsxs('div', {
    className: 'p-6 bg-white rounded-lg shadow-md',
    children: [
      e.jsx('h2', {
        className: 'text-2xl font-bold mb-4 text-gray-800',
        children: 'Log New Behaviour',
      }),
      e.jsxs('form', {
        onSubmit: y,
        children: [
          e.jsxs('div', {
            className: 'space-y-4',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    htmlFor: 'student-select',
                    className: 'block text-sm font-medium text-gray-700',
                    children: 'Student',
                  }),
                  e.jsxs('select', {
                    id: 'student-select',
                    value: l,
                    onChange: (t) => i(t.target.value),
                    className:
                      'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md',
                    children: [
                      e.jsx('option', {
                        value: '',
                        disabled: !0,
                        children: 'Select a student',
                      }),
                      r.map((t) =>
                        e.jsx('option', { value: t.id, children: t.name }, t.id)
                      ),
                    ],
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    htmlFor: 'behaviour-type',
                    className: 'block text-sm font-medium text-gray-700',
                    children: 'Behaviour Type',
                  }),
                  e.jsx('input', {
                    id: 'behaviour-type',
                    type: 'text',
                    value: n,
                    onChange: (t) => d(t.target.value),
                    className:
                      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                    placeholder: 'e.g., Participation, Peer Support',
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    htmlFor: 'notes',
                    className: 'block text-sm font-medium text-gray-700',
                    children: 'Notes (Optional)',
                  }),
                  e.jsx('textarea', {
                    id: 'notes',
                    value: f,
                    onChange: (t) => u(t.target.value),
                    rows: 3,
                    className:
                      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                  }),
                ],
              }),
            ],
          }),
          p &&
            e.jsx('p', { className: 'text-red-500 text-sm mt-4', children: p }),
          e.jsx('div', {
            className: 'mt-6',
            children: e.jsx('button', {
              type: 'submit',
              disabled: x,
              className:
                'w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50',
              children: x ? 'Submitting...' : 'Submit Log',
            }),
          }),
        ],
      }),
    ],
  });
}
export { L as default };
