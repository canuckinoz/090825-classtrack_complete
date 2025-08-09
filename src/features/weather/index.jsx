import React from "react";
import { useStore } from "../../state/useStore";
import s from "./weather.module.css";

export default function WeatherDashboard(){
  // Temporary stubbed values (replace with real model/probs later)
  const riskLevel = 2; // 1–5
  const predictions = [
    { time: "10:30 AM", chance: 0.35 },
    { time: "12:00 PM", chance: 0.52 },
    { time: "2:15 PM",  chance: 0.87 },
  ];
  const focus = ["Ava Chen","Liam Nguyen","Sophie Taylor"];

  return (
    <div className="min-h-[70vh] relative rounded-xl p-6 bg-gradient-to-b from-sky-300 to-slate-100">
      <div className={`${s.cloud} ${s.cloudLarge}`} />
      <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow">
        <h2 className="text-2xl font-light text-navy mb-2">Morning Behaviour Forecast</h2>
        <p className="text-slate-700 mb-3">Risk level: <strong>{riskLevel}/5</strong></p>
        <div className="h-3 rounded bg-green-50 relative overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-sage to-yellowAccent"
            style={{ width: `${(riskLevel/5)*100}%` }}
          />
          <div
            className="absolute -top-1 w-[3px] h-5 bg-navy rounded"
            style={{ left: `${(riskLevel/5)*100}%` }}
          />
        </div>

        <h3 className="text-lg text-navy font-medium mb-2">Critical Times</h3>
        <div className="space-y-2">
          {predictions.map((p,i)=>(
            <div key={i} className="flex items-center gap-3 py-2 border-b border-black/10">
              <span className="px-3 py-1 text-white rounded-full bg-lavender">{p.time}</span>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-[60px] h-1.5 bg-slate-200 rounded overflow-hidden">
                  <div className="h-full bg-[color:var(--terracotta-accent)]" style={{ width:`${Math.round(p.chance*100)}%`}}/>
                </div>
                <span>{Math.round(p.chance*100)}% chance of energy crash</span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-lg text-navy font-medium mt-6 mb-2">Focus Students</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {focus.map((name,i)=>(
            <div key={i} className="bg-white rounded-lg p-3 border-l-4 border-sage shadow-sm hover:shadow transition">
              <div className="font-semibold text-navy">{name}</div>
              <div className="text-sm text-slate-600">Connection‑seeking, support with transitions</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
