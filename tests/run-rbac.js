process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify({ module: 'commonjs' });
require('ts-node/register/transpile-only');
require('./rbac.spec.ts');





