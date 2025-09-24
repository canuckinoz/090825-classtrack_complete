import { r as h, j as e } from './ui-vendor-D6t9Fqz9.js';
import { u as _, s as d, a as G } from './index-DxxIEH0w.js';
import { M as g, C as Q, S as V, A as J } from './referral-CxgCGxa_.js';
import './react-vendor-DTDVRx5A.js';
import './data-vendor-CMp-lYVg.js';
function K({ onSubmit: b, onSaveDraft: j, initialData: u = null }) {
  const { students: m, classes: l, selectedClassId: p } = _(),
    [s, N] = h.useState({
      studentId: '',
      studentName: '',
      yearLevel: '',
      studentUID: '',
      diagnosesOrAdditionalNeeds: '',
      schoolId: p || '',
      schoolName: 'Demo School',
      referrerName: '',
      referrerRole: '',
      referrerEmail: '',
      referrerPhone: '',
      principalName: '',
      principalEmail: '',
      consentConfirmed: !1,
      consentDate: '',
      consentGivenBy: '',
      summaryOfConcerns: '',
      impactNarrative: '',
      desiredOutcomes: '',
      strengthsAndInterests: '',
      hasBehaviourSupportPlan: !1,
      hasStudentSafetyPlan: !1,
      currentInterventions: [],
      externalAgenciesInvolved: '',
      environmentalSupports: '',
      teachingStrategiesTried: [],
      frequencyScale: '',
      intensityScale: '',
      knownAntecedents: '',
      criticalTimes: '',
      successfulStrategies: '',
      environmentalFactors: '',
      urgency: '',
      urgencyReason: '',
      supportRequested: [],
      specificQuestions: '',
      preferredContactMethod: 'email',
      availableForContact: '',
      ...u,
    }),
    [a, C] = h.useState({}),
    [y, v] = h.useState(!1),
    [o, w] = h.useState(0),
    [k, P] = h.useState({});
  h.useEffect(() => {
    u && N((r) => ({ ...r, ...u }));
  }, [u]);
  const i = [
      { id: 'student', title: 'Student Information', icon: '👤' },
      { id: 'school', title: 'School & Referrer', icon: '🏫' },
      { id: 'consent', title: 'Consent', icon: '✅' },
      { id: 'concerns', title: 'Strength-based Summary', icon: '💭' },
      { id: 'supports', title: 'Current Supports', icon: '🤝' },
      { id: 'patterns', title: 'Patterns & Context', icon: '📊' },
      { id: 'request', title: 'Support Request', icon: '🎯' },
      { id: 'review', title: 'Review & Submit', icon: '📋' },
    ],
    n = (r, t) => {
      (N((c) => ({ ...c, [r]: t })),
        a[r] && C((c) => ({ ...c, [r]: null })),
        typeof t == 'string' && t.length > 10 && R(r, t));
    },
    R = (r, t) => {
      const c = {},
        f = t.toLowerCase();
      (Object.entries(J).forEach(([x, H]) => {
        f.includes(x.toLowerCase()) &&
          (c[r] = `Consider using "${H}" instead of "${x}"`);
      }),
        P((x) => ({ ...x, ...c })));
    },
    O = (r, t, c) => {
      N((f) => ({
        ...f,
        [r]: c ? [...(f[r] || []), t] : (f[r] || []).filter((x) => x !== t),
      }));
    },
    S = (r) => {
      const t = {};
      switch (r) {
        case 'student':
          (s.studentName.trim() || (t.studentName = 'Student name is required'),
            s.studentId.trim() || (t.studentId = 'Student ID is required'),
            s.yearLevel.trim() || (t.yearLevel = 'Year level is required'));
          break;
        case 'school':
          (s.referrerName.trim() ||
            (t.referrerName = 'Referrer name is required'),
            s.referrerRole.trim() ||
              (t.referrerRole = 'Referrer role is required'),
            s.referrerEmail.trim() ||
              (t.referrerEmail = 'Referrer email is required'),
            s.referrerEmail &&
              !s.referrerEmail.includes('@') &&
              (t.referrerEmail = 'Please enter a valid email address'));
          break;
        case 'consent':
          (s.consentConfirmed ||
            (t.consentConfirmed = 'Consent must be confirmed'),
            s.consentDate || (t.consentDate = 'Consent date is required'));
          break;
        case 'concerns':
          (s.summaryOfConcerns.trim()
            ? s.summaryOfConcerns.length < g.summaryOfConcerns &&
              (t.summaryOfConcerns = `Please provide at least ${g.summaryOfConcerns} characters`)
            : (t.summaryOfConcerns = 'Summary of concerns is required'),
            s.desiredOutcomes.trim()
              ? s.desiredOutcomes.length < g.desiredOutcomes &&
                (t.desiredOutcomes = `Please provide at least ${g.desiredOutcomes} characters`)
              : (t.desiredOutcomes = 'Desired outcomes are required'));
          break;
        case 'request':
          (s.urgency || (t.urgency = 'Urgency level is required'),
            (!s.supportRequested || s.supportRequested.length === 0) &&
              (t.supportRequested =
                'Please select at least one type of support'));
          break;
      }
      return (C((c) => ({ ...c, ...t })), Object.keys(t).length === 0);
    },
    I = (r) => {
      (r < o || S(i[o].id)) && w(r);
    },
    E = () => {
      S(i[o].id) && w((r) => Math.min(r + 1, i.length - 1));
    },
    q = () => {
      w((r) => Math.max(r - 1, 0));
    },
    Y = async () => {
      v(!0);
      try {
        (await j({ ...s, status: 'draft' }),
          d('Draft saved successfully', 'success'));
      } catch (r) {
        (console.error('Error saving draft:', r),
          d('Failed to save draft', 'error'));
      } finally {
        v(!1);
      }
    },
    T = async () => {
      let r = !0;
      if (
        (i.forEach((t) => {
          S(t.id) || (r = !1);
        }),
        !r)
      ) {
        d('Please complete all required fields', 'error');
        return;
      }
      v(!0);
      try {
        (await b({ ...s, status: 'submitted' }),
          d('Referral submitted successfully', 'success'));
      } catch (t) {
        (console.error('Error submitting referral:', t),
          d('Failed to submit referral', 'error'));
      } finally {
        v(!1);
      }
    },
    F = () => {
      switch (i[o].id) {
        case 'student':
          return L();
        case 'school':
          return D();
        case 'consent':
          return A();
        case 'concerns':
          return $();
        case 'supports':
          return B();
        case 'patterns':
          return M();
        case 'request':
          return U();
        case 'review':
          return W();
        default:
          return null;
      }
    },
    L = () =>
      e.jsxs('div', {
        className: 'space-y-6',
        children: [
          e.jsxs('div', {
            className: 'grid md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Student Name *',
                  }),
                  e.jsx('input', {
                    type: 'text',
                    value: s.studentName,
                    onChange: (r) => n('studentName', r.target.value),
                    className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${a.studentName ? 'border-red-300' : 'border-gray-300'}`,
                    placeholder: "Enter student's full name",
                  }),
                  a.studentName &&
                    e.jsx('p', {
                      className: 'mt-1 text-sm text-red-600',
                      children: a.studentName,
                    }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Student ID *',
                  }),
                  e.jsx('input', {
                    type: 'text',
                    value: s.studentId,
                    onChange: (r) => n('studentId', r.target.value),
                    className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${a.studentId ? 'border-red-300' : 'border-gray-300'}`,
                    placeholder: 'Student identifier',
                  }),
                  a.studentId &&
                    e.jsx('p', {
                      className: 'mt-1 text-sm text-red-600',
                      children: a.studentId,
                    }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'grid md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Year Level *',
                  }),
                  e.jsxs('select', {
                    value: s.yearLevel,
                    onChange: (r) => n('yearLevel', r.target.value),
                    className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${a.yearLevel ? 'border-red-300' : 'border-gray-300'}`,
                    children: [
                      e.jsx('option', {
                        value: '',
                        children: 'Select year level',
                      }),
                      e.jsx('option', { value: 'Prep', children: 'Prep' }),
                      e.jsx('option', { value: 'Year 1', children: 'Year 1' }),
                      e.jsx('option', { value: 'Year 2', children: 'Year 2' }),
                      e.jsx('option', { value: 'Year 3', children: 'Year 3' }),
                      e.jsx('option', { value: 'Year 4', children: 'Year 4' }),
                      e.jsx('option', { value: 'Year 5', children: 'Year 5' }),
                      e.jsx('option', { value: 'Year 6', children: 'Year 6' }),
                      e.jsx('option', { value: 'Year 7', children: 'Year 7' }),
                      e.jsx('option', { value: 'Year 8', children: 'Year 8' }),
                      e.jsx('option', { value: 'Year 9', children: 'Year 9' }),
                      e.jsx('option', {
                        value: 'Year 10',
                        children: 'Year 10',
                      }),
                      e.jsx('option', {
                        value: 'Year 11',
                        children: 'Year 11',
                      }),
                      e.jsx('option', {
                        value: 'Year 12',
                        children: 'Year 12',
                      }),
                    ],
                  }),
                  a.yearLevel &&
                    e.jsx('p', {
                      className: 'mt-1 text-sm text-red-600',
                      children: a.yearLevel,
                    }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Student UID (Optional)',
                  }),
                  e.jsx('input', {
                    type: 'text',
                    value: s.studentUID,
                    onChange: (r) => n('studentUID', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    placeholder: 'System identifier if available',
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                className: 'block text-sm font-medium text-gray-700 mb-2',
                children: 'Additional Information (Optional)',
              }),
              e.jsx('textarea', {
                value: s.diagnosesOrAdditionalNeeds,
                onChange: (r) =>
                  n('diagnosesOrAdditionalNeeds', r.target.value),
                className:
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                rows: 3,
                placeholder:
                  'Any diagnoses, additional needs, or relevant background information',
              }),
              e.jsx('p', {
                className: 'mt-1 text-sm text-gray-500',
                children:
                  'This information helps us provide the most appropriate support',
              }),
            ],
          }),
        ],
      }),
    D = () =>
      e.jsxs('div', {
        className: 'space-y-6',
        children: [
          e.jsxs('div', {
            className: 'grid md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Referrer Name *',
                  }),
                  e.jsx('input', {
                    type: 'text',
                    value: s.referrerName,
                    onChange: (r) => n('referrerName', r.target.value),
                    className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${a.referrerName ? 'border-red-300' : 'border-gray-300'}`,
                    placeholder: 'Your full name',
                  }),
                  a.referrerName &&
                    e.jsx('p', {
                      className: 'mt-1 text-sm text-red-600',
                      children: a.referrerName,
                    }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Your Role *',
                  }),
                  e.jsxs('select', {
                    value: s.referrerRole,
                    onChange: (r) => n('referrerRole', r.target.value),
                    className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${a.referrerRole ? 'border-red-300' : 'border-gray-300'}`,
                    children: [
                      e.jsx('option', {
                        value: '',
                        children: 'Select your role',
                      }),
                      e.jsx('option', {
                        value: 'Classroom Teacher',
                        children: 'Classroom Teacher',
                      }),
                      e.jsx('option', {
                        value: 'Learning Support Teacher',
                        children: 'Learning Support Teacher',
                      }),
                      e.jsx('option', {
                        value: 'Principal',
                        children: 'Principal',
                      }),
                      e.jsx('option', {
                        value: 'Assistant Principal',
                        children: 'Assistant Principal',
                      }),
                      e.jsx('option', {
                        value: 'Student Wellbeing Coordinator',
                        children: 'Student Wellbeing Coordinator',
                      }),
                      e.jsx('option', { value: 'Other', children: 'Other' }),
                    ],
                  }),
                  a.referrerRole &&
                    e.jsx('p', {
                      className: 'mt-1 text-sm text-red-600',
                      children: a.referrerRole,
                    }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'grid md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Email Address *',
                  }),
                  e.jsx('input', {
                    type: 'email',
                    value: s.referrerEmail,
                    onChange: (r) => n('referrerEmail', r.target.value),
                    className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${a.referrerEmail ? 'border-red-300' : 'border-gray-300'}`,
                    placeholder: 'your.email@school.edu.au',
                  }),
                  a.referrerEmail &&
                    e.jsx('p', {
                      className: 'mt-1 text-sm text-red-600',
                      children: a.referrerEmail,
                    }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Phone Number (Optional)',
                  }),
                  e.jsx('input', {
                    type: 'tel',
                    value: s.referrerPhone,
                    onChange: (r) => n('referrerPhone', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    placeholder: 'Contact number',
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'grid md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Principal Name (Optional)',
                  }),
                  e.jsx('input', {
                    type: 'text',
                    value: s.principalName,
                    onChange: (r) => n('principalName', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    placeholder: "Principal's name",
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Principal Email (Optional)',
                  }),
                  e.jsx('input', {
                    type: 'email',
                    value: s.principalEmail,
                    onChange: (r) => n('principalEmail', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    placeholder: 'principal@school.edu.au',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    A = () =>
      e.jsxs('div', {
        className: 'space-y-6',
        children: [
          e.jsxs('div', {
            className: 'bg-blue-50 p-6 rounded-lg',
            children: [
              e.jsx('h3', {
                className: 'text-lg font-semibold text-blue-900 mb-3',
                children: 'Consent Requirements',
              }),
              e.jsx('p', {
                className: 'text-blue-800 mb-4',
                children:
                  "Before we can provide behaviour support, we need to ensure appropriate consent has been obtained from the student's parent or guardian.",
              }),
              e.jsxs('div', {
                className: 'space-y-4',
                children: [
                  e.jsxs('div', {
                    className: 'flex items-start space-x-3',
                    children: [
                      e.jsx('input', {
                        type: 'checkbox',
                        id: 'consentConfirmed',
                        checked: s.consentConfirmed,
                        onChange: (r) =>
                          n('consentConfirmed', r.target.checked),
                        className:
                          'mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
                      }),
                      e.jsxs('label', {
                        htmlFor: 'consentConfirmed',
                        className: 'text-sm text-gray-900',
                        children: [
                          e.jsx('span', {
                            className: 'font-medium',
                            children:
                              'I confirm that appropriate consent has been obtained',
                          }),
                          e.jsx('span', {
                            className: 'block text-gray-600 mt-1',
                            children:
                              'Parent/guardian consent is required for behaviour support services',
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.consentConfirmed &&
                    e.jsx('p', {
                      className: 'text-sm text-red-600',
                      children: a.consentConfirmed,
                    }),
                ],
              }),
            ],
          }),
          s.consentConfirmed &&
            e.jsxs('div', {
              className: 'grid md:grid-cols-2 gap-6',
              children: [
                e.jsxs('div', {
                  children: [
                    e.jsx('label', {
                      className: 'block text-sm font-medium text-gray-700 mb-2',
                      children: 'Consent Date *',
                    }),
                    e.jsx('input', {
                      type: 'date',
                      value: s.consentDate,
                      onChange: (r) => n('consentDate', r.target.value),
                      className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${a.consentDate ? 'border-red-300' : 'border-gray-300'}`,
                    }),
                    a.consentDate &&
                      e.jsx('p', {
                        className: 'mt-1 text-sm text-red-600',
                        children: a.consentDate,
                      }),
                  ],
                }),
                e.jsxs('div', {
                  children: [
                    e.jsx('label', {
                      className: 'block text-sm font-medium text-gray-700 mb-2',
                      children: 'Consent Given By',
                    }),
                    e.jsx('input', {
                      type: 'text',
                      value: s.consentGivenBy,
                      onChange: (r) => n('consentGivenBy', r.target.value),
                      className:
                        'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                      placeholder: 'Parent/guardian name',
                    }),
                  ],
                }),
              ],
            }),
        ],
      }),
    $ = () =>
      e.jsxs('div', {
        className: 'space-y-6',
        children: [
          e.jsxs('div', {
            className: 'bg-green-50 p-4 rounded-lg',
            children: [
              e.jsx('h3', {
                className: 'text-lg font-semibold text-green-900 mb-2',
                children: 'Strength-Based Approach',
              }),
              e.jsx('p', {
                className: 'text-green-800 text-sm',
                children:
                  'Describe observed behaviours as signals of unmet needs and learning opportunities. Focus on what the student is trying to communicate through their actions.',
              }),
            ],
          }),
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                className: 'block text-sm font-medium text-gray-700 mb-2',
                children: 'Summary of Concerns *',
              }),
              e.jsx('textarea', {
                value: s.summaryOfConcerns,
                onChange: (r) => n('summaryOfConcerns', r.target.value),
                className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${a.summaryOfConcerns ? 'border-red-300' : 'border-gray-300'}`,
                rows: 4,
                placeholder:
                  "Describe what you're observing and what the student might be trying to communicate...",
              }),
              e.jsxs('div', {
                className: 'mt-1 flex justify-between',
                children: [
                  a.summaryOfConcerns &&
                    e.jsx('p', {
                      className: 'text-sm text-red-600',
                      children: a.summaryOfConcerns,
                    }),
                  e.jsxs('p', {
                    className: 'text-sm text-gray-500',
                    children: [
                      s.summaryOfConcerns.length,
                      '/',
                      g.summaryOfConcerns,
                      ' minimum characters',
                    ],
                  }),
                ],
              }),
              k.summaryOfConcerns &&
                e.jsx('div', {
                  className:
                    'mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg',
                  children: e.jsxs('p', {
                    className: 'text-sm text-yellow-800',
                    children: ['💡 ', k.summaryOfConcerns],
                  }),
                }),
            ],
          }),
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                className: 'block text-sm font-medium text-gray-700 mb-2',
                children: 'Desired Outcomes *',
              }),
              e.jsx('textarea', {
                value: s.desiredOutcomes,
                onChange: (r) => n('desiredOutcomes', r.target.value),
                className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${a.desiredOutcomes ? 'border-red-300' : 'border-gray-300'}`,
                rows: 3,
                placeholder:
                  'What would success look like? What skills or strategies would help the student?',
              }),
              e.jsxs('div', {
                className: 'mt-1 flex justify-between',
                children: [
                  a.desiredOutcomes &&
                    e.jsx('p', {
                      className: 'text-sm text-red-600',
                      children: a.desiredOutcomes,
                    }),
                  e.jsxs('p', {
                    className: 'text-sm text-gray-500',
                    children: [
                      s.desiredOutcomes.length,
                      '/',
                      g.desiredOutcomes,
                      ' minimum characters',
                    ],
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'grid md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Impact on Learning',
                  }),
                  e.jsx('textarea', {
                    value: s.impactNarrative,
                    onChange: (r) => n('impactNarrative', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    rows: 3,
                    placeholder:
                      "How is this affecting the student's learning and classroom experience?",
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: "Student's Strengths & Interests",
                  }),
                  e.jsx('textarea', {
                    value: s.strengthsAndInterests,
                    onChange: (r) => n('strengthsAndInterests', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    rows: 3,
                    placeholder:
                      'What does this student do well? What are they interested in?',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    B = () =>
      e.jsxs('div', {
        className: 'space-y-6',
        children: [
          e.jsxs('div', {
            className: 'grid md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                className: 'space-y-4',
                children: [
                  e.jsx('h3', {
                    className: 'text-lg font-semibold text-gray-900',
                    children: 'Current Plans',
                  }),
                  e.jsxs('div', {
                    className: 'flex items-center space-x-3',
                    children: [
                      e.jsx('input', {
                        type: 'checkbox',
                        id: 'hasBehaviourSupportPlan',
                        checked: s.hasBehaviourSupportPlan,
                        onChange: (r) =>
                          n('hasBehaviourSupportPlan', r.target.checked),
                        className:
                          'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
                      }),
                      e.jsx('label', {
                        htmlFor: 'hasBehaviourSupportPlan',
                        className: 'text-sm text-gray-900',
                        children: 'Student has a Behaviour Support Plan',
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'flex items-center space-x-3',
                    children: [
                      e.jsx('input', {
                        type: 'checkbox',
                        id: 'hasStudentSafetyPlan',
                        checked: s.hasStudentSafetyPlan,
                        onChange: (r) =>
                          n('hasStudentSafetyPlan', r.target.checked),
                        className:
                          'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
                      }),
                      e.jsx('label', {
                        htmlFor: 'hasStudentSafetyPlan',
                        className: 'text-sm text-gray-900',
                        children: 'Student has a Safety Plan',
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'External Agencies Involved',
                  }),
                  e.jsx('textarea', {
                    value: s.externalAgenciesInvolved,
                    onChange: (r) =>
                      n('externalAgenciesInvolved', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    rows: 3,
                    placeholder:
                      'Speech therapy, OT, psychology services, etc.',
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                className: 'block text-sm font-medium text-gray-700 mb-3',
                children: 'Current Interventions',
              }),
              e.jsx('div', {
                className: 'grid md:grid-cols-2 gap-2',
                children: Q.map((r) =>
                  e.jsxs(
                    'div',
                    {
                      className: 'flex items-center space-x-3',
                      children: [
                        e.jsx('input', {
                          type: 'checkbox',
                          id: `intervention-${r}`,
                          checked: s.currentInterventions.includes(r),
                          onChange: (t) =>
                            O('currentInterventions', r, t.target.checked),
                          className:
                            'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
                        }),
                        e.jsx('label', {
                          htmlFor: `intervention-${r}`,
                          className: 'text-sm text-gray-900',
                          children: r,
                        }),
                      ],
                    },
                    r
                  )
                ),
              }),
            ],
          }),
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                className: 'block text-sm font-medium text-gray-700 mb-2',
                children: 'Environmental Supports',
              }),
              e.jsx('textarea', {
                value: s.environmentalSupports,
                onChange: (r) => n('environmentalSupports', r.target.value),
                className:
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                rows: 3,
                placeholder:
                  'Physical adjustments, seating arrangements, visual supports, etc.',
              }),
            ],
          }),
        ],
      }),
    M = () =>
      e.jsxs('div', {
        className: 'space-y-6',
        children: [
          e.jsxs('div', {
            className: 'grid md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Frequency',
                  }),
                  e.jsxs('select', {
                    value: s.frequencyScale,
                    onChange: (r) => n('frequencyScale', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    children: [
                      e.jsx('option', {
                        value: '',
                        children: 'Select frequency',
                      }),
                      e.jsx('option', {
                        value: 'low',
                        children: 'Low (Occasional)',
                      }),
                      e.jsx('option', {
                        value: 'medium',
                        children: 'Medium (Regular)',
                      }),
                      e.jsx('option', {
                        value: 'high',
                        children: 'High (Frequent)',
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Intensity',
                  }),
                  e.jsxs('select', {
                    value: s.intensityScale,
                    onChange: (r) => n('intensityScale', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    children: [
                      e.jsx('option', {
                        value: '',
                        children: 'Select intensity',
                      }),
                      e.jsx('option', { value: 'low', children: 'Low (Mild)' }),
                      e.jsx('option', {
                        value: 'medium',
                        children: 'Medium (Moderate)',
                      }),
                      e.jsx('option', {
                        value: 'high',
                        children: 'High (Intense)',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'grid md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Known Antecedents',
                  }),
                  e.jsx('textarea', {
                    value: s.knownAntecedents,
                    onChange: (r) => n('knownAntecedents', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    rows: 3,
                    placeholder:
                      'What typically happens before the behaviour occurs?',
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Critical Times',
                  }),
                  e.jsx('textarea', {
                    value: s.criticalTimes,
                    onChange: (r) => n('criticalTimes', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    rows: 3,
                    placeholder:
                      'Times of day, activities, or situations when challenges are most likely',
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'grid md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Successful Strategies',
                  }),
                  e.jsx('textarea', {
                    value: s.successfulStrategies,
                    onChange: (r) => n('successfulStrategies', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    rows: 3,
                    placeholder: 'What has worked well in the past?',
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Environmental Factors',
                  }),
                  e.jsx('textarea', {
                    value: s.environmentalFactors,
                    onChange: (r) => n('environmentalFactors', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    rows: 3,
                    placeholder:
                      'Classroom layout, noise levels, transitions, etc.',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    U = () =>
      e.jsxs('div', {
        className: 'space-y-6',
        children: [
          e.jsxs('div', {
            className: 'grid md:grid-cols-2 gap-6',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Urgency Level *',
                  }),
                  e.jsxs('select', {
                    value: s.urgency,
                    onChange: (r) => n('urgency', r.target.value),
                    className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${a.urgency ? 'border-red-300' : 'border-gray-300'}`,
                    children: [
                      e.jsx('option', {
                        value: '',
                        children: 'Select urgency level',
                      }),
                      e.jsx('option', {
                        value: 'low',
                        children: 'Low Priority',
                      }),
                      e.jsx('option', {
                        value: 'medium',
                        children: 'Medium Priority',
                      }),
                      e.jsx('option', {
                        value: 'critical',
                        children: 'Critical',
                      }),
                    ],
                  }),
                  a.urgency &&
                    e.jsx('p', {
                      className: 'mt-1 text-sm text-red-600',
                      children: a.urgency,
                    }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Preferred Contact Method',
                  }),
                  e.jsxs('select', {
                    value: s.preferredContactMethod,
                    onChange: (r) =>
                      n('preferredContactMethod', r.target.value),
                    className:
                      'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                    children: [
                      e.jsx('option', { value: 'email', children: 'Email' }),
                      e.jsx('option', { value: 'phone', children: 'Phone' }),
                      e.jsx('option', {
                        value: 'in_person',
                        children: 'In Person',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          s.urgency === 'critical' &&
            e.jsxs('div', {
              children: [
                e.jsx('label', {
                  className: 'block text-sm font-medium text-gray-700 mb-2',
                  children: 'Reason for Critical Priority',
                }),
                e.jsx('textarea', {
                  value: s.urgencyReason,
                  onChange: (r) => n('urgencyReason', r.target.value),
                  className:
                    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                  rows: 3,
                  placeholder:
                    'Please explain why this requires immediate attention',
                }),
              ],
            }),
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                className: 'block text-sm font-medium text-gray-700 mb-3',
                children: 'Support Requested *',
              }),
              e.jsx('div', {
                className: 'grid md:grid-cols-2 gap-2',
                children: V.map((r) =>
                  e.jsxs(
                    'div',
                    {
                      className: 'flex items-center space-x-3',
                      children: [
                        e.jsx('input', {
                          type: 'checkbox',
                          id: `support-${r}`,
                          checked: s.supportRequested.includes(r),
                          onChange: (t) =>
                            O('supportRequested', r, t.target.checked),
                          className:
                            'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
                        }),
                        e.jsx('label', {
                          htmlFor: `support-${r}`,
                          className: 'text-sm text-gray-900',
                          children: r,
                        }),
                      ],
                    },
                    r
                  )
                ),
              }),
              a.supportRequested &&
                e.jsx('p', {
                  className: 'mt-2 text-sm text-red-600',
                  children: a.supportRequested,
                }),
            ],
          }),
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                className: 'block text-sm font-medium text-gray-700 mb-2',
                children: 'Specific Questions',
              }),
              e.jsx('textarea', {
                value: s.specificQuestions,
                onChange: (r) => n('specificQuestions', r.target.value),
                className:
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                rows: 3,
                placeholder:
                  'What specific questions would you like our team to address?',
              }),
            ],
          }),
          e.jsxs('div', {
            children: [
              e.jsx('label', {
                className: 'block text-sm font-medium text-gray-700 mb-2',
                children: 'Availability for Contact',
              }),
              e.jsx('textarea', {
                value: s.availableForContact,
                onChange: (r) => n('availableForContact', r.target.value),
                className:
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                rows: 2,
                placeholder:
                  'Best times to contact you (days, times, any restrictions)',
              }),
            ],
          }),
        ],
      }),
    W = () =>
      e.jsxs('div', {
        className: 'space-y-6',
        children: [
          e.jsxs('div', {
            className: 'bg-blue-50 p-6 rounded-lg',
            children: [
              e.jsx('h3', {
                className: 'text-lg font-semibold text-blue-900 mb-3',
                children: 'What Happens Next',
              }),
              e.jsxs('div', {
                className: 'space-y-2 text-blue-800',
                children: [
                  e.jsx('p', {
                    children:
                      '✓ Your referral will be reviewed by our Learning Partner Behaviour Support (LPBS) team',
                  }),
                  e.jsx('p', {
                    children:
                      "✓ You'll receive confirmation within 1 business day",
                  }),
                  e.jsx('p', {
                    children: '✓ Initial response within 2-3 business days',
                  }),
                  e.jsx('p', {
                    children:
                      '✓ If additional specialist input is helpful, LPBS will invite a Behaviour Support Specialist (BSS) to collaborate',
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'bg-white border border-gray-200 rounded-lg p-6',
            children: [
              e.jsx('h3', {
                className: 'text-lg font-semibold text-gray-900 mb-4',
                children: 'Referral Summary',
              }),
              e.jsxs('div', {
                className: 'grid md:grid-cols-2 gap-6',
                children: [
                  e.jsxs('div', {
                    children: [
                      e.jsx('h4', {
                        className: 'font-medium text-gray-900 mb-2',
                        children: 'Student',
                      }),
                      e.jsx('p', {
                        className: 'text-sm text-gray-600',
                        children: s.studentName,
                      }),
                      e.jsx('p', {
                        className: 'text-sm text-gray-600',
                        children: s.yearLevel,
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    children: [
                      e.jsx('h4', {
                        className: 'font-medium text-gray-900 mb-2',
                        children: 'Referrer',
                      }),
                      e.jsx('p', {
                        className: 'text-sm text-gray-600',
                        children: s.referrerName,
                      }),
                      e.jsx('p', {
                        className: 'text-sm text-gray-600',
                        children: s.referrerRole,
                      }),
                      e.jsx('p', {
                        className: 'text-sm text-gray-600',
                        children: s.referrerEmail,
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    children: [
                      e.jsx('h4', {
                        className: 'font-medium text-gray-900 mb-2',
                        children: 'Urgency',
                      }),
                      e.jsx('span', {
                        className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${s.urgency === 'critical' ? 'bg-red-100 text-red-800' : s.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`,
                        children:
                          s.urgency === 'critical'
                            ? 'Critical'
                            : s.urgency === 'medium'
                              ? 'Medium Priority'
                              : 'Low Priority',
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    children: [
                      e.jsx('h4', {
                        className: 'font-medium text-gray-900 mb-2',
                        children: 'Support Requested',
                      }),
                      e.jsx('div', {
                        className: 'text-sm text-gray-600',
                        children: s.supportRequested.map((r) =>
                          e.jsx(
                            'span',
                            {
                              className:
                                'inline-block bg-gray-100 px-2 py-1 rounded mr-1 mb-1',
                              children: r,
                            },
                            r
                          )
                        ),
                      }),
                    ],
                  }),
                ],
              }),
              s.summaryOfConcerns &&
                e.jsxs('div', {
                  className: 'mt-4',
                  children: [
                    e.jsx('h4', {
                      className: 'font-medium text-gray-900 mb-2',
                      children: 'Summary of Concerns',
                    }),
                    e.jsx('p', {
                      className: 'text-sm text-gray-600 bg-gray-50 p-3 rounded',
                      children: s.summaryOfConcerns,
                    }),
                  ],
                }),
            ],
          }),
        ],
      });
  return e.jsxs('div', {
    className: 'min-h-screen bg-gray-50',
    children: [
      e.jsx('div', {
        className: 'bg-white border-b border-gray-200',
        children: e.jsxs('div', {
          className: 'max-w-4xl mx-auto px-6 py-4',
          children: [
            e.jsx('h1', {
              className: 'text-2xl font-bold text-gray-900',
              children: 'New Behaviour Support Referral',
            }),
            e.jsx('p', {
              className: 'text-gray-600 mt-1',
              children:
                'Request support using a strength-based, collaborative approach',
            }),
          ],
        }),
      }),
      e.jsx('div', {
        className: 'bg-white border-b border-gray-200',
        children: e.jsx('div', {
          className: 'max-w-4xl mx-auto px-6 py-4',
          children: e.jsx('div', {
            className: 'flex items-center space-x-4 overflow-x-auto',
            children: i.map((r, t) =>
              e.jsxs(
                'button',
                {
                  onClick: () => I(t),
                  className: `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${t === o ? 'bg-blue-100 text-blue-700' : t < o ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`,
                  children: [
                    e.jsx('span', { children: r.icon }),
                    e.jsx('span', { children: r.title }),
                    t < o && e.jsx('span', { children: '✓' }),
                  ],
                },
                r.id
              )
            ),
          }),
        }),
      }),
      e.jsx('div', {
        className: 'max-w-4xl mx-auto px-6 py-8',
        children: e.jsxs('div', {
          className: 'bg-white rounded-lg shadow-sm p-8',
          children: [
            e.jsx('div', {
              className: 'mb-8',
              children: e.jsxs('h2', {
                className: 'text-xl font-semibold text-gray-900 mb-2',
                children: [i[o].icon, ' ', i[o].title],
              }),
            }),
            F(),
            e.jsxs('div', {
              className: 'mt-8 flex items-center justify-between',
              children: [
                e.jsxs('div', {
                  className: 'flex space-x-3',
                  children: [
                    e.jsx('button', {
                      onClick: q,
                      disabled: o === 0,
                      className:
                        'px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
                      children: 'Previous',
                    }),
                    o < i.length - 1
                      ? e.jsx('button', {
                          onClick: E,
                          className:
                            'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700',
                          children: 'Next',
                        })
                      : e.jsxs('div', {
                          className: 'flex space-x-3',
                          children: [
                            e.jsx('button', {
                              onClick: Y,
                              disabled: y,
                              className:
                                'px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50',
                              children: y ? 'Saving...' : 'Save Draft',
                            }),
                            e.jsx('button', {
                              onClick: T,
                              disabled: y,
                              className:
                                'px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50',
                              children: y ? 'Submitting...' : 'Submit Referral',
                            }),
                          ],
                        }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'text-sm text-gray-500',
                  children: ['Step ', o + 1, ' of ', i.length],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function se() {
  const b = G(),
    j = async (m) => {
      try {
        console.log('Submitting new referral:', m);
        const l = await fetch('/api/referrals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(m),
        });
        if (!l.ok) {
          const s = await l.json();
          throw new Error(s.error || 'Failed to submit referral');
        }
        const p = await l.json();
        (d(
          'Referral submitted successfully! You will receive confirmation shortly.',
          'success'
        ),
          b(`/referrals/${p.id}`));
      } catch (l) {
        throw (
          console.error('Error submitting referral:', l),
          d(
            l.message || 'Failed to submit referral. Please try again.',
            'error'
          ),
          l
        );
      }
    },
    u = async (m) => {
      try {
        console.log('Saving referral draft:', m);
        const l = await fetch('/api/referrals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...m, status: 'draft' }),
        });
        if (!l.ok) {
          const s = await l.json();
          throw new Error(s.error || 'Failed to save draft');
        }
        const p = await l.json();
        (d('Draft saved successfully', 'success'),
          b(`/referrals/${p.id}/edit`));
      } catch (l) {
        throw (
          console.error('Error saving draft:', l),
          d(l.message || 'Failed to save draft. Please try again.', 'error'),
          l
        );
      }
    };
  return e.jsx(K, { onSubmit: j, onSaveDraft: u });
}
export { se as default };
