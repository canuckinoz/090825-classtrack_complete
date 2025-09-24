// src/behaviourWeather.ts
var DEFAULT_POSITIVE = [
  'Participation',
  'Helping Others',
  'Problem Solving',
  'On Task',
  'Peer Support',
];
var DEFAULT_NEGATIVE = [
  'Needs Movement',
  'Feeling Overwhelmed',
  'Conflict Resolution',
  'Disengaged',
  'Escalation',
];
var EPSILON = 1e-6;
var PRIOR_RISK = 0.3;
var PRIOR_STRENGTH = 2;
function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}
function toHour(d) {
  return d.getHours();
}
function toLower(s) {
  return s.toLowerCase();
}
function safeDate(ts) {
  try {
    const d = ts instanceof Date ? ts : new Date(ts);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}
function defaultHourWeight(h) {
  return h >= 10 && h <= 14 ? 1.2 : 1;
}
function mapOverallToRiskLevel(p) {
  return p < 0.2 ? 1 : p < 0.35 ? 2 : p < 0.5 ? 3 : p < 0.7 ? 4 : 5;
}
function riskToMetaphor(risk) {
  var _a;
  const map = {
    1: 'Sunny',
    2: 'Partly Cloudy',
    3: 'Cloudy',
    4: 'Rainy',
    5: 'Stormy',
  };
  return (_a = map[risk]) != null ? _a : 'Cloudy';
}
function hourReadable(h) {
  const d = /* @__PURE__ */ new Date();
  d.setHours(h, 0, 0, 0);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}
function labelForHotspotHour(hour, topTag) {
  if (hour === 14) return `${hourReadable(hour)} \u2022 post-lunch`;
  if (hour === 10) return `${hourReadable(hour)} \u2022 mid-morning transition`;
  if (topTag)
    return `${hourReadable(hour)} \u2022 ${topTag.replace(/-/g, ' ')}`;
  return `${hourReadable(hour)} \u2022 in-class transition`;
}
function computeClassForecast(logs, options = {}) {
  var _a;
  const {
    windowDays = 14,
    positiveTypes = DEFAULT_POSITIVE,
    negativeTypes = DEFAULT_NEGATIVE,
    topKHotspots = 3,
    minSamplesPerHour = 1,
    minSamplesPerStudent = 3,
    hourWeight = defaultHourWeight,
    allowedHours,
    // if provided, we’ll still allocate 24 buckets but include only these in weighting/hotspots
  } = options;
  const since = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1e3);
  const posSet = new Set(positiveTypes.map(toLower));
  const negSet = new Set(negativeTypes.map(toLower));
  const allow = allowedHours ? new Set(allowedHours) : null;
  const byHour = Array.from({ length: 24 }, () => ({
    pos: 0,
    neg: 0,
    tags: /* @__PURE__ */ new Map(),
  }));
  const byStudent = /* @__PURE__ */ new Map();
  let used = 0;
  for (const row of logs || []) {
    const d = safeDate(row.created_at);
    if (!d) continue;
    if (d < since || d > /* @__PURE__ */ new Date()) continue;
    const hour = toHour(d);
    if (hour < 0 || hour > 23) continue;
    const b = byHour[hour];
    const type = toLower(String(row.behaviour_type || ''));
    const w =
      typeof row.weight === 'number' && isFinite(row.weight) && row.weight > 0
        ? row.weight
        : 1;
    let isPos = posSet.has(type);
    let isNeg = negSet.has(type);
    if (!isPos && !isNeg) {
    } else {
      used++;
      if (isPos) b.pos += w;
      if (isNeg) b.neg += w;
      const sid = row.student_id;
      if (!byStudent.has(sid)) byStudent.set(sid, { pos: 0, neg: 0 });
      const s = byStudent.get(sid);
      if (isPos) s.pos += w;
      if (isNeg) s.neg += w;
    }
    if ((_a = row.tags) == null ? void 0 : _a.length) {
      for (const t of row.tags) {
        const key = toLower(t);
        b.tags.set(key, (b.tags.get(key) || 0) + 1);
      }
    }
  }
  const hourRisk = byHour.map((bin, h) => {
    const n = bin.pos + bin.neg;
    const p =
      (bin.neg + PRIOR_STRENGTH * PRIOR_RISK) / (n + PRIOR_STRENGTH + EPSILON);
    return { hour: h, risk: clamp01(p), samples: n };
  });
  let num = 0,
    den = 0;
  for (const r of hourRisk) {
    if (allow && !allow.has(r.hour)) continue;
    const w = hourWeight(r.hour);
    num += r.risk * w;
    den += w;
  }
  const overall = den > 0 ? clamp01(num / den) : PRIOR_RISK;
  const risk_level = mapOverallToRiskLevel(overall);
  const hotspotPool = hourRisk.filter(
    (r) => r.samples >= minSamplesPerHour && (!allow || allow.has(r.hour))
  );
  hotspotPool.sort((a, b) => b.risk - a.risk || a.hour - b.hour);
  const critical_times = hotspotPool.slice(0, topKHotspots).map((r) => {
    var _a2;
    const tagEntries = [...byHour[r.hour].tags.entries()].sort(
      (a, b) => b[1] - a[1]
    );
    const topTag = (_a2 = tagEntries[0]) == null ? void 0 : _a2[0];
    return {
      hour: r.hour,
      probability: Number(r.risk.toFixed(2)),
      label: labelForHotspotHour(r.hour, topTag),
    };
  });
  const focus_students = [...byStudent.entries()]
    .map(([id, s]) => {
      const total = s.pos + s.neg;
      const risk = total > 0 ? s.neg / (total + EPSILON) : 0;
      return { student_id: id, risk, samples: total };
    })
    .filter((x) => x.samples >= minSamplesPerStudent)
    .sort((a, b) => b.risk - a.risk || b.samples - a.samples)
    .slice(0, 5);
  return {
    risk_level,
    overall_probability: Number(overall.toFixed(2)),
    critical_times,
    focus_students,
    diagnostics: {
      sample_size: used,
      window_days: windowDays,
      insufficient_data: used < 20,
      // tune threshold per cohort size
    },
  };
}
function computeStudentPrediction(student_id, behaviours, options) {
  var _a, _b;
  const positive = new Set(
    ((_a = options == null ? void 0 : options.positiveTypes) != null
      ? _a
      : DEFAULT_POSITIVE
    ).map(toLower)
  );
  const negative = new Set(
    ((_b = options == null ? void 0 : options.negativeTypes) != null
      ? _b
      : DEFAULT_NEGATIVE
    ).map(toLower)
  );
  const hourly = Array.from({ length: 24 }, () => ({ pos: 0, neg: 0 }));
  let pos = 0,
    neg = 0;
  for (const b of behaviours || []) {
    const d = safeDate(b.created_at);
    if (!d) continue;
    const h = toHour(d);
    const t = toLower(String(b.behaviour_type || ''));
    if (positive.has(t)) {
      pos++;
      hourly[h].pos++;
    } else if (negative.has(t)) {
      neg++;
      hourly[h].neg++;
    }
  }
  const total = pos + neg;
  const ratio = total > 0 ? pos / (total + EPSILON) : 0.5;
  const risk_level = ratio < 0.3 ? 4 : ratio < 0.5 ? 3 : ratio < 0.7 ? 2 : 1;
  const suggestions = [];
  if (neg > pos)
    suggestions.push('Prime with roles + specific praise before transitions');
  if (hourly.some((h) => h.neg > h.pos * 2))
    suggestions.push('Schedule demanding tasks in low-risk hours');
  if (total < 3) suggestions.push('Collect a few more observations this week');
  if (risk_level >= 3)
    suggestions.push('Plan movement breaks and co-regulation cues');
  return {
    student_id,
    current_positive_ratio: Number(ratio.toFixed(3)),
    risk_level,
    hourly_pattern: hourly.map((h, i) => ({
      hour: i,
      positive: h.pos,
      negative: h.neg,
      risk: h.neg / (h.pos + h.neg + EPSILON),
    })),
    skill_suggestions: [...new Set(suggestions)].slice(0, 5),
  };
}
function computeClassWeatherMetaphor(logs, opts) {
  const fc = computeClassForecast(logs, opts);
  return riskToMetaphor(fc.risk_level);
}
function buildHourlyBuckets(
  logs,
  positiveTypes = DEFAULT_POSITIVE,
  negativeTypes = DEFAULT_NEGATIVE
) {
  const posSet = new Set(positiveTypes.map(toLower));
  const negSet = new Set(negativeTypes.map(toLower));
  const buckets = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    pos: 0,
    neg: 0,
  }));
  for (const row of logs || []) {
    const d = safeDate(row.created_at);
    if (!d) continue;
    const h = toHour(d);
    const t = toLower(String(row.behaviour_type || ''));
    if (posSet.has(t)) buckets[h].pos++;
    else if (negSet.has(t)) buckets[h].neg++;
  }
  return buckets;
}

// src/abcTracker.ts
var EPS = 1e-6;
var DEFAULT_WINDOW_DAYS = 14;
var DEFAULT_POSITIVE2 = [
  'Participation',
  'Helping Others',
  'Problem Solving',
  'On Task',
  'Peer Support',
];
var DEFAULT_NEGATIVE2 = [
  'Calling Out',
  'Off Task',
  'Refusal',
  'Aggression',
  'Disruption',
  'Elopement',
];
function safeDate2(t) {
  try {
    const d = t instanceof Date ? t : new Date(t);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}
function hourKey(h) {
  const d = /* @__PURE__ */ new Date();
  d.setHours(h, 0, 0, 0);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function normKey(s) {
  return (s || '').trim();
}
function computeABCClassInsights(events, opts = {}) {
  var _a;
  const {
    windowDays = DEFAULT_WINDOW_DAYS,
    positiveBehaviors = DEFAULT_POSITIVE2,
    negativeBehaviors = DEFAULT_NEGATIVE2,
    minSamplesForPair = 5,
    topKPairs = 8,
    topKAntecedents = 8,
    topKConsequences = 8,
    topKContexts = 5,
    minSamplesPerStudent = 3,
    pairAlpha = 1,
    priorNeg = 0.3,
  } = opts;
  const since = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1e3);
  const posSet = new Set(positiveBehaviors.map((b) => b.toLowerCase()));
  const negSet = new Set(negativeBehaviors.map((b) => b.toLowerCase()));
  const behCount = /* @__PURE__ */ new Map();
  const antCount = /* @__PURE__ */ new Map();
  const conCount = /* @__PURE__ */ new Map();
  const ab = /* @__PURE__ */ new Map();
  const byStudent = /* @__PURE__ */ new Map();
  const hourContext = Array.from({ length: 24 }, () => ({ pos: 0, neg: 0 }));
  const tagContext = /* @__PURE__ */ new Map();
  let total = 0,
    posTotal = 0,
    negTotal = 0;
  for (const e of (Array.isArray(events) ? events : [events]) || []) {
    const d = safeDate2(e.timestamp);
    if (!d || d < since || d > /* @__PURE__ */ new Date()) continue;
    const hour = d.getHours();
    const w =
      typeof e.weight === 'number' && isFinite(e.weight) && e.weight > 0
        ? e.weight
        : 1;
    const A = normKey(e.antecedent);
    const B = normKey(e.behavior);
    const C = normKey(e.consequence);
    if (!B) continue;
    total += w;
    const bLower = B.toLowerCase();
    const isPos = posSet.has(bLower);
    const isNeg = negSet.has(bLower);
    if (isPos) posTotal += w;
    if (isNeg) negTotal += w;
    behCount.set(B, (behCount.get(B) || 0) + w);
    if (A) antCount.set(A, (antCount.get(A) || 0) + w);
    if (C) conCount.set(C, (conCount.get(C) || 0) + w);
    if (A) {
      if (!ab.has(A)) ab.set(A, /* @__PURE__ */ new Map());
      const m = ab.get(A);
      m.set(B, (m.get(B) || 0) + w);
    }
    const sid = e.studentId;
    if (!byStudent.has(sid))
      byStudent.set(sid, { pos: 0, neg: 0, intensitySum: 0, intensityN: 0 });
    const sp = byStudent.get(sid);
    if (isPos) sp.pos += w;
    if (isNeg) sp.neg += w;
    if (typeof e.intensity === 'number' && isFinite(e.intensity)) {
      sp.intensitySum += e.intensity * w;
      sp.intensityN += w;
    }
    if (isPos) hourContext[hour].pos += w;
    if (isNeg) hourContext[hour].neg += w;
    if ((_a = e.tags) == null ? void 0 : _a.length) {
      for (const t of e.tags) {
        const key = t.toLowerCase().trim();
        if (!key) continue;
        if (!tagContext.has(key)) tagContext.set(key, { pos: 0, neg: 0 });
        const tc = tagContext.get(key);
        if (isPos) tc.pos += w;
        if (isNeg) tc.neg += w;
      }
    }
  }
  const baselineNeg = (negTotal + priorNeg) / (posTotal + negTotal + 1);
  const toSortedRows = (m) =>
    [...m.entries()]
      .map(([name, count]) => ({ name, count, rate: count / (total + EPS) }))
      .sort((a, b) => b.count - a.count);
  const behaviours = toSortedRows(behCount).slice(0, 50);
  const antecedents = toSortedRows(antCount).slice(0, topKAntecedents);
  const consequences = toSortedRows(conCount).slice(0, topKConsequences);
  const pB = /* @__PURE__ */ new Map();
  for (const [b, c] of behCount) pB.set(b, (c + 1) / (total + behCount.size));
  const abPairs = [];
  for (const [A, mapB] of ab.entries()) {
    const suppA = antCount.get(A) || 0;
    for (const [B, suppAB] of mapB.entries()) {
      const conf = (suppAB + pairAlpha) / (suppA + pairAlpha * mapB.size + EPS);
      const lift = conf / (pB.get(B) || 1 / (total + behCount.size));
      if (suppAB >= minSamplesForPair) {
        abPairs.push({
          antecedent: A,
          behavior: B,
          support: suppAB,
          confidence: Number(conf.toFixed(3)),
          lift: Number(lift.toFixed(3)),
        });
      }
    }
  }
  abPairs.sort((a, b) => b.confidence - a.confidence || b.support - a.support);
  const abPairsTop = abPairs.slice(0, topKPairs);
  const hourHotspots = hourContext
    .map((bin, h) => {
      const n = bin.pos + bin.neg;
      const r = n > 0 ? bin.neg / (n + EPS) : 0;
      return {
        key: hourKey(h),
        negRate: Number(r.toFixed(3)),
        delta: Number((r - baselineNeg).toFixed(3)),
        support: n,
        kind: 'hour',
      };
    })
    .filter((x) => x.support > 0)
    .sort((a, b) => b.delta - a.delta || b.support - a.support)
    .slice(0, topKContexts);
  const tagHotspots = [...tagContext.entries()]
    .map(([k, bin]) => {
      const n = bin.pos + bin.neg;
      const r = n > 0 ? bin.neg / (n + EPS) : 0;
      return {
        key: k,
        negRate: Number(r.toFixed(3)),
        delta: Number((r - baselineNeg).toFixed(3)),
        support: n,
        kind: 'tag',
      };
    })
    .filter((x) => x.support >= 3)
    .sort((a, b) => b.delta - a.delta || b.support - a.support)
    .slice(0, topKContexts);
  const focusStudents = [...byStudent.entries()]
    .map(([id, s]) => {
      const n = s.pos + s.neg;
      const share = n > 0 ? s.neg / (n + EPS) : 0;
      const avgInt = s.intensityN > 0 ? s.intensitySum / s.intensityN : void 0;
      const suggestions = [];
      if (share >= 0.7)
        suggestions.push(
          'Immediate co-regulation; shorten task with choice of two'
        );
      else if (share >= 0.5)
        suggestions.push('Prime with role; schedule short movement breaks');
      if ((avgInt || 0) >= 3)
        suggestions.push('Plan calm-start + de-escalation script');
      return {
        studentId: id,
        negShare: Number(share.toFixed(3)),
        samples: n,
        avgIntensity: avgInt ? Number(avgInt.toFixed(2)) : void 0,
        suggestions,
      };
    })
    .filter((s) => s.samples >= minSamplesPerStudent)
    .sort((a, b) => b.negShare - a.negShare || b.samples - a.samples)
    .slice(0, 10);
  return {
    summary: {
      total,
      windowDays,
      baselineNeg: Number(baselineNeg.toFixed(3)),
      insufficientData: total < 20,
    },
    behaviours,
    antecedents,
    consequences,
    abPairs: abPairsTop,
    contextHotspots: [...hourHotspots, ...tagHotspots],
    focusStudents,
  };
}
function computeABCStudentInsights(studentId, events, opts = {}) {
  var _a;
  const {
    windowDays = DEFAULT_WINDOW_DAYS,
    positiveBehaviors = DEFAULT_POSITIVE2,
    negativeBehaviors = DEFAULT_NEGATIVE2,
  } = opts;
  const since = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1e3);
  const posSet = new Set(positiveBehaviors.map((b) => b.toLowerCase()));
  const negSet = new Set(negativeBehaviors.map((b) => b.toLowerCase()));
  const beh = /* @__PURE__ */ new Map();
  const ant = /* @__PURE__ */ new Map();
  const con = /* @__PURE__ */ new Map();
  const hours = Array.from({ length: 24 }, () => ({ pos: 0, neg: 0 }));
  let pos = 0,
    neg = 0,
    total = 0;
  for (const e of events || []) {
    if (e.studentId !== studentId) continue;
    const d = safeDate2(e.timestamp);
    if (!d || d < since || d > /* @__PURE__ */ new Date()) continue;
    const h = d.getHours();
    const B = normKey(e.behavior);
    const A = normKey(e.antecedent);
    const C = normKey(e.consequence);
    if (!B) continue;
    total++;
    const bLower = B.toLowerCase();
    const isPos = posSet.has(bLower);
    const isNeg = negSet.has(bLower);
    if (isPos) {
      pos++;
      hours[h].pos++;
    }
    if (isNeg) {
      neg++;
      hours[h].neg++;
    }
    beh.set(B, (beh.get(B) || 0) + 1);
    if (A) ant.set(A, (ant.get(A) || 0) + 1);
    if (C) con.set(C, (con.get(C) || 0) + 1);
  }
  const negShare = total > 0 ? neg / (pos + neg + EPS) : 0;
  const toRows = (m) =>
    [...m.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  const hi = hours
    .map((bin, h) => {
      const n = bin.pos + bin.neg;
      const r = n > 0 ? bin.neg / (n + EPS) : 0;
      return {
        key: hourKey(h),
        negRate: Number(r.toFixed(3)),
        delta: 0,
        support: n,
        kind: 'hour',
      };
    })
    .filter((x) => x.support > 0)
    .sort((a, b) => b.negRate - a.negRate)
    .slice(0, 3);
  const suggestions = [];
  if (negShare >= 0.5)
    suggestions.push('Prime with role; specific praise before transitions');
  if (((_a = hi[0]) == null ? void 0 : _a.negRate) >= 0.6)
    suggestions.push(
      `Plan supports around ${hi[0].key} (timer, chunking, movement cue)`
    );
  if (total < 3) suggestions.push('Collect a few more observations this week');
  return {
    studentId,
    total,
    negShare: Number(negShare.toFixed(3)),
    topAntecedents: toRows(ant),
    topBehaviours: toRows(beh),
    topConsequences: toRows(con),
    highRiskHours: hi,
    suggestions: [...new Set(suggestions)].slice(0, 5),
  };
}
export {
  buildHourlyBuckets,
  computeABCClassInsights,
  computeABCStudentInsights,
  computeClassForecast,
  computeClassWeatherMetaphor,
  computeStudentPrediction,
  riskToMetaphor,
};
//# sourceMappingURL=index.js.map
