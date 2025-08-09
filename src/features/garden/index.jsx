import React from "react";
import { useStore } from "../../state/useStore";

export default function GardenDashboard(){
  const { students } = useStore();
  return (
    <div className="min-h-[60vh] rounded-xl p-8 bg-gradient-to-b from-sky-300 via-emerald-50 to-green-300 relative overflow-x-hidden">
      <div className="grid gap-6" style={{ gridTemplateColumns:"repeat(auto-fill, minmax(150px, 1fr))" }}>
        {students.map(s=>{
          const height = Math.round((s.positiveRatio ?? 0.5) * 80);
          return (
            <div key={s.id} className="relative cursor-pointer group">
              <div className="mx-auto w-[70px] h-[16px] rounded-b-lg bg-amber-900/80" />
              <div className="relative h-[120px]">
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1 bg-green-700" style={{ height }}/>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="w-[60px] h-[60px] rounded-full blur-2xl opacity-60" style={{ background:"rgba(103,58,183,0.3)" }}/>
                  <div className="absolute inset-0 grid place-items-center text-[36px]" style={{ color:"var(--lavender-primary)" }}>✿</div>
                </div>
              </div>
              <div className="mt-2 text-center text-sm text-navy font-semibold">{s.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
