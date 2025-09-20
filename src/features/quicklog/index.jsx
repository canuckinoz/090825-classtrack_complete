import React, { useState } from 'react';
import { useStore } from '../../state/useStore';

function Overlay({ onClose }) {
  const { students, behaviourTypes, logBehaviour, getPredictedActions } =
    useStore();
  const [selected, setSelected] = useState(null);
  const preds = getPredictedActions();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[min(900px,92vw)] max-h-[90vh] overflow-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-navy text-2xl"
        >
          &times;
        </button>

        {Boolean(preds.length) && (
          <div className="mb-5 rounded-xl p-4 text-white bg-gradient-to-r from-navy to-lavender">
            <h4 className="font-semibold mb-2">
              Magic Moments – Quick Actions
            </h4>
            <div className="flex flex-wrap gap-2">
              {preds.map((p, i) => (
                <button
                  key={i}
                  className="px-3 py-2 rounded-full border border-white/30 hover:bg-white/20"
                  onClick={() => {
                    logBehaviour({
                      studentId: p.studentId,
                      behaviourId: p.behaviourId,
                    });
                    onClose();
                  }}
                >
                  {p.studentName} → {p.behaviourName} ({p.confidence}%)
                </button>
              ))}
            </div>
          </div>
        )}

        {!selected && (
          <div>
            <h3 className="text-navy font-semibold mb-3">
              Who are you logging for?
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
              {students.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  className="border-2 border-transparent hover:border-navy rounded-lg p-3 bg-slate-50 hover:bg-white transition text-navy"
                >
                  <div className="w-12 h-12 rounded-full bg-navy text-white grid place-items-center mx-auto font-semibold mb-2">
                    {s.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="text-sm text-center">{s.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selected && (
          <div>
            <h3 className="text-navy font-semibold mb-3">
              What would you like to log?
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
              {behaviourTypes.map((b) => (
                <button
                  key={b.id}
                  className="rounded-xl border-2 border-navy text-navy p-4 hover:bg-navy hover:text-white transition"
                  onClick={() => {
                    logBehaviour({ studentId: selected, behaviourId: b.id });
                    onClose();
                  }}
                >
                  <div className="text-3xl mb-2">{b.icon}</div>
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-xs opacity-70 uppercase">{b.type}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Trigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 rounded-md bg-white text-navy hover:bg-yellowAccent hover:text-navy transition font-semibold"
      >
        Log Behaviour
      </button>
      {open && <Overlay onClose={() => setOpen(false)} />}
    </>
  );
}

const QuickLog = { Trigger };
export default QuickLog;
