import {
  o as r,
  s as a,
  n as i,
  a as o,
  u,
  d,
} from './utils-vendor-BoBknyFz.js';
/**
 * Behaviour Weather System™ - Improved Implementation
 *
 * A robust, scalable, and maintainable predictive analytics system for classroom behaviour patterns.
 * Provides weather-based metaphors to help teachers anticipate and prepare for challenging periods.
 *
 * @version 2.0.0
 * @author ClassTrack Analytics Team
 * @license MIT
 */ r({
  created_at: u([a(), i(), d()]).transform((t) => {
    const e = t instanceof Date ? t : new Date(t);
    if (isNaN(e.getTime())) throw new Error(`Invalid date: ${t}`);
    return e;
  }),
  behaviour_type: a().min(1, 'Behaviour type cannot be empty'),
  student_id: a().uuid('Student ID must be a valid UUID'),
  tags: o(a()).optional().default([]),
  weight: i().min(0).max(10).optional().default(1),
  school_id: a().uuid('School ID must be a valid UUID').optional(),
  class_id: a().uuid('Class ID must be a valid UUID').optional(),
});
r({
  windowDays: i().int().min(1).max(365).default(14),
  positiveTypes: o(a()).default([]),
  negativeTypes: o(a()).default([]),
  topKHotspots: i().int().min(1).max(10).default(3),
  minSamplesPerHour: i().int().min(1).default(2),
  minSamplesPerStudent: i().int().min(1).default(3),
  allowedHours: o(i().int().min(0).max(23)).optional(),
  timezone: a().default('UTC'),
}).strict();
const l = '/api';
async function s(t, e = {}) {
  try {
    const n = await fetch(`${l}${t}`, {
      headers: { 'Content-Type': 'application/json', ...e.headers },
      ...e,
    });
    if (!n.ok)
      throw new Error(`API request failed: ${n.status} ${n.statusText}`);
    return await n.json();
  } catch (n) {
    throw (console.error(`API Error [${t}]:`, n), n);
  }
}
async function m(t = null) {
  const e = t ? `?schoolId=${t}` : '';
  return await s(`/students${e}`);
}
async function p(t) {
  return await s('/behaviors', { method: 'POST', body: JSON.stringify(t) });
}
async function f(t) {
  return await s(`/reports/${t}`);
}
export { f as a, p as c, m as g };
