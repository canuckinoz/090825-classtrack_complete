import React from "react";
import { useStore } from "../../state/useStore";

export default function ConstellationDashboard(){
  const { students } = useStore();
  // fixed positions for demo
  const positions = [
    {x:20,y:30},{x:40,y:55},{x:65,y:25},{x:80,y:50},{x:35,y:75}
  ];
  return (
    <div className="relative min-h-[70vh] rounded-xl overflow-hidden" style={{ background: "radial-gradient(ellipse at top, #0a0e27 0%, #020515 100%)" }}>
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage:"radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 40px 70px, white, transparent), radial-gradient(1px 1px at 50px 160px, white, transparent)", backgroundSize:"200px 200px", backgroundRepeat:"repeat" }}
      />
      {students.slice(0,5).map((s,i)=>(
        <div key={s.id} className="absolute" style={{ left:`${positions[i%positions.length].x}%`, top:`${positions[i%positions.length].y}%`, transform:"translate(-50%,-50%)" }}>
          <div className="relative">
            <div className="w-3 h-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,.6)]" style={{ background:"#FFC107" }} />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/80 whitespace-nowrap">{s.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
