/*
  ClassTrack RBAC — Permission Resolver
  - Deterministic, role/subrole based permission assignment
  - Growth/support framing; no punitive features
*/

export const PERMISSIONS = {
  // Teacher permissions
  VIEW_CLASS: 'view_class',
  LOG_BEHAVIOUR: 'log_behaviour',
  VIEW_ABC_CLASS: 'view_abc_class',
  VIEW_REPORTS_CLASS: 'view_reports_class',

  // Leader permissions (additive)
  VIEW_YEARLEVEL_AGGREGATE: 'view_yearlevel_aggregate',
  VIEW_FLAGGED_STUDENTS: 'view_flagged_students',
  RECOMMEND_INTERVENTIONS: 'recommend_interventions',
  VIEW_SPECIALIST_NOTES: 'view_specialist_notes',
  VIEW_SCHOOL_AGGREGATE: 'view_school_aggregate',
  VIEW_ALERTS_SCHOOL: 'view_alerts_school',

  // Central permissions
  VIEW_REGION_AGGREGATE: 'view_region_aggregate',
  MANAGE_POLICIES: 'manage_policies',
  VIEW_NETWORK_SUCCESS: 'view_network_success',
  PREDICTIVE_RESOURCING: 'predictive_resourcing',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
export type Role = 'TEACHER' | 'LEADER' | 'CENTRAL';
export type Subrole =
  | 'YEAR_COORD'
  | 'INCLUSION'
  | 'PRINCIPAL'
  | 'SCHOOL_ADMIN'
  | 'DISTRICT_ADMIN'
  | 'CEO';

export type Scope = {
  classIds?: string[];
  yearLevels?: string[];
  schoolIds?: string[];
  regionIds?: string[];
};

/**
 * resolvePermissions
 * Deterministically resolves a list of permissions based on role and subroles.
 * - Base permissions for each role
 * - Subroles add capabilities; no teacher comparisons ever included
 */
export function resolvePermissions(
  role: Role,
  subroles: Subrole[] = [],
  _scope: Scope = {}
): Permission[] {
  const set = new Set<Permission>();

  // Base by role
  if (role === 'TEACHER') {
    set.add(PERMISSIONS.VIEW_CLASS);
    set.add(PERMISSIONS.LOG_BEHAVIOUR);
    set.add(PERMISSIONS.VIEW_ABC_CLASS);
    set.add(PERMISSIONS.VIEW_REPORTS_CLASS);
  }

  if (role === 'LEADER') {
    set.add(PERMISSIONS.VIEW_CLASS);
    set.add(PERMISSIONS.LOG_BEHAVIOUR);
    set.add(PERMISSIONS.VIEW_ABC_CLASS);
    set.add(PERMISSIONS.VIEW_REPORTS_CLASS);
    set.add(PERMISSIONS.VIEW_YEARLEVEL_AGGREGATE);
    set.add(PERMISSIONS.VIEW_FLAGGED_STUDENTS);
    set.add(PERMISSIONS.RECOMMEND_INTERVENTIONS);
    set.add(PERMISSIONS.VIEW_SPECIALIST_NOTES);
    set.add(PERMISSIONS.VIEW_SCHOOL_AGGREGATE);
    set.add(PERMISSIONS.VIEW_ALERTS_SCHOOL);
  }

  if (role === 'CENTRAL') {
    set.add(PERMISSIONS.VIEW_REGION_AGGREGATE);
    set.add(PERMISSIONS.MANAGE_POLICIES);
    set.add(PERMISSIONS.VIEW_NETWORK_SUCCESS);
    set.add(PERMISSIONS.PREDICTIVE_RESOURCING);
  }

  // Subrole additive overlays (never add comparative analytics between teachers)
  for (const sr of subroles) {
    if (sr === 'YEAR_COORD') {
      set.add(PERMISSIONS.VIEW_YEARLEVEL_AGGREGATE);
      set.add(PERMISSIONS.VIEW_FLAGGED_STUDENTS);
    }
    if (sr === 'INCLUSION') {
      set.add(PERMISSIONS.RECOMMEND_INTERVENTIONS);
      set.add(PERMISSIONS.VIEW_SPECIALIST_NOTES);
    }
    if (sr === 'PRINCIPAL' || sr === 'SCHOOL_ADMIN') {
      set.add(PERMISSIONS.VIEW_SCHOOL_AGGREGATE);
      set.add(PERMISSIONS.VIEW_ALERTS_SCHOOL);
    }
    if (sr === 'DISTRICT_ADMIN') {
      set.add(PERMISSIONS.VIEW_REGION_AGGREGATE);
    }
    if (sr === 'CEO') {
      set.add(PERMISSIONS.MANAGE_POLICIES);
      set.add(PERMISSIONS.VIEW_NETWORK_SUCCESS);
      set.add(PERMISSIONS.PREDICTIVE_RESOURCING);
    }
  }

  return Array.from(set);
}
