type UUID$1 = string;
interface BehaviourLog {
    created_at: string | number | Date;
    behaviour_type: string;
    student_id: UUID$1;
    tags?: string[];
    weight?: number;
}
interface HourRisk {
    hour: number;
    risk: number;
    samples: number;
}
interface CriticalTime {
    hour: number;
    probability: number;
    label: string;
}
interface FocusStudent$1 {
    student_id: UUID$1;
    risk: number;
    samples: number;
}
interface ClassForecastResult {
    risk_level: 1 | 2 | 3 | 4 | 5;
    overall_probability: number;
    critical_times: CriticalTime[];
    focus_students: FocusStudent$1[];
    diagnostics?: {
        sample_size: number;
        window_days: number;
        insufficient_data: boolean;
    };
}
interface StudentHourlyPatternBin {
    pos: number;
    neg: number;
}
interface StudentPredictionResult {
    student_id: UUID$1;
    current_positive_ratio: number;
    risk_level: 1 | 2 | 3 | 4;
    hourly_pattern: Array<{
        hour: number;
        positive: number;
        negative: number;
        risk: number;
    }>;
    skill_suggestions: string[];
}
/** Your existing metaphor mapping */
declare function riskToMetaphor(risk: 1 | 2 | 3 | 4 | 5): string;
interface ClassForecastOptions {
    /** restrict to last N days; default 14 */
    windowDays?: number;
    /** customize positive/negative lists */
    positiveTypes?: string[];
    negativeTypes?: string[];
    /** how many hotspot hours to return; default 3 */
    topKHotspots?: number;
    /** min samples required for a hotspot hour; default 1 */
    minSamplesPerHour?: number;
    /** min total events for a focus student; default 3 */
    minSamplesPerStudent?: number;
    /** override hour weighting (0..23) */
    hourWeight?: (h: number) => number;
    /** restrict to subset of hours if desired; default all 24 used */
    allowedHours?: number[];
}
/**
 * Compute class-level behaviour forecast.
 * Single-pass O(n); robust to invalid timestamps; Bayesian-smooths tiny hours.
 */
declare function computeClassForecast(logs: BehaviourLog[], options?: ClassForecastOptions): ClassForecastResult;
declare function computeStudentPrediction(student_id: UUID$1, behaviours: Array<{
    created_at: string | number | Date;
    behaviour_type: string;
}>, options?: {
    positiveTypes?: string[];
    negativeTypes?: string[];
}): StudentPredictionResult;
declare function computeClassWeatherMetaphor(logs: BehaviourLog[], opts?: ClassForecastOptions): string;
/** Helper: build hourly buckets (useful for charts); respects polarity lists */
declare function buildHourlyBuckets(logs: BehaviourLog[], positiveTypes?: string[], negativeTypes?: string[]): Array<{
    hour: number;
    pos: number;
    neg: number;
}>;

type UUID = string;
/** Raw ABC event coming from your DB/API */
interface ABCEvent {
    studentId: UUID;
    timestamp: string | number | Date;
    antecedent: string;
    behavior: string;
    consequence?: string;
    intensity?: number;
    durationSec?: number;
    tags?: string[];
    weight?: number;
}
/** Configuration */
interface ABCOptions {
    windowDays?: number;
    positiveBehaviors?: string[];
    negativeBehaviors?: string[];
    minSamplesForPair?: number;
    topKPairs?: number;
    topKAntecedents?: number;
    topKConsequences?: number;
    topKContexts?: number;
    minSamplesPerStudent?: number;
    /** Laplace smoothing for P(B|A). Default 1. */
    pairAlpha?: number;
    /** Prior probability of “negative” for context odds (stabilizes tiny samples). Default 0.30. */
    priorNeg?: number;
}
interface ABPair {
    antecedent: string;
    behavior: string;
    support: number;
    confidence: number;
    lift: number;
}
interface CountRow {
    name: string;
    count: number;
    rate?: number;
}
interface ContextHotspot {
    key: string;
    negRate: number;
    delta: number;
    support: number;
    kind: "hour" | "tag";
}
interface FocusStudent {
    studentId: UUID;
    negShare: number;
    samples: number;
    avgIntensity?: number;
    suggestions: string[];
}
interface ABCClassInsights {
    summary: {
        total: number;
        windowDays: number;
        baselineNeg: number;
        insufficientData: boolean;
    };
    behaviours: CountRow[];
    antecedents: CountRow[];
    consequences: CountRow[];
    abPairs: ABPair[];
    contextHotspots: ContextHotspot[];
    focusStudents: FocusStudent[];
}
declare function computeABCClassInsights(events: ABCEvent | ABCEvent[], opts?: ABCOptions): ABCClassInsights;
interface ABCStudentInsights {
    studentId: UUID;
    total: number;
    negShare: number;
    topAntecedents: CountRow[];
    topBehaviours: CountRow[];
    topConsequences: CountRow[];
    highRiskHours: ContextHotspot[];
    suggestions: string[];
}
declare function computeABCStudentInsights(studentId: UUID, events: ABCEvent[], opts?: ABCOptions): ABCStudentInsights;

export { ABCClassInsights, ABCEvent, FocusStudent as ABCFocusStudent, ABCOptions, ABCStudentInsights, UUID as ABCUUID, ABPair, BehaviourLog, ClassForecastOptions, ClassForecastResult, ContextHotspot, CountRow, CriticalTime, HourRisk, StudentHourlyPatternBin, StudentPredictionResult, FocusStudent$1 as WeatherFocusStudent, UUID$1 as WeatherUUID, buildHourlyBuckets, computeABCClassInsights, computeABCStudentInsights, computeClassForecast, computeClassWeatherMetaphor, computeStudentPrediction, riskToMetaphor };
