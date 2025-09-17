const { ensureClassInScope } = require('../server/auth/rbac');

function expectNotToThrow(fn: () => void){
  try { fn(); }
  catch(e){ throw new Error('Expected not to throw, but threw: ' + (e && (e as any).message)); }
}

function expectToThrow(fn: () => void){
  let threw = false;
  try { fn(); }
  catch(_e){ threw = true; }
  if (!threw) throw new Error('Expected to throw, but did not throw');
}

// Unit tests
console.log('rbac.spec.ts: starting');
expectNotToThrow(()=>ensureClassInScope({ id:'t1', role:'teacher', scope:{ classIds:['A'] } } as any, 'A'));
expectToThrow(()=>ensureClassInScope({ id:'t1', role:'teacher', scope:{ classIds:['A'] } } as any, 'B'));
console.log('rbac.spec.ts: passed');


