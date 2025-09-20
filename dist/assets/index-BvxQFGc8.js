import { j as e, r as i } from './ui-vendor-D6t9Fqz9.js';
import { u as a } from './index-DxxIEH0w.js';
import './react-vendor-DTDVRx5A.js';
import './data-vendor-CMp-lYVg.js';
function l({ onClick: t, onNavigateToLog: o }) {
  const s = () => {
    o ? o() : t && t();
  };
  return e.jsx('button', {
    onClick: s,
    'aria-label': 'Open Quick-Log or Navigate to Log View',
    'aria-pressed': 'false',
    className:
      'px-3 py-2 rounded-md bg-white text-navy hover:bg-yellowAccent hover:text-navy transition font-semibold border border-slate-200',
    'data-ct': 'quicklog',
    children: 'Log Behaviour',
  });
}
function c(t) {
  const [o, s] = i.useState(!1),
    { setActiveView: r } = a(),
    n = () => {
      r('behaviourLog');
    };
  return e.jsx(e.Fragment, {
    children: e.jsx(l, { onClick: () => s(!0), onNavigateToLog: n, ...t }),
  });
}
function m({ onOpenQuickLog: t }) {
  const [o, s] = i.useState(!0),
    { setView: r } = a(),
    n = () => {
      t ? t() : console.warn('QuickLogPage: onOpenQuickLog prop not provided');
    };
  return e.jsx('div', {
    className: 'min-h-screen bg-gray-50 p-6',
    children: e.jsx('div', {
      className: 'max-w-4xl mx-auto',
      children: e.jsxs('div', {
        className: 'bg-white rounded-lg shadow-sm p-8',
        children: [
          e.jsxs('div', {
            className: 'text-center mb-8',
            children: [
              e.jsx('h1', {
                className: 'text-3xl font-bold text-gray-900 mb-4',
                children: '⚡ Quick Log',
              }),
              e.jsx('p', {
                className: 'text-gray-600',
                children: 'Fast and easy behavior logging',
              }),
            ],
          }),
          e.jsx('div', {
            className: 'flex justify-center',
            children: e.jsx('button', {
              onClick: n,
              className:
                'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold',
              children: 'Open Quick Log',
            }),
          }),
        ],
      }),
    }),
  });
}
function h(t) {
  return e.jsx(c, { ...t });
}
function p(t) {
  return e.jsx('div', {
    className: 'fixed right-4 bottom-4 z-40',
    children: e.jsx(c, { ...t }),
  });
}
export { p as QuickLogFAB, h as QuickLogTrigger, m as default };
