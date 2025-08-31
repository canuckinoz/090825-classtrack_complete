import React, { useEffect, useState } from "react";
import { useStore } from "../../state/useStore";
import { getInvisibleStudents } from "../../utils/engagementScore";
import { getConstellationEffects } from "../../utils/seedDemoData";
import { fetchConstellationData, generateMockConstellationData } from "../../services/constellationService";

export default function ConstellationDashboard(){
  const { students, behaviours, abcIncidents, engagementOptOuts, selectedClassId, tenantId, schoolId } = useStore();
  const [starEffects, setStarEffects] = useState({});
  const [shootingStars, setShootingStars] = useState([]);
  const [constellationData, setConstellationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fixed positions for demo
  const positions = [
    {x:20,y:30},{x:40,y:55},{x:65,y:25},{x:80,y:50},{x:35,y:75}
  ];

  // Fetch constellation data when selectedClassId changes
  useEffect(() => {
    if (!selectedClassId) {
      setConstellationData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to fetch from API first
        const data = await fetchConstellationData(selectedClassId, tenantId, schoolId);
        setConstellationData(data);
      } catch (apiError) {
        console.warn('API fetch failed, using mock data:', apiError);
        // Fallback to mock data
        try {
          const mockData = generateMockConstellationData(selectedClassId);
          setConstellationData(mockData);
        } catch (mockError) {
          console.error('Mock data generation failed:', mockError);
          setError('Failed to load constellation data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedClassId, tenantId, schoolId]);

  // Update star effects when behaviours change or constellation data updates
  useEffect(() => {
    const newEffects = {};
    const newShootingStars = [];

    // Use constellation data if available, otherwise fall back to students
    const studentData = constellationData?.students || students;

    studentData.forEach((student, index) => {
      const effects = getConstellationEffects(student.id);
      if (effects) {
        newEffects[student.id] = effects;

        // Create shooting star if student had very recent positive behaviour or celebration moment
        if (effects.shouldShowShootingStar || (constellationData && student.celebrationMoment)) {
          const pos = positions[index % positions.length];
          newShootingStars.push({
            id: `star-${student.id}-${Date.now()}`,
            studentName: student.name,
            startX: pos.x,
            startY: pos.y,
            trailColor: effects.trailColor || '#FFD700'
          });
        }
      }
    });

    setStarEffects(newEffects);

    // Add shooting stars with delay to prevent overwhelming
    if (newShootingStars.length > 0) {
      setShootingStars(prev => [...prev, ...newShootingStars]);

      // Remove shooting stars after animation
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star =>
          !newShootingStars.some(newStar => newStar.id === star.id)
        ));
      }, 3000);
    }
  }, [students, behaviours, constellationData]);

  return (
    <div className="relative min-h-[70vh] rounded-xl overflow-hidden" style={{ background: "radial-gradient(ellipse at top, #0a0e27 0%, #020515 100%)" }} data-testid="constellation">
      {/* Constellation Header */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-1">Student Constellation ⭐</h2>
          <p className="text-white/70 text-sm">Stars shine brighter with positive connections</p>
        </div>
      </div>

      {/* Background Stars */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage:"radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 40px 70px, white, transparent), radial-gradient(1px 1px at 50px 160px, white, transparent)", backgroundSize:"200px 200px", backgroundRepeat:"repeat" }}
      />

      {/* Shooting Stars */}
      {shootingStars.map(star => (
        <ShootingStar key={star.id} {...star} />
      ))}

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-lg font-medium">Charting the stars...</div>
            <div className="text-sm text-white/70">Loading constellation data</div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-2xl mb-2">⚠️</div>
            <div className="text-lg font-medium">Unable to load stars</div>
            <div className="text-sm text-white/70">{error}</div>
          </div>
        </div>
      )}

      {/* No Class Selected */}
      {!selectedClassId && !loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-2xl mb-2">🌌</div>
            <div className="text-lg font-medium">Select a class to view the constellation</div>
            <div className="text-sm text-white/70">Choose a class from the dropdown above</div>
          </div>
        </div>
      )}

      {/* Student Stars - Dynamic Data */}
      {constellationData && !loading && !error && constellationData.students.map((student, i) => {
        // Check if student is invisible (low engagement)
        const invisibleStudents = getInvisibleStudents(students, behaviours, abcIncidents) || [];
        const isInvisible = invisibleStudents.some(item =>
          item.student.id === student.id && !engagementOptOuts[student.id]
        );

        const effects = starEffects[student.id] || {};
        const starBrightness = effects.starBrightness || student.positiveRatio || 0.5;
        const shouldPulse = effects.pulseEffect || student.recentPositiveLog;

        return (
          <div key={student.id} className="absolute" style={{ left:`${positions[i%positions.length].x}%`, top:`${positions[i%positions.length].y}%`, transform:"translate(-50%,-50%)" }}>
            <div className="relative">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  isInvisible
                    ? 'shadow-[0_0_10px_rgba(156,163,175,0.4)] opacity-40 scale-75'
                    : shouldPulse
                      ? 'shadow-[0_0_30px_rgba(255,215,0,0.8)] animate-pulse scale-125'
                      : 'shadow-[0_0_20px_rgba(255,255,255,.6)]'
                }`}
                style={{
                  background: isInvisible
                    ? "#9CA3AF"
                    : shouldPulse
                      ? "#FFD700"
                      : `rgba(255, 193, 7, ${starBrightness})`
                }}
              />

              {/* Star Glow Ring for Recent Activity */}
              {shouldPulse && (
                <div className="absolute inset-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                  <div className="w-full h-full rounded-full border-2 border-yellow-300 opacity-60 animate-ping"></div>
                </div>
              )}

              <div className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap transition-all duration-500 ${
                isInvisible ? 'text-gray-400 opacity-60' : shouldPulse ? 'text-yellow-300' : 'text-white/80'
              }`}>
                {student.name}{isInvisible ? ' (needs connection)' : shouldPulse ? ' ✨' : ''}
              </div>

              {/* Brightness Indicator */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm rounded px-2 py-1 text-xs text-white text-center">
                <div className="font-semibold">
                  {Math.round(starBrightness * 100)}% Bright
                </div>
                <div className="text-gray-300">
                  {student.totalBehaviours || 0} connections
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Constellation Legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-6 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
          <div className="flex items-center gap-2 text-xs text-white/80">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <span>Bright = high positive ratio</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/80">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
            <span>Pulsing = recent positive log</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/80">
            <span>💫</span>
            <span>Shooting star = celebration moment</span>
          </div>
        </div>

        {/* Dynamic Statistics */}
        {constellationData && !loading && !error && (
          <div className="mt-3 text-center">
            <div className="text-xs text-white/60">
              {constellationData.constellation_stats.total_students} stars •
              {constellationData.constellation_stats.bright_stars} bright •
              {constellationData.constellation_stats.growing_stars} growing •
              {constellationData.constellation_stats.needs_support_stars} need support
            </div>
            <div className="text-xs text-white/40">
              Avg brightness: {Math.round(constellationData.constellation_stats.average_brightness * 100)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Shooting Star Component
function ShootingStar({ startX, startY, studentName, trailColor = '#FFD700' }) {
  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        transform: "translate(-50%, -50%)"
      }}
    >
      {/* Shooting Star Animation */}
      <div className="relative">
        <div
          className="w-1 h-1 rounded-full animate-ping"
          style={{ background: trailColor }}
        />
        <div
          className="absolute top-0 left-0 w-8 h-0.5 opacity-80 animate-pulse"
          style={{
            background: `linear-gradient(90deg, ${trailColor}, transparent)`,
            transform: "rotate(-30deg) translateX(-100%)"
          }}
        />

        {/* Student Name Label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-yellow-300 font-medium whitespace-nowrap animate-fade-in">
          {studentName} ⭐
        </div>
      </div>

      {/* CSS Animation for shooting effect */}
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-10px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }
        .animate-fade-in {
          animation: fade-in 3s ease-out;
        }
      `}</style>
    </div>
  );
}
