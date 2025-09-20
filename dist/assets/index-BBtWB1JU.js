import { r as a, j as e } from './ui-vendor-D6t9Fqz9.js';
import './react-vendor-DTDVRx5A.js';
const n = {
  connection: {
    name: 'Building Connection',
    color: 'bg-blue-50 border-blue-200',
    strategies: [
      {
        title: '2-Minute Check-In',
        description:
          "Brief one-on-one conversation to understand student's current state",
        script:
          'Hi [Name], I noticed you seem [observation]. How are you feeling right now? What would help you succeed today?',
        timing: 'Start of class or during transition',
      },
      {
        title: 'Strength Spotlight',
        description: 'Acknowledge specific positive behaviors or efforts',
        script:
          'I saw how you [specific behavior]. That shows real [strength/skill]. Keep building on that!',
        timing: 'Immediately after observing positive behavior',
      },
    ],
  },
  engagement: {
    name: 'Increasing Engagement',
    color: 'bg-green-50 border-green-200',
    strategies: [
      {
        title: 'Choice Architecture',
        description: 'Provide structured options to increase student agency',
        script:
          'You can show your understanding by [option A], [option B], or [option C]. Which feels right for you?',
        timing: 'During instruction or assignment setup',
      },
      {
        title: 'Movement Breaks',
        description: 'Incorporate physical movement to reset attention',
        script:
          "Let's take 30 seconds to [stretch/breathe/move]. This helps our brains get ready to focus.",
        timing: 'When attention is waning',
      },
    ],
  },
  regulation: {
    name: 'Supporting Self-Regulation',
    color: 'bg-purple-50 border-purple-200',
    strategies: [
      {
        title: 'Calm Down Corner',
        description: 'Designated space for emotional regulation',
        script:
          'I can see this is hard right now. Would you like to use the calm corner for a few minutes?',
        timing: 'When student shows signs of overwhelm',
      },
      {
        title: 'Breathing Reset',
        description: 'Simple breathing technique for immediate calm',
        script:
          "Let's try box breathing: breathe in for 4, hold for 4, out for 4, hold for 4. Ready?",
        timing: 'During emotional escalation',
      },
    ],
  },
};
function m() {
  const [i, l] = a.useState('connection'),
    [s, o] = a.useState(null);
  return e.jsx('div', {
    className: 'min-h-screen bg-gray-50 p-4',
    'data-ct': 'strategy-library',
    children: e.jsxs('div', {
      className: 'max-w-6xl mx-auto',
      children: [
        e.jsxs('div', {
          className: 'bg-white rounded-xl shadow-sm p-6 mb-6',
          children: [
            e.jsx('h1', {
              className: 'text-3xl font-light text-navy mb-2',
              children: 'Strategy Library',
            }),
            e.jsx('p', {
              className: 'text-slate-600',
              children:
                'Evidence-based, strength-focused approaches to support student success. No punitive measures - only skill-building and connection strategies.',
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'grid lg:grid-cols-4 gap-6',
          children: [
            e.jsx('div', {
              className: 'lg:col-span-1',
              children: e.jsxs('div', {
                className: 'bg-white rounded-xl shadow-sm p-4',
                children: [
                  e.jsx('h2', {
                    className: 'font-semibold text-gray-900 mb-4',
                    children: 'Categories',
                  }),
                  e.jsx('div', {
                    className: 'space-y-2',
                    children: Object.entries(n).map(([t, r]) =>
                      e.jsx(
                        'button',
                        {
                          onClick: () => l(t),
                          className: `w-full text-left p-3 rounded-lg transition-colors ${i === t ? 'bg-navy text-white' : 'hover:bg-gray-100'}`,
                          children: r.name,
                        },
                        t
                      )
                    ),
                  }),
                ],
              }),
            }),
            e.jsx('div', {
              className: 'lg:col-span-3',
              children: e.jsxs('div', {
                className: 'bg-white rounded-xl shadow-sm p-6',
                children: [
                  e.jsx('h2', {
                    className: 'text-xl font-semibold text-gray-900 mb-4',
                    children: n[i].name,
                  }),
                  e.jsx('div', {
                    className: 'grid gap-4',
                    children: n[i].strategies.map((t, r) =>
                      e.jsxs(
                        'button',
                        {
                          className: `w-full text-left border rounded-lg p-4 transition-all ${n[i].color} hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`,
                          onClick: () => o(t),
                          children: [
                            e.jsx('h3', {
                              className: 'font-semibold text-gray-900 mb-2',
                              children: t.title,
                            }),
                            e.jsx('p', {
                              className: 'text-gray-600 text-sm mb-3',
                              children: t.description,
                            }),
                            e.jsxs('div', {
                              className: 'text-xs text-gray-500',
                              children: [
                                e.jsx('strong', { children: 'Best timing:' }),
                                ' ',
                                t.timing,
                              ],
                            }),
                          ],
                        },
                        r
                      )
                    ),
                  }),
                ],
              }),
            }),
          ],
        }),
        s &&
          e.jsx('div', {
            className:
              'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50',
            children: e.jsxs('div', {
              className: 'bg-white rounded-xl max-w-2xl w-full p-6',
              children: [
                e.jsxs('div', {
                  className: 'flex justify-between items-start mb-4',
                  children: [
                    e.jsx('h3', {
                      className: 'text-xl font-semibold text-gray-900',
                      children: s.title,
                    }),
                    e.jsx('button', {
                      onClick: () => o(null),
                      className: 'text-gray-400 hover:text-gray-600 text-2xl',
                      children: '×',
                    }),
                  ],
                }),
                e.jsx('p', {
                  className: 'text-gray-600 mb-4',
                  children: s.description,
                }),
                e.jsxs('div', {
                  className: 'bg-blue-50 border-l-4 border-blue-400 p-4 mb-4',
                  children: [
                    e.jsx('h4', {
                      className: 'font-semibold text-blue-900 mb-2',
                      children: 'Sample Script:',
                    }),
                    e.jsxs('p', {
                      className: 'text-blue-800 italic',
                      children: ['"', s.script, '"'],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'text-sm text-gray-600',
                  children: [
                    e.jsx('strong', { children: 'Best timing:' }),
                    ' ',
                    s.timing,
                  ],
                }),
              ],
            }),
          }),
      ],
    }),
  });
}
export { m as default };
