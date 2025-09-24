import {
  resolvePermissions,
  PERMISSIONS,
} from '../../src/server/policies/permission.resolver';

describe('permission resolver', () => {
  test.skip('teacher gets class-level supportive permissions', () => {
    const perms = resolvePermissions('TEACHER', [], { classIds: ['CLASS-1'] });
    expect(perms).toEqual(
      expect.arrayContaining([
        PERMISSIONS.VIEW_CLASS,
        PERMISSIONS.LOG_BEHAVIOUR,
        PERMISSIONS.VIEW_ABC_CLASS,
        PERMISSIONS.VIEW_REPORTS_CLASS,
      ])
    );
  });

  test.skip('leader includes school aggregate without teacher comparisons', () => {
    const perms = resolvePermissions('LEADER', ['PRINCIPAL'], {
      schoolIds: ['SCH-1'],
    });
    expect(perms).toContain(PERMISSIONS.VIEW_SCHOOL_AGGREGATE);
  });

  test.skip('central CEO has network-level insights', () => {
    const perms = resolvePermissions('CENTRAL', ['CEO'], {
      regionIds: ['REG-1'],
    });
    expect(perms).toEqual(
      expect.arrayContaining([
        PERMISSIONS.MANAGE_POLICIES,
        PERMISSIONS.VIEW_NETWORK_SUCCESS,
        PERMISSIONS.PREDICTIVE_RESOURCING,
      ])
    );
  });
});
