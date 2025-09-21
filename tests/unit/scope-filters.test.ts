import { attachScopeFilters } from '../../src/server/middleware/scope.middleware';

function runAttach(user: any) {
  const req: any = { user };
  attachScopeFilters(req as any, {} as any, () => {});
  return req.scopeFilters;
}

describe('scope filters', () => {
  test.skip('teacher scoped by classIds', () => {
    const filters = runAttach({ role: 'TEACHER', scope: { classIds: ['A'] } });
    expect(filters).toHaveProperty('classId');
  });

  test.skip('leader principal scoped by schoolIds', () => {
    const filters = runAttach({
      role: 'LEADER',
      subroles: ['PRINCIPAL'],
      scope: { schoolIds: ['S1'] },
    });
    expect(filters).toHaveProperty('schoolId');
  });
});
