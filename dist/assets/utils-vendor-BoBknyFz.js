function u(e, n, t) {
  function r(s, a) {
    var d;
    (Object.defineProperty(s, '_zod', { value: s._zod ?? {}, enumerable: !1 }),
      (d = s._zod).traits ?? (d.traits = new Set()),
      s._zod.traits.add(e),
      n(s, a));
    for (const f in i.prototype)
      f in s || Object.defineProperty(s, f, { value: i.prototype[f].bind(s) });
    ((s._zod.constr = i), (s._zod.def = a));
  }
  const o = t?.Parent ?? Object;
  class c extends o {}
  Object.defineProperty(c, 'name', { value: e });
  function i(s) {
    var a;
    const d = t?.Parent ? new c() : this;
    (r(d, s), (a = d._zod).deferred ?? (a.deferred = []));
    for (const f of d._zod.deferred) f();
    return d;
  }
  return (
    Object.defineProperty(i, 'init', { value: r }),
    Object.defineProperty(i, Symbol.hasInstance, {
      value: (s) =>
        t?.Parent && s instanceof t.Parent ? !0 : s?._zod?.traits?.has(e),
    }),
    Object.defineProperty(i, 'name', { value: e }),
    i
  );
}
class A extends Error {
  constructor() {
    super(
      'Encountered Promise during synchronous parse. Use .parseAsync() instead.'
    );
  }
}
class Oe extends Error {
  constructor(n) {
    (super(`Encountered unidirectional transform during encode: ${n}`),
      (this.name = 'ZodEncodeError'));
  }
}
const Pe = {};
function O(e) {
  return Pe;
}
function nn(e) {
  const n = Object.values(e).filter((r) => typeof r == 'number');
  return Object.entries(e)
    .filter(([r, o]) => n.indexOf(+r) === -1)
    .map(([r, o]) => o);
}
function X(e, n) {
  return typeof n == 'bigint' ? n.toString() : n;
}
function Q(e) {
  return {
    get value() {
      {
        const n = e();
        return (Object.defineProperty(this, 'value', { value: n }), n);
      }
    },
  };
}
function ee(e) {
  return e == null;
}
function ne(e) {
  const n = e.startsWith('^') ? 1 : 0,
    t = e.endsWith('$') ? e.length - 1 : e.length;
  return e.slice(n, t);
}
function tn(e, n) {
  const t = (e.toString().split('.')[1] || '').length,
    r = n.toString();
  let o = (r.split('.')[1] || '').length;
  if (o === 0 && /\d?e-\d?/.test(r)) {
    const a = r.match(/\d?e-(\d?)/);
    a?.[1] && (o = Number.parseInt(a[1]));
  }
  const c = t > o ? t : o,
    i = Number.parseInt(e.toFixed(c).replace('.', '')),
    s = Number.parseInt(n.toFixed(c).replace('.', ''));
  return (i % s) / 10 ** c;
}
const ue = Symbol('evaluating');
function h(e, n, t) {
  let r;
  Object.defineProperty(e, n, {
    get() {
      if (r !== ue) return (r === void 0 && ((r = ue), (r = t())), r);
    },
    set(o) {
      Object.defineProperty(e, n, { value: o });
    },
    configurable: !0,
  });
}
function rn(e) {
  return Object.create(
    Object.getPrototypeOf(e),
    Object.getOwnPropertyDescriptors(e)
  );
}
function I(e, n, t) {
  Object.defineProperty(e, n, {
    value: t,
    writable: !0,
    enumerable: !0,
    configurable: !0,
  });
}
function N(...e) {
  const n = {};
  for (const t of e) {
    const r = Object.getOwnPropertyDescriptors(t);
    Object.assign(n, r);
  }
  return Object.defineProperties({}, n);
}
function se(e) {
  return JSON.stringify(e);
}
const Te =
  'captureStackTrace' in Error ? Error.captureStackTrace : (...e) => {};
function V(e) {
  return typeof e == 'object' && e !== null && !Array.isArray(e);
}
const on = Q(() => {
  if (typeof navigator < 'u' && navigator?.userAgent?.includes('Cloudflare'))
    return !1;
  try {
    const e = Function;
    return (new e(''), !0);
  } catch {
    return !1;
  }
});
function S(e) {
  if (V(e) === !1) return !1;
  const n = e.constructor;
  if (n === void 0) return !0;
  const t = n.prototype;
  return !(
    V(t) === !1 ||
    Object.prototype.hasOwnProperty.call(t, 'isPrototypeOf') === !1
  );
}
function Ae(e) {
  return S(e) ? { ...e } : e;
}
const cn = new Set(['string', 'number', 'symbol']);
function G(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function E(e, n, t) {
  const r = new e._zod.constr(n ?? e._zod.def);
  return ((!n || t?.parent) && (r._zod.parent = e), r);
}
function l(e) {
  const n = e;
  if (!n) return {};
  if (typeof n == 'string') return { error: () => n };
  if (n?.message !== void 0) {
    if (n?.error !== void 0)
      throw new Error('Cannot specify both `message` and `error` params');
    n.error = n.message;
  }
  return (
    delete n.message,
    typeof n.error == 'string' ? { ...n, error: () => n.error } : n
  );
}
function un(e) {
  return Object.keys(e).filter(
    (n) => e[n]._zod.optin === 'optional' && e[n]._zod.optout === 'optional'
  );
}
const sn = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function an(e, n) {
  const t = e._zod.def,
    r = N(e._zod.def, {
      get shape() {
        const o = {};
        for (const c in n) {
          if (!(c in t.shape)) throw new Error(`Unrecognized key: "${c}"`);
          n[c] && (o[c] = t.shape[c]);
        }
        return (I(this, 'shape', o), o);
      },
      checks: [],
    });
  return E(e, r);
}
function ln(e, n) {
  const t = e._zod.def,
    r = N(e._zod.def, {
      get shape() {
        const o = { ...e._zod.def.shape };
        for (const c in n) {
          if (!(c in t.shape)) throw new Error(`Unrecognized key: "${c}"`);
          n[c] && delete o[c];
        }
        return (I(this, 'shape', o), o);
      },
      checks: [],
    });
  return E(e, r);
}
function dn(e, n) {
  if (!S(n))
    throw new Error('Invalid input to extend: expected a plain object');
  const t = e._zod.def.checks;
  if (t && t.length > 0)
    throw new Error(
      'Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.'
    );
  const o = N(e._zod.def, {
    get shape() {
      const c = { ...e._zod.def.shape, ...n };
      return (I(this, 'shape', c), c);
    },
    checks: [],
  });
  return E(e, o);
}
function fn(e, n) {
  if (!S(n))
    throw new Error('Invalid input to safeExtend: expected a plain object');
  const t = {
    ...e._zod.def,
    get shape() {
      const r = { ...e._zod.def.shape, ...n };
      return (I(this, 'shape', r), r);
    },
    checks: e._zod.def.checks,
  };
  return E(e, t);
}
function hn(e, n) {
  const t = N(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...n._zod.def.shape };
      return (I(this, 'shape', r), r);
    },
    get catchall() {
      return n._zod.def.catchall;
    },
    checks: [],
  });
  return E(e, t);
}
function pn(e, n, t) {
  const r = N(n._zod.def, {
    get shape() {
      const o = n._zod.def.shape,
        c = { ...o };
      if (t)
        for (const i in t) {
          if (!(i in o)) throw new Error(`Unrecognized key: "${i}"`);
          t[i] &&
            (c[i] = e ? new e({ type: 'optional', innerType: o[i] }) : o[i]);
        }
      else
        for (const i in o)
          c[i] = e ? new e({ type: 'optional', innerType: o[i] }) : o[i];
      return (I(this, 'shape', c), c);
    },
    checks: [],
  });
  return E(n, r);
}
function mn(e, n, t) {
  const r = N(n._zod.def, {
    get shape() {
      const o = n._zod.def.shape,
        c = { ...o };
      if (t)
        for (const i in t) {
          if (!(i in c)) throw new Error(`Unrecognized key: "${i}"`);
          t[i] && (c[i] = new e({ type: 'nonoptional', innerType: o[i] }));
        }
      else
        for (const i in o)
          c[i] = new e({ type: 'nonoptional', innerType: o[i] });
      return (I(this, 'shape', c), c);
    },
    checks: [],
  });
  return E(n, r);
}
function T(e, n = 0) {
  if (e.aborted === !0) return !0;
  for (let t = n; t < e.issues.length; t++)
    if (e.issues[t]?.continue !== !0) return !0;
  return !1;
}
function Ne(e, n) {
  return n.map((t) => {
    var r;
    return ((r = t).path ?? (r.path = []), t.path.unshift(e), t);
  });
}
function C(e) {
  return typeof e == 'string' ? e : e?.message;
}
function P(e, n, t) {
  const r = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const o =
      C(e.inst?._zod.def?.error?.(e)) ??
      C(n?.error?.(e)) ??
      C(t.customError?.(e)) ??
      C(t.localeError?.(e)) ??
      'Invalid input';
    r.message = o;
  }
  return (
    delete r.inst,
    delete r.continue,
    n?.reportInput || delete r.input,
    r
  );
}
function te(e) {
  return Array.isArray(e)
    ? 'array'
    : typeof e == 'string'
      ? 'string'
      : 'unknown';
}
function j(...e) {
  const [n, t, r] = e;
  return typeof n == 'string'
    ? { message: n, code: 'custom', input: t, inst: r }
    : { ...n };
}
const De = (e, n) => {
    ((e.name = '$ZodError'),
      Object.defineProperty(e, '_zod', { value: e._zod, enumerable: !1 }),
      Object.defineProperty(e, 'issues', { value: n, enumerable: !1 }),
      (e.message = JSON.stringify(n, X, 2)),
      Object.defineProperty(e, 'toString', {
        value: () => e.message,
        enumerable: !1,
      }));
  },
  Se = u('$ZodError', De),
  je = u('$ZodError', De, { Parent: Error });
function _n(e, n = (t) => t.message) {
  const t = {},
    r = [];
  for (const o of e.issues)
    o.path.length > 0
      ? ((t[o.path[0]] = t[o.path[0]] || []), t[o.path[0]].push(n(o)))
      : r.push(n(o));
  return { formErrors: r, fieldErrors: t };
}
function gn(e, n) {
  const t =
      n ||
      function (c) {
        return c.message;
      },
    r = { _errors: [] },
    o = (c) => {
      for (const i of c.issues)
        if (i.code === 'invalid_union' && i.errors.length)
          i.errors.map((s) => o({ issues: s }));
        else if (i.code === 'invalid_key') o({ issues: i.issues });
        else if (i.code === 'invalid_element') o({ issues: i.issues });
        else if (i.path.length === 0) r._errors.push(t(i));
        else {
          let s = r,
            a = 0;
          for (; a < i.path.length; ) {
            const d = i.path[a];
            (a === i.path.length - 1
              ? ((s[d] = s[d] || { _errors: [] }), s[d]._errors.push(t(i)))
              : (s[d] = s[d] || { _errors: [] }),
              (s = s[d]),
              a++);
          }
        }
    };
  return (o(e), r);
}
const re = (e) => (n, t, r, o) => {
    const c = r ? Object.assign(r, { async: !1 }) : { async: !1 },
      i = n._zod.run({ value: t, issues: [] }, c);
    if (i instanceof Promise) throw new A();
    if (i.issues.length) {
      const s = new (o?.Err ?? e)(i.issues.map((a) => P(a, c, O())));
      throw (Te(s, o?.callee), s);
    }
    return i.value;
  },
  oe = (e) => async (n, t, r, o) => {
    const c = r ? Object.assign(r, { async: !0 }) : { async: !0 };
    let i = n._zod.run({ value: t, issues: [] }, c);
    if ((i instanceof Promise && (i = await i), i.issues.length)) {
      const s = new (o?.Err ?? e)(i.issues.map((a) => P(a, c, O())));
      throw (Te(s, o?.callee), s);
    }
    return i.value;
  },
  J = (e) => (n, t, r) => {
    const o = r ? { ...r, async: !1 } : { async: !1 },
      c = n._zod.run({ value: t, issues: [] }, o);
    if (c instanceof Promise) throw new A();
    return c.issues.length
      ? { success: !1, error: new (e ?? Se)(c.issues.map((i) => P(i, o, O()))) }
      : { success: !0, data: c.value };
  },
  vn = J(je),
  K = (e) => async (n, t, r) => {
    const o = r ? Object.assign(r, { async: !0 }) : { async: !0 };
    let c = n._zod.run({ value: t, issues: [] }, o);
    return (
      c instanceof Promise && (c = await c),
      c.issues.length
        ? { success: !1, error: new e(c.issues.map((i) => P(i, o, O()))) }
        : { success: !0, data: c.value }
    );
  },
  zn = K(je),
  bn = (e) => (n, t, r) => {
    const o = r
      ? Object.assign(r, { direction: 'backward' })
      : { direction: 'backward' };
    return re(e)(n, t, o);
  },
  wn = (e) => (n, t, r) => re(e)(n, t, r),
  kn = (e) => async (n, t, r) => {
    const o = r
      ? Object.assign(r, { direction: 'backward' })
      : { direction: 'backward' };
    return oe(e)(n, t, o);
  },
  Zn = (e) => async (n, t, r) => oe(e)(n, t, r),
  $n = (e) => (n, t, r) => {
    const o = r
      ? Object.assign(r, { direction: 'backward' })
      : { direction: 'backward' };
    return J(e)(n, t, o);
  },
  yn = (e) => (n, t, r) => J(e)(n, t, r),
  In = (e) => async (n, t, r) => {
    const o = r
      ? Object.assign(r, { direction: 'backward' })
      : { direction: 'backward' };
    return K(e)(n, t, o);
  },
  En = (e) => async (n, t, r) => K(e)(n, t, r),
  On = /^[cC][^\s-]{8,}$/,
  Pn = /^[0-9a-z]+$/,
  Tn = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  An = /^[0-9a-vA-V]{20}$/,
  Nn = /^[A-Za-z0-9]{27}$/,
  Dn = /^[a-zA-Z0-9_-]{21}$/,
  Sn =
    /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  jn =
    /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  ae = (e) =>
    e
      ? new RegExp(
          `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`
        )
      : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
  xn =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
  Cn = '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$';
function Rn() {
  return new RegExp(Cn, 'u');
}
const Un =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  Fn =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/,
  Ln =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  Mn =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  Vn =
    /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  xe = /^[A-Za-z0-9_-]*$/,
  Wn =
    /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,
  Bn = /^\+(?:[0-9]){6,14}[0-9]$/,
  Ce =
    '(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))',
  Gn = new RegExp(`^${Ce}$`);
function Re(e) {
  const n = '(?:[01]\\d|2[0-3]):[0-5]\\d';
  return typeof e.precision == 'number'
    ? e.precision === -1
      ? `${n}`
      : e.precision === 0
        ? `${n}:[0-5]\\d`
        : `${n}:[0-5]\\d\\.\\d{${e.precision}}`
    : `${n}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Jn(e) {
  return new RegExp(`^${Re(e)}$`);
}
function Kn(e) {
  const n = Re({ precision: e.precision }),
    t = ['Z'];
  (e.local && t.push(''),
    e.offset && t.push('([+-](?:[01]\\d|2[0-3]):[0-5]\\d)'));
  const r = `${n}(?:${t.join('|')})`;
  return new RegExp(`^${Ce}T(?:${r})$`);
}
const Yn = (e) => {
    const n = e
      ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ''}}`
      : '[\\s\\S]*';
    return new RegExp(`^${n}$`);
  },
  Xn = /^\d+$/,
  qn = /^-?\d+(?:\.\d+)?/i,
  Hn = /^[^A-Z]*$/,
  Qn = /^[^a-z]*$/,
  w = u('$ZodCheck', (e, n) => {
    var t;
    (e._zod ?? (e._zod = {}),
      (e._zod.def = n),
      (t = e._zod).onattach ?? (t.onattach = []));
  }),
  Ue = { number: 'number', bigint: 'bigint', object: 'date' },
  Fe = u('$ZodCheckLessThan', (e, n) => {
    w.init(e, n);
    const t = Ue[typeof n.value];
    (e._zod.onattach.push((r) => {
      const o = r._zod.bag,
        c =
          (n.inclusive ? o.maximum : o.exclusiveMaximum) ??
          Number.POSITIVE_INFINITY;
      n.value < c &&
        (n.inclusive ? (o.maximum = n.value) : (o.exclusiveMaximum = n.value));
    }),
      (e._zod.check = (r) => {
        (n.inclusive ? r.value <= n.value : r.value < n.value) ||
          r.issues.push({
            origin: t,
            code: 'too_big',
            maximum: n.value,
            input: r.value,
            inclusive: n.inclusive,
            inst: e,
            continue: !n.abort,
          });
      }));
  }),
  Le = u('$ZodCheckGreaterThan', (e, n) => {
    w.init(e, n);
    const t = Ue[typeof n.value];
    (e._zod.onattach.push((r) => {
      const o = r._zod.bag,
        c =
          (n.inclusive ? o.minimum : o.exclusiveMinimum) ??
          Number.NEGATIVE_INFINITY;
      n.value > c &&
        (n.inclusive ? (o.minimum = n.value) : (o.exclusiveMinimum = n.value));
    }),
      (e._zod.check = (r) => {
        (n.inclusive ? r.value >= n.value : r.value > n.value) ||
          r.issues.push({
            origin: t,
            code: 'too_small',
            minimum: n.value,
            input: r.value,
            inclusive: n.inclusive,
            inst: e,
            continue: !n.abort,
          });
      }));
  }),
  et = u('$ZodCheckMultipleOf', (e, n) => {
    (w.init(e, n),
      e._zod.onattach.push((t) => {
        var r;
        (r = t._zod.bag).multipleOf ?? (r.multipleOf = n.value);
      }),
      (e._zod.check = (t) => {
        if (typeof t.value != typeof n.value)
          throw new Error('Cannot mix number and bigint in multiple_of check.');
        (typeof t.value == 'bigint'
          ? t.value % n.value === BigInt(0)
          : tn(t.value, n.value) === 0) ||
          t.issues.push({
            origin: typeof t.value,
            code: 'not_multiple_of',
            divisor: n.value,
            input: t.value,
            inst: e,
            continue: !n.abort,
          });
      }));
  }),
  nt = u('$ZodCheckNumberFormat', (e, n) => {
    (w.init(e, n), (n.format = n.format || 'float64'));
    const t = n.format?.includes('int'),
      r = t ? 'int' : 'number',
      [o, c] = sn[n.format];
    (e._zod.onattach.push((i) => {
      const s = i._zod.bag;
      ((s.format = n.format),
        (s.minimum = o),
        (s.maximum = c),
        t && (s.pattern = Xn));
    }),
      (e._zod.check = (i) => {
        const s = i.value;
        if (t) {
          if (!Number.isInteger(s)) {
            i.issues.push({
              expected: r,
              format: n.format,
              code: 'invalid_type',
              continue: !1,
              input: s,
              inst: e,
            });
            return;
          }
          if (!Number.isSafeInteger(s)) {
            s > 0
              ? i.issues.push({
                  input: s,
                  code: 'too_big',
                  maximum: Number.MAX_SAFE_INTEGER,
                  note: 'Integers must be within the safe integer range.',
                  inst: e,
                  origin: r,
                  continue: !n.abort,
                })
              : i.issues.push({
                  input: s,
                  code: 'too_small',
                  minimum: Number.MIN_SAFE_INTEGER,
                  note: 'Integers must be within the safe integer range.',
                  inst: e,
                  origin: r,
                  continue: !n.abort,
                });
            return;
          }
        }
        (s < o &&
          i.issues.push({
            origin: 'number',
            input: s,
            code: 'too_small',
            minimum: o,
            inclusive: !0,
            inst: e,
            continue: !n.abort,
          }),
          s > c &&
            i.issues.push({
              origin: 'number',
              input: s,
              code: 'too_big',
              maximum: c,
              inst: e,
            }));
      }));
  }),
  tt = u('$ZodCheckMaxLength', (e, n) => {
    var t;
    (w.init(e, n),
      (t = e._zod.def).when ??
        (t.when = (r) => {
          const o = r.value;
          return !ee(o) && o.length !== void 0;
        }),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        n.maximum < o && (r._zod.bag.maximum = n.maximum);
      }),
      (e._zod.check = (r) => {
        const o = r.value;
        if (o.length <= n.maximum) return;
        const i = te(o);
        r.issues.push({
          origin: i,
          code: 'too_big',
          maximum: n.maximum,
          inclusive: !0,
          input: o,
          inst: e,
          continue: !n.abort,
        });
      }));
  }),
  rt = u('$ZodCheckMinLength', (e, n) => {
    var t;
    (w.init(e, n),
      (t = e._zod.def).when ??
        (t.when = (r) => {
          const o = r.value;
          return !ee(o) && o.length !== void 0;
        }),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        n.minimum > o && (r._zod.bag.minimum = n.minimum);
      }),
      (e._zod.check = (r) => {
        const o = r.value;
        if (o.length >= n.minimum) return;
        const i = te(o);
        r.issues.push({
          origin: i,
          code: 'too_small',
          minimum: n.minimum,
          inclusive: !0,
          input: o,
          inst: e,
          continue: !n.abort,
        });
      }));
  }),
  ot = u('$ZodCheckLengthEquals', (e, n) => {
    var t;
    (w.init(e, n),
      (t = e._zod.def).when ??
        (t.when = (r) => {
          const o = r.value;
          return !ee(o) && o.length !== void 0;
        }),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag;
        ((o.minimum = n.length), (o.maximum = n.length), (o.length = n.length));
      }),
      (e._zod.check = (r) => {
        const o = r.value,
          c = o.length;
        if (c === n.length) return;
        const i = te(o),
          s = c > n.length;
        r.issues.push({
          origin: i,
          ...(s
            ? { code: 'too_big', maximum: n.length }
            : { code: 'too_small', minimum: n.length }),
          inclusive: !0,
          exact: !0,
          input: r.value,
          inst: e,
          continue: !n.abort,
        });
      }));
  }),
  Y = u('$ZodCheckStringFormat', (e, n) => {
    var t, r;
    (w.init(e, n),
      e._zod.onattach.push((o) => {
        const c = o._zod.bag;
        ((c.format = n.format),
          n.pattern &&
            (c.patterns ?? (c.patterns = new Set()),
            c.patterns.add(n.pattern)));
      }),
      n.pattern
        ? ((t = e._zod).check ??
          (t.check = (o) => {
            ((n.pattern.lastIndex = 0),
              !n.pattern.test(o.value) &&
                o.issues.push({
                  origin: 'string',
                  code: 'invalid_format',
                  format: n.format,
                  input: o.value,
                  ...(n.pattern ? { pattern: n.pattern.toString() } : {}),
                  inst: e,
                  continue: !n.abort,
                }));
          }))
        : ((r = e._zod).check ?? (r.check = () => {})));
  }),
  it = u('$ZodCheckRegex', (e, n) => {
    (Y.init(e, n),
      (e._zod.check = (t) => {
        ((n.pattern.lastIndex = 0),
          !n.pattern.test(t.value) &&
            t.issues.push({
              origin: 'string',
              code: 'invalid_format',
              format: 'regex',
              input: t.value,
              pattern: n.pattern.toString(),
              inst: e,
              continue: !n.abort,
            }));
      }));
  }),
  ct = u('$ZodCheckLowerCase', (e, n) => {
    (n.pattern ?? (n.pattern = Hn), Y.init(e, n));
  }),
  ut = u('$ZodCheckUpperCase', (e, n) => {
    (n.pattern ?? (n.pattern = Qn), Y.init(e, n));
  }),
  st = u('$ZodCheckIncludes', (e, n) => {
    w.init(e, n);
    const t = G(n.includes),
      r = new RegExp(
        typeof n.position == 'number' ? `^.{${n.position}}${t}` : t
      );
    ((n.pattern = r),
      e._zod.onattach.push((o) => {
        const c = o._zod.bag;
        (c.patterns ?? (c.patterns = new Set()), c.patterns.add(r));
      }),
      (e._zod.check = (o) => {
        o.value.includes(n.includes, n.position) ||
          o.issues.push({
            origin: 'string',
            code: 'invalid_format',
            format: 'includes',
            includes: n.includes,
            input: o.value,
            inst: e,
            continue: !n.abort,
          });
      }));
  }),
  at = u('$ZodCheckStartsWith', (e, n) => {
    w.init(e, n);
    const t = new RegExp(`^${G(n.prefix)}.*`);
    (n.pattern ?? (n.pattern = t),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag;
        (o.patterns ?? (o.patterns = new Set()), o.patterns.add(t));
      }),
      (e._zod.check = (r) => {
        r.value.startsWith(n.prefix) ||
          r.issues.push({
            origin: 'string',
            code: 'invalid_format',
            format: 'starts_with',
            prefix: n.prefix,
            input: r.value,
            inst: e,
            continue: !n.abort,
          });
      }));
  }),
  lt = u('$ZodCheckEndsWith', (e, n) => {
    w.init(e, n);
    const t = new RegExp(`.*${G(n.suffix)}$`);
    (n.pattern ?? (n.pattern = t),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag;
        (o.patterns ?? (o.patterns = new Set()), o.patterns.add(t));
      }),
      (e._zod.check = (r) => {
        r.value.endsWith(n.suffix) ||
          r.issues.push({
            origin: 'string',
            code: 'invalid_format',
            format: 'ends_with',
            suffix: n.suffix,
            input: r.value,
            inst: e,
            continue: !n.abort,
          });
      }));
  }),
  dt = u('$ZodCheckOverwrite', (e, n) => {
    (w.init(e, n),
      (e._zod.check = (t) => {
        t.value = n.tx(t.value);
      }));
  });
class ft {
  constructor(n = []) {
    ((this.content = []), (this.indent = 0), this && (this.args = n));
  }
  indented(n) {
    ((this.indent += 1), n(this), (this.indent -= 1));
  }
  write(n) {
    if (typeof n == 'function') {
      (n(this, { execution: 'sync' }), n(this, { execution: 'async' }));
      return;
    }
    const r = n
        .split(
          `
`
        )
        .filter((i) => i),
      o = Math.min(...r.map((i) => i.length - i.trimStart().length)),
      c = r.map((i) => i.slice(o)).map((i) => ' '.repeat(this.indent * 2) + i);
    for (const i of c) this.content.push(i);
  }
  compile() {
    const n = Function,
      t = this?.args,
      o = [...(this?.content ?? ['']).map((c) => `  ${c}`)];
    return new n(
      ...t,
      o.join(`
`)
    );
  }
}
const ht = { major: 4, minor: 1, patch: 5 },
  g = u('$ZodType', (e, n) => {
    var t;
    (e ?? (e = {}),
      (e._zod.def = n),
      (e._zod.bag = e._zod.bag || {}),
      (e._zod.version = ht));
    const r = [...(e._zod.def.checks ?? [])];
    e._zod.traits.has('$ZodCheck') && r.unshift(e);
    for (const o of r) for (const c of o._zod.onattach) c(e);
    if (r.length === 0)
      ((t = e._zod).deferred ?? (t.deferred = []),
        e._zod.deferred?.push(() => {
          e._zod.run = e._zod.parse;
        }));
    else {
      const o = (i, s, a) => {
          let d = T(i),
            f;
          for (const b of s) {
            if (b._zod.def.when) {
              if (!b._zod.def.when(i)) continue;
            } else if (d) continue;
            const z = i.issues.length,
              _ = b._zod.check(i);
            if (_ instanceof Promise && a?.async === !1) throw new A();
            if (f || _ instanceof Promise)
              f = (f ?? Promise.resolve()).then(async () => {
                (await _, i.issues.length !== z && (d || (d = T(i, z))));
              });
            else {
              if (i.issues.length === z) continue;
              d || (d = T(i, z));
            }
          }
          return f ? f.then(() => i) : i;
        },
        c = (i, s, a) => {
          if (T(i)) return ((i.aborted = !0), i);
          const d = o(s, r, a);
          if (d instanceof Promise) {
            if (a.async === !1) throw new A();
            return d.then((f) => e._zod.parse(f, a));
          }
          return e._zod.parse(d, a);
        };
      e._zod.run = (i, s) => {
        if (s.skipChecks) return e._zod.parse(i, s);
        if (s.direction === 'backward') {
          const d = e._zod.parse(
            { value: i.value, issues: [] },
            { ...s, skipChecks: !0 }
          );
          return d instanceof Promise ? d.then((f) => c(f, i, s)) : c(d, i, s);
        }
        const a = e._zod.parse(i, s);
        if (a instanceof Promise) {
          if (s.async === !1) throw new A();
          return a.then((d) => o(d, r, s));
        }
        return o(a, r, s);
      };
    }
    e['~standard'] = {
      validate: (o) => {
        try {
          const c = vn(e, o);
          return c.success ? { value: c.data } : { issues: c.error?.issues };
        } catch {
          return zn(e, o).then((i) =>
            i.success ? { value: i.data } : { issues: i.error?.issues }
          );
        }
      },
      vendor: 'zod',
      version: 1,
    };
  }),
  ie = u('$ZodString', (e, n) => {
    (g.init(e, n),
      (e._zod.pattern =
        [...(e?._zod.bag?.patterns ?? [])].pop() ?? Yn(e._zod.bag)),
      (e._zod.parse = (t, r) => {
        if (n.coerce)
          try {
            t.value = String(t.value);
          } catch {}
        return (
          typeof t.value == 'string' ||
            t.issues.push({
              expected: 'string',
              code: 'invalid_type',
              input: t.value,
              inst: e,
            }),
          t
        );
      }));
  }),
  p = u('$ZodStringFormat', (e, n) => {
    (Y.init(e, n), ie.init(e, n));
  }),
  pt = u('$ZodGUID', (e, n) => {
    (n.pattern ?? (n.pattern = jn), p.init(e, n));
  }),
  mt = u('$ZodUUID', (e, n) => {
    if (n.version) {
      const r = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[
        n.version
      ];
      if (r === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
      n.pattern ?? (n.pattern = ae(r));
    } else n.pattern ?? (n.pattern = ae());
    p.init(e, n);
  }),
  _t = u('$ZodEmail', (e, n) => {
    (n.pattern ?? (n.pattern = xn), p.init(e, n));
  }),
  gt = u('$ZodURL', (e, n) => {
    (p.init(e, n),
      (e._zod.check = (t) => {
        try {
          const r = t.value.trim(),
            o = new URL(r);
          (n.hostname &&
            ((n.hostname.lastIndex = 0),
            n.hostname.test(o.hostname) ||
              t.issues.push({
                code: 'invalid_format',
                format: 'url',
                note: 'Invalid hostname',
                pattern: Wn.source,
                input: t.value,
                inst: e,
                continue: !n.abort,
              })),
            n.protocol &&
              ((n.protocol.lastIndex = 0),
              n.protocol.test(
                o.protocol.endsWith(':') ? o.protocol.slice(0, -1) : o.protocol
              ) ||
                t.issues.push({
                  code: 'invalid_format',
                  format: 'url',
                  note: 'Invalid protocol',
                  pattern: n.protocol.source,
                  input: t.value,
                  inst: e,
                  continue: !n.abort,
                })),
            n.normalize ? (t.value = o.href) : (t.value = r));
          return;
        } catch {
          t.issues.push({
            code: 'invalid_format',
            format: 'url',
            input: t.value,
            inst: e,
            continue: !n.abort,
          });
        }
      }));
  }),
  vt = u('$ZodEmoji', (e, n) => {
    (n.pattern ?? (n.pattern = Rn()), p.init(e, n));
  }),
  zt = u('$ZodNanoID', (e, n) => {
    (n.pattern ?? (n.pattern = Dn), p.init(e, n));
  }),
  bt = u('$ZodCUID', (e, n) => {
    (n.pattern ?? (n.pattern = On), p.init(e, n));
  }),
  wt = u('$ZodCUID2', (e, n) => {
    (n.pattern ?? (n.pattern = Pn), p.init(e, n));
  }),
  kt = u('$ZodULID', (e, n) => {
    (n.pattern ?? (n.pattern = Tn), p.init(e, n));
  }),
  Zt = u('$ZodXID', (e, n) => {
    (n.pattern ?? (n.pattern = An), p.init(e, n));
  }),
  $t = u('$ZodKSUID', (e, n) => {
    (n.pattern ?? (n.pattern = Nn), p.init(e, n));
  }),
  yt = u('$ZodISODateTime', (e, n) => {
    (n.pattern ?? (n.pattern = Kn(n)), p.init(e, n));
  }),
  It = u('$ZodISODate', (e, n) => {
    (n.pattern ?? (n.pattern = Gn), p.init(e, n));
  }),
  Et = u('$ZodISOTime', (e, n) => {
    (n.pattern ?? (n.pattern = Jn(n)), p.init(e, n));
  }),
  Ot = u('$ZodISODuration', (e, n) => {
    (n.pattern ?? (n.pattern = Sn), p.init(e, n));
  }),
  Pt = u('$ZodIPv4', (e, n) => {
    (n.pattern ?? (n.pattern = Un),
      p.init(e, n),
      e._zod.onattach.push((t) => {
        const r = t._zod.bag;
        r.format = 'ipv4';
      }));
  }),
  Tt = u('$ZodIPv6', (e, n) => {
    (n.pattern ?? (n.pattern = Fn),
      p.init(e, n),
      e._zod.onattach.push((t) => {
        const r = t._zod.bag;
        r.format = 'ipv6';
      }),
      (e._zod.check = (t) => {
        try {
          new URL(`http://[${t.value}]`);
        } catch {
          t.issues.push({
            code: 'invalid_format',
            format: 'ipv6',
            input: t.value,
            inst: e,
            continue: !n.abort,
          });
        }
      }));
  }),
  At = u('$ZodCIDRv4', (e, n) => {
    (n.pattern ?? (n.pattern = Ln), p.init(e, n));
  }),
  Nt = u('$ZodCIDRv6', (e, n) => {
    (n.pattern ?? (n.pattern = Mn),
      p.init(e, n),
      (e._zod.check = (t) => {
        const [r, o] = t.value.split('/');
        try {
          if (!o) throw new Error();
          const c = Number(o);
          if (`${c}` !== o) throw new Error();
          if (c < 0 || c > 128) throw new Error();
          new URL(`http://[${r}]`);
        } catch {
          t.issues.push({
            code: 'invalid_format',
            format: 'cidrv6',
            input: t.value,
            inst: e,
            continue: !n.abort,
          });
        }
      }));
  });
function Me(e) {
  if (e === '') return !0;
  if (e.length % 4 !== 0) return !1;
  try {
    return (atob(e), !0);
  } catch {
    return !1;
  }
}
const Dt = u('$ZodBase64', (e, n) => {
  (n.pattern ?? (n.pattern = Vn),
    p.init(e, n),
    e._zod.onattach.push((t) => {
      t._zod.bag.contentEncoding = 'base64';
    }),
    (e._zod.check = (t) => {
      Me(t.value) ||
        t.issues.push({
          code: 'invalid_format',
          format: 'base64',
          input: t.value,
          inst: e,
          continue: !n.abort,
        });
    }));
});
function St(e) {
  if (!xe.test(e)) return !1;
  const n = e.replace(/[-_]/g, (r) => (r === '-' ? '+' : '/')),
    t = n.padEnd(Math.ceil(n.length / 4) * 4, '=');
  return Me(t);
}
const jt = u('$ZodBase64URL', (e, n) => {
    (n.pattern ?? (n.pattern = xe),
      p.init(e, n),
      e._zod.onattach.push((t) => {
        t._zod.bag.contentEncoding = 'base64url';
      }),
      (e._zod.check = (t) => {
        St(t.value) ||
          t.issues.push({
            code: 'invalid_format',
            format: 'base64url',
            input: t.value,
            inst: e,
            continue: !n.abort,
          });
      }));
  }),
  xt = u('$ZodE164', (e, n) => {
    (n.pattern ?? (n.pattern = Bn), p.init(e, n));
  });
function Ct(e, n = null) {
  try {
    const t = e.split('.');
    if (t.length !== 3) return !1;
    const [r] = t;
    if (!r) return !1;
    const o = JSON.parse(atob(r));
    return !(
      ('typ' in o && o?.typ !== 'JWT') ||
      !o.alg ||
      (n && (!('alg' in o) || o.alg !== n))
    );
  } catch {
    return !1;
  }
}
const Rt = u('$ZodJWT', (e, n) => {
    (p.init(e, n),
      (e._zod.check = (t) => {
        Ct(t.value, n.alg) ||
          t.issues.push({
            code: 'invalid_format',
            format: 'jwt',
            input: t.value,
            inst: e,
            continue: !n.abort,
          });
      }));
  }),
  Ve = u('$ZodNumber', (e, n) => {
    (g.init(e, n),
      (e._zod.pattern = e._zod.bag.pattern ?? qn),
      (e._zod.parse = (t, r) => {
        if (n.coerce)
          try {
            t.value = Number(t.value);
          } catch {}
        const o = t.value;
        if (typeof o == 'number' && !Number.isNaN(o) && Number.isFinite(o))
          return t;
        const c =
          typeof o == 'number'
            ? Number.isNaN(o)
              ? 'NaN'
              : Number.isFinite(o)
                ? void 0
                : 'Infinity'
            : void 0;
        return (
          t.issues.push({
            expected: 'number',
            code: 'invalid_type',
            input: o,
            inst: e,
            ...(c ? { received: c } : {}),
          }),
          t
        );
      }));
  }),
  Ut = u('$ZodNumber', (e, n) => {
    (nt.init(e, n), Ve.init(e, n));
  }),
  Ft = u('$ZodUnknown', (e, n) => {
    (g.init(e, n), (e._zod.parse = (t) => t));
  }),
  Lt = u('$ZodNever', (e, n) => {
    (g.init(e, n),
      (e._zod.parse = (t, r) => (
        t.issues.push({
          expected: 'never',
          code: 'invalid_type',
          input: t.value,
          inst: e,
        }),
        t
      )));
  }),
  Mt = u('$ZodDate', (e, n) => {
    (g.init(e, n),
      (e._zod.parse = (t, r) => {
        if (n.coerce)
          try {
            t.value = new Date(t.value);
          } catch {}
        const o = t.value,
          c = o instanceof Date;
        return (
          (c && !Number.isNaN(o.getTime())) ||
            t.issues.push({
              expected: 'date',
              code: 'invalid_type',
              input: o,
              ...(c ? { received: 'Invalid Date' } : {}),
              inst: e,
            }),
          t
        );
      }));
  });
function le(e, n, t) {
  (e.issues.length && n.issues.push(...Ne(t, e.issues)),
    (n.value[t] = e.value));
}
const Vt = u('$ZodArray', (e, n) => {
  (g.init(e, n),
    (e._zod.parse = (t, r) => {
      const o = t.value;
      if (!Array.isArray(o))
        return (
          t.issues.push({
            expected: 'array',
            code: 'invalid_type',
            input: o,
            inst: e,
          }),
          t
        );
      t.value = Array(o.length);
      const c = [];
      for (let i = 0; i < o.length; i++) {
        const s = o[i],
          a = n.element._zod.run({ value: s, issues: [] }, r);
        a instanceof Promise ? c.push(a.then((d) => le(d, t, i))) : le(a, t, i);
      }
      return c.length ? Promise.all(c).then(() => t) : t;
    }));
});
function W(e, n, t, r) {
  (e.issues.length && n.issues.push(...Ne(t, e.issues)),
    e.value === void 0
      ? t in r && (n.value[t] = void 0)
      : (n.value[t] = e.value));
}
function We(e) {
  const n = Object.keys(e.shape);
  for (const r of n)
    if (!e.shape[r]._zod.traits.has('$ZodType'))
      throw new Error(`Invalid element at key "${r}": expected a Zod schema`);
  const t = un(e.shape);
  return {
    ...e,
    keys: n,
    keySet: new Set(n),
    numKeys: n.length,
    optionalKeys: new Set(t),
  };
}
function Be(e, n, t, r, o, c) {
  const i = [],
    s = o.keySet,
    a = o.catchall._zod,
    d = a.def.type;
  for (const f of Object.keys(n)) {
    if (s.has(f)) continue;
    if (d === 'never') {
      i.push(f);
      continue;
    }
    const b = a.run({ value: n[f], issues: [] }, r);
    b instanceof Promise ? e.push(b.then((z) => W(z, t, f, n))) : W(b, t, f, n);
  }
  return (
    i.length &&
      t.issues.push({ code: 'unrecognized_keys', keys: i, input: n, inst: c }),
    e.length ? Promise.all(e).then(() => t) : t
  );
}
const Wt = u('$ZodObject', (e, n) => {
    g.init(e, n);
    const t = Q(() => We(n));
    h(e._zod, 'propValues', () => {
      const i = n.shape,
        s = {};
      for (const a in i) {
        const d = i[a]._zod;
        if (d.values) {
          s[a] ?? (s[a] = new Set());
          for (const f of d.values) s[a].add(f);
        }
      }
      return s;
    });
    const r = V,
      o = n.catchall;
    let c;
    e._zod.parse = (i, s) => {
      c ?? (c = t.value);
      const a = i.value;
      if (!r(a))
        return (
          i.issues.push({
            expected: 'object',
            code: 'invalid_type',
            input: a,
            inst: e,
          }),
          i
        );
      i.value = {};
      const d = [],
        f = c.shape;
      for (const b of c.keys) {
        const _ = f[b]._zod.run({ value: a[b], issues: [] }, s);
        _ instanceof Promise
          ? d.push(_.then((Z) => W(Z, i, b, a)))
          : W(_, i, b, a);
      }
      return o
        ? Be(d, a, i, s, t.value, e)
        : d.length
          ? Promise.all(d).then(() => i)
          : i;
    };
  }),
  Bt = u('$ZodObjectJIT', (e, n) => {
    Wt.init(e, n);
    const t = e._zod.parse,
      r = Q(() => We(n)),
      o = (z) => {
        const _ = new ft(['shape', 'payload', 'ctx']),
          Z = r.value,
          He = (y) => {
            const $ = se(y);
            return `shape[${$}]._zod.run({ value: input[${$}], issues: [] }, ctx)`;
          };
        _.write('const input = payload.value;');
        const ce = Object.create(null);
        let Qe = 0;
        for (const y of Z.keys) ce[y] = `key_${Qe++}`;
        _.write('const newResult = {}');
        for (const y of Z.keys) {
          const $ = ce[y],
            D = se(y);
          (_.write(`const ${$} = ${He(y)};`),
            _.write(`
        if (${$}.issues.length) {
          payload.issues = payload.issues.concat(${$}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${D}, ...iss.path] : [${D}]
          })));
        }
        
        if (${$}.value === undefined) {
          if (${D} in input) {
            newResult[${D}] = undefined;
          }
        } else {
          newResult[${D}] = ${$}.value;
        }
      `));
        }
        (_.write('payload.value = newResult;'), _.write('return payload;'));
        const en = _.compile();
        return (y, $) => en(z, y, $);
      };
    let c;
    const i = V,
      s = !Pe.jitless,
      d = s && on.value,
      f = n.catchall;
    let b;
    e._zod.parse = (z, _) => {
      b ?? (b = r.value);
      const Z = z.value;
      return i(Z)
        ? s && d && _?.async === !1 && _.jitless !== !0
          ? (c || (c = o(n.shape)),
            (z = c(z, _)),
            f ? Be([], Z, z, _, b, e) : z)
          : t(z, _)
        : (z.issues.push({
            expected: 'object',
            code: 'invalid_type',
            input: Z,
            inst: e,
          }),
          z);
    };
  });
function de(e, n, t, r) {
  for (const c of e) if (c.issues.length === 0) return ((n.value = c.value), n);
  const o = e.filter((c) => !T(c));
  return o.length === 1
    ? ((n.value = o[0].value), o[0])
    : (n.issues.push({
        code: 'invalid_union',
        input: n.value,
        inst: t,
        errors: e.map((c) => c.issues.map((i) => P(i, r, O()))),
      }),
      n);
}
const Gt = u('$ZodUnion', (e, n) => {
    (g.init(e, n),
      h(e._zod, 'optin', () =>
        n.options.some((o) => o._zod.optin === 'optional') ? 'optional' : void 0
      ),
      h(e._zod, 'optout', () =>
        n.options.some((o) => o._zod.optout === 'optional')
          ? 'optional'
          : void 0
      ),
      h(e._zod, 'values', () => {
        if (n.options.every((o) => o._zod.values))
          return new Set(n.options.flatMap((o) => Array.from(o._zod.values)));
      }),
      h(e._zod, 'pattern', () => {
        if (n.options.every((o) => o._zod.pattern)) {
          const o = n.options.map((c) => c._zod.pattern);
          return new RegExp(`^(${o.map((c) => ne(c.source)).join('|')})$`);
        }
      }));
    const t = n.options.length === 1,
      r = n.options[0]._zod.run;
    e._zod.parse = (o, c) => {
      if (t) return r(o, c);
      let i = !1;
      const s = [];
      for (const a of n.options) {
        const d = a._zod.run({ value: o.value, issues: [] }, c);
        if (d instanceof Promise) (s.push(d), (i = !0));
        else {
          if (d.issues.length === 0) return d;
          s.push(d);
        }
      }
      return i ? Promise.all(s).then((a) => de(a, o, e, c)) : de(s, o, e, c);
    };
  }),
  Jt = u('$ZodIntersection', (e, n) => {
    (g.init(e, n),
      (e._zod.parse = (t, r) => {
        const o = t.value,
          c = n.left._zod.run({ value: o, issues: [] }, r),
          i = n.right._zod.run({ value: o, issues: [] }, r);
        return c instanceof Promise || i instanceof Promise
          ? Promise.all([c, i]).then(([a, d]) => fe(t, a, d))
          : fe(t, c, i);
      }));
  });
function q(e, n) {
  if (e === n) return { valid: !0, data: e };
  if (e instanceof Date && n instanceof Date && +e == +n)
    return { valid: !0, data: e };
  if (S(e) && S(n)) {
    const t = Object.keys(n),
      r = Object.keys(e).filter((c) => t.indexOf(c) !== -1),
      o = { ...e, ...n };
    for (const c of r) {
      const i = q(e[c], n[c]);
      if (!i.valid)
        return { valid: !1, mergeErrorPath: [c, ...i.mergeErrorPath] };
      o[c] = i.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(e) && Array.isArray(n)) {
    if (e.length !== n.length) return { valid: !1, mergeErrorPath: [] };
    const t = [];
    for (let r = 0; r < e.length; r++) {
      const o = e[r],
        c = n[r],
        i = q(o, c);
      if (!i.valid)
        return { valid: !1, mergeErrorPath: [r, ...i.mergeErrorPath] };
      t.push(i.data);
    }
    return { valid: !0, data: t };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function fe(e, n, t) {
  if (
    (n.issues.length && e.issues.push(...n.issues),
    t.issues.length && e.issues.push(...t.issues),
    T(e))
  )
    return e;
  const r = q(n.value, t.value);
  if (!r.valid)
    throw new Error(
      `Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`
    );
  return ((e.value = r.data), e);
}
const Kt = u('$ZodEnum', (e, n) => {
    g.init(e, n);
    const t = nn(n.entries),
      r = new Set(t);
    ((e._zod.values = r),
      (e._zod.pattern = new RegExp(
        `^(${t
          .filter((o) => cn.has(typeof o))
          .map((o) => (typeof o == 'string' ? G(o) : o.toString()))
          .join('|')})$`
      )),
      (e._zod.parse = (o, c) => {
        const i = o.value;
        return (
          r.has(i) ||
            o.issues.push({
              code: 'invalid_value',
              values: t,
              input: i,
              inst: e,
            }),
          o
        );
      }));
  }),
  Yt = u('$ZodTransform', (e, n) => {
    (g.init(e, n),
      (e._zod.parse = (t, r) => {
        if (r.direction === 'backward') throw new Oe(e.constructor.name);
        const o = n.transform(t.value, t);
        if (r.async)
          return (o instanceof Promise ? o : Promise.resolve(o)).then(
            (i) => ((t.value = i), t)
          );
        if (o instanceof Promise) throw new A();
        return ((t.value = o), t);
      }));
  });
function he(e, n) {
  return e.issues.length && n === void 0 ? { issues: [], value: void 0 } : e;
}
const Xt = u('$ZodOptional', (e, n) => {
    (g.init(e, n),
      (e._zod.optin = 'optional'),
      (e._zod.optout = 'optional'),
      h(e._zod, 'values', () =>
        n.innerType._zod.values
          ? new Set([...n.innerType._zod.values, void 0])
          : void 0
      ),
      h(e._zod, 'pattern', () => {
        const t = n.innerType._zod.pattern;
        return t ? new RegExp(`^(${ne(t.source)})?$`) : void 0;
      }),
      (e._zod.parse = (t, r) => {
        if (n.innerType._zod.optin === 'optional') {
          const o = n.innerType._zod.run(t, r);
          return o instanceof Promise
            ? o.then((c) => he(c, t.value))
            : he(o, t.value);
        }
        return t.value === void 0 ? t : n.innerType._zod.run(t, r);
      }));
  }),
  qt = u('$ZodNullable', (e, n) => {
    (g.init(e, n),
      h(e._zod, 'optin', () => n.innerType._zod.optin),
      h(e._zod, 'optout', () => n.innerType._zod.optout),
      h(e._zod, 'pattern', () => {
        const t = n.innerType._zod.pattern;
        return t ? new RegExp(`^(${ne(t.source)}|null)$`) : void 0;
      }),
      h(e._zod, 'values', () =>
        n.innerType._zod.values
          ? new Set([...n.innerType._zod.values, null])
          : void 0
      ),
      (e._zod.parse = (t, r) =>
        t.value === null ? t : n.innerType._zod.run(t, r)));
  }),
  Ht = u('$ZodDefault', (e, n) => {
    (g.init(e, n),
      (e._zod.optin = 'optional'),
      h(e._zod, 'values', () => n.innerType._zod.values),
      (e._zod.parse = (t, r) => {
        if (r.direction === 'backward') return n.innerType._zod.run(t, r);
        if (t.value === void 0) return ((t.value = n.defaultValue), t);
        const o = n.innerType._zod.run(t, r);
        return o instanceof Promise ? o.then((c) => pe(c, n)) : pe(o, n);
      }));
  });
function pe(e, n) {
  return (e.value === void 0 && (e.value = n.defaultValue), e);
}
const Qt = u('$ZodPrefault', (e, n) => {
    (g.init(e, n),
      (e._zod.optin = 'optional'),
      h(e._zod, 'values', () => n.innerType._zod.values),
      (e._zod.parse = (t, r) => (
        r.direction === 'backward' ||
          (t.value === void 0 && (t.value = n.defaultValue)),
        n.innerType._zod.run(t, r)
      )));
  }),
  er = u('$ZodNonOptional', (e, n) => {
    (g.init(e, n),
      h(e._zod, 'values', () => {
        const t = n.innerType._zod.values;
        return t ? new Set([...t].filter((r) => r !== void 0)) : void 0;
      }),
      (e._zod.parse = (t, r) => {
        const o = n.innerType._zod.run(t, r);
        return o instanceof Promise ? o.then((c) => me(c, e)) : me(o, e);
      }));
  });
function me(e, n) {
  return (
    !e.issues.length &&
      e.value === void 0 &&
      e.issues.push({
        code: 'invalid_type',
        expected: 'nonoptional',
        input: e.value,
        inst: n,
      }),
    e
  );
}
const nr = u('$ZodCatch', (e, n) => {
    (g.init(e, n),
      h(e._zod, 'optin', () => n.innerType._zod.optin),
      h(e._zod, 'optout', () => n.innerType._zod.optout),
      h(e._zod, 'values', () => n.innerType._zod.values),
      (e._zod.parse = (t, r) => {
        if (r.direction === 'backward') return n.innerType._zod.run(t, r);
        const o = n.innerType._zod.run(t, r);
        return o instanceof Promise
          ? o.then(
              (c) => (
                (t.value = c.value),
                c.issues.length &&
                  ((t.value = n.catchValue({
                    ...t,
                    error: { issues: c.issues.map((i) => P(i, r, O())) },
                    input: t.value,
                  })),
                  (t.issues = [])),
                t
              )
            )
          : ((t.value = o.value),
            o.issues.length &&
              ((t.value = n.catchValue({
                ...t,
                error: { issues: o.issues.map((c) => P(c, r, O())) },
                input: t.value,
              })),
              (t.issues = [])),
            t);
      }));
  }),
  tr = u('$ZodPipe', (e, n) => {
    (g.init(e, n),
      h(e._zod, 'values', () => n.in._zod.values),
      h(e._zod, 'optin', () => n.in._zod.optin),
      h(e._zod, 'optout', () => n.out._zod.optout),
      h(e._zod, 'propValues', () => n.in._zod.propValues),
      (e._zod.parse = (t, r) => {
        if (r.direction === 'backward') {
          const c = n.out._zod.run(t, r);
          return c instanceof Promise
            ? c.then((i) => R(i, n.in, r))
            : R(c, n.in, r);
        }
        const o = n.in._zod.run(t, r);
        return o instanceof Promise
          ? o.then((c) => R(c, n.out, r))
          : R(o, n.out, r);
      }));
  });
function R(e, n, t) {
  return e.issues.length
    ? ((e.aborted = !0), e)
    : n._zod.run({ value: e.value, issues: e.issues }, t);
}
const rr = u('$ZodReadonly', (e, n) => {
  (g.init(e, n),
    h(e._zod, 'propValues', () => n.innerType._zod.propValues),
    h(e._zod, 'values', () => n.innerType._zod.values),
    h(e._zod, 'optin', () => n.innerType._zod.optin),
    h(e._zod, 'optout', () => n.innerType._zod.optout),
    (e._zod.parse = (t, r) => {
      if (r.direction === 'backward') return n.innerType._zod.run(t, r);
      const o = n.innerType._zod.run(t, r);
      return o instanceof Promise ? o.then(_e) : _e(o);
    }));
});
function _e(e) {
  return ((e.value = Object.freeze(e.value)), e);
}
const or = u('$ZodCustom', (e, n) => {
  (w.init(e, n),
    g.init(e, n),
    (e._zod.parse = (t, r) => t),
    (e._zod.check = (t) => {
      const r = t.value,
        o = n.fn(r);
      if (o instanceof Promise) return o.then((c) => ge(c, t, r, e));
      ge(o, t, r, e);
    }));
});
function ge(e, n, t, r) {
  if (!e) {
    const o = {
      code: 'custom',
      input: t,
      inst: r,
      path: [...(r._zod.def.path ?? [])],
      continue: !r._zod.def.abort,
    };
    (r._zod.def.params && (o.params = r._zod.def.params), n.issues.push(j(o)));
  }
}
class ir {
  constructor() {
    ((this._map = new Map()), (this._idmap = new Map()));
  }
  add(n, ...t) {
    const r = t[0];
    if ((this._map.set(n, r), r && typeof r == 'object' && 'id' in r)) {
      if (this._idmap.has(r.id))
        throw new Error(`ID ${r.id} already exists in the registry`);
      this._idmap.set(r.id, n);
    }
    return this;
  }
  clear() {
    return ((this._map = new Map()), (this._idmap = new Map()), this);
  }
  remove(n) {
    const t = this._map.get(n);
    return (
      t && typeof t == 'object' && 'id' in t && this._idmap.delete(t.id),
      this._map.delete(n),
      this
    );
  }
  get(n) {
    const t = n._zod.parent;
    if (t) {
      const r = { ...(this.get(t) ?? {}) };
      delete r.id;
      const o = { ...r, ...this._map.get(n) };
      return Object.keys(o).length ? o : void 0;
    }
    return this._map.get(n);
  }
  has(n) {
    return this._map.has(n);
  }
}
function cr() {
  return new ir();
}
const U = cr();
function ur(e, n) {
  return new e({ type: 'string', ...l(n) });
}
function sr(e, n) {
  return new e({
    type: 'string',
    format: 'email',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function ve(e, n) {
  return new e({
    type: 'string',
    format: 'guid',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function ar(e, n) {
  return new e({
    type: 'string',
    format: 'uuid',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function lr(e, n) {
  return new e({
    type: 'string',
    format: 'uuid',
    check: 'string_format',
    abort: !1,
    version: 'v4',
    ...l(n),
  });
}
function dr(e, n) {
  return new e({
    type: 'string',
    format: 'uuid',
    check: 'string_format',
    abort: !1,
    version: 'v6',
    ...l(n),
  });
}
function fr(e, n) {
  return new e({
    type: 'string',
    format: 'uuid',
    check: 'string_format',
    abort: !1,
    version: 'v7',
    ...l(n),
  });
}
function hr(e, n) {
  return new e({
    type: 'string',
    format: 'url',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function pr(e, n) {
  return new e({
    type: 'string',
    format: 'emoji',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function mr(e, n) {
  return new e({
    type: 'string',
    format: 'nanoid',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function _r(e, n) {
  return new e({
    type: 'string',
    format: 'cuid',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function gr(e, n) {
  return new e({
    type: 'string',
    format: 'cuid2',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function vr(e, n) {
  return new e({
    type: 'string',
    format: 'ulid',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function zr(e, n) {
  return new e({
    type: 'string',
    format: 'xid',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function br(e, n) {
  return new e({
    type: 'string',
    format: 'ksuid',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function wr(e, n) {
  return new e({
    type: 'string',
    format: 'ipv4',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function kr(e, n) {
  return new e({
    type: 'string',
    format: 'ipv6',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function Zr(e, n) {
  return new e({
    type: 'string',
    format: 'cidrv4',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function $r(e, n) {
  return new e({
    type: 'string',
    format: 'cidrv6',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function yr(e, n) {
  return new e({
    type: 'string',
    format: 'base64',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function Ir(e, n) {
  return new e({
    type: 'string',
    format: 'base64url',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function Er(e, n) {
  return new e({
    type: 'string',
    format: 'e164',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function Or(e, n) {
  return new e({
    type: 'string',
    format: 'jwt',
    check: 'string_format',
    abort: !1,
    ...l(n),
  });
}
function Pr(e, n) {
  return new e({
    type: 'string',
    format: 'datetime',
    check: 'string_format',
    offset: !1,
    local: !1,
    precision: null,
    ...l(n),
  });
}
function Tr(e, n) {
  return new e({
    type: 'string',
    format: 'date',
    check: 'string_format',
    ...l(n),
  });
}
function Ar(e, n) {
  return new e({
    type: 'string',
    format: 'time',
    check: 'string_format',
    precision: null,
    ...l(n),
  });
}
function Nr(e, n) {
  return new e({
    type: 'string',
    format: 'duration',
    check: 'string_format',
    ...l(n),
  });
}
function Dr(e, n) {
  return new e({ type: 'number', checks: [], ...l(n) });
}
function Sr(e, n) {
  return new e({
    type: 'number',
    check: 'number_format',
    abort: !1,
    format: 'safeint',
    ...l(n),
  });
}
function jr(e) {
  return new e({ type: 'unknown' });
}
function xr(e, n) {
  return new e({ type: 'never', ...l(n) });
}
function Cr(e, n) {
  return new e({ type: 'date', ...l(n) });
}
function ze(e, n) {
  return new Fe({ check: 'less_than', ...l(n), value: e, inclusive: !1 });
}
function L(e, n) {
  return new Fe({ check: 'less_than', ...l(n), value: e, inclusive: !0 });
}
function be(e, n) {
  return new Le({ check: 'greater_than', ...l(n), value: e, inclusive: !1 });
}
function M(e, n) {
  return new Le({ check: 'greater_than', ...l(n), value: e, inclusive: !0 });
}
function we(e, n) {
  return new et({ check: 'multiple_of', ...l(n), value: e });
}
function Ge(e, n) {
  return new tt({ check: 'max_length', ...l(n), maximum: e });
}
function B(e, n) {
  return new rt({ check: 'min_length', ...l(n), minimum: e });
}
function Je(e, n) {
  return new ot({ check: 'length_equals', ...l(n), length: e });
}
function Rr(e, n) {
  return new it({
    check: 'string_format',
    format: 'regex',
    ...l(n),
    pattern: e,
  });
}
function Ur(e) {
  return new ct({ check: 'string_format', format: 'lowercase', ...l(e) });
}
function Fr(e) {
  return new ut({ check: 'string_format', format: 'uppercase', ...l(e) });
}
function Lr(e, n) {
  return new st({
    check: 'string_format',
    format: 'includes',
    ...l(n),
    includes: e,
  });
}
function Mr(e, n) {
  return new at({
    check: 'string_format',
    format: 'starts_with',
    ...l(n),
    prefix: e,
  });
}
function Vr(e, n) {
  return new lt({
    check: 'string_format',
    format: 'ends_with',
    ...l(n),
    suffix: e,
  });
}
function x(e) {
  return new dt({ check: 'overwrite', tx: e });
}
function Wr(e) {
  return x((n) => n.normalize(e));
}
function Br() {
  return x((e) => e.trim());
}
function Gr() {
  return x((e) => e.toLowerCase());
}
function Jr() {
  return x((e) => e.toUpperCase());
}
function Kr(e, n, t) {
  return new e({ type: 'array', element: n, ...l(t) });
}
function Yr(e, n, t) {
  return new e({ type: 'custom', check: 'custom', fn: n, ...l(t) });
}
function Xr(e) {
  const n = qr(
    (t) => (
      (t.addIssue = (r) => {
        if (typeof r == 'string') t.issues.push(j(r, t.value, n._zod.def));
        else {
          const o = r;
          (o.fatal && (o.continue = !1),
            o.code ?? (o.code = 'custom'),
            o.input ?? (o.input = t.value),
            o.inst ?? (o.inst = n),
            o.continue ?? (o.continue = !n._zod.def.abort),
            t.issues.push(j(o)));
        }
      }),
      e(t.value, t)
    )
  );
  return n;
}
function qr(e, n) {
  const t = new w({ check: 'custom', ...l(n) });
  return ((t._zod.check = e), t);
}
const Hr = u('ZodISODateTime', (e, n) => {
  (yt.init(e, n), m.init(e, n));
});
function Qr(e) {
  return Pr(Hr, e);
}
const eo = u('ZodISODate', (e, n) => {
  (It.init(e, n), m.init(e, n));
});
function no(e) {
  return Tr(eo, e);
}
const to = u('ZodISOTime', (e, n) => {
  (Et.init(e, n), m.init(e, n));
});
function ro(e) {
  return Ar(to, e);
}
const oo = u('ZodISODuration', (e, n) => {
  (Ot.init(e, n), m.init(e, n));
});
function io(e) {
  return Nr(oo, e);
}
const co = (e, n) => {
    (Se.init(e, n),
      (e.name = 'ZodError'),
      Object.defineProperties(e, {
        format: { value: (t) => gn(e, t) },
        flatten: { value: (t) => _n(e, t) },
        addIssue: {
          value: (t) => {
            (e.issues.push(t), (e.message = JSON.stringify(e.issues, X, 2)));
          },
        },
        addIssues: {
          value: (t) => {
            (e.issues.push(...t), (e.message = JSON.stringify(e.issues, X, 2)));
          },
        },
        isEmpty: {
          get() {
            return e.issues.length === 0;
          },
        },
      }));
  },
  k = u('ZodError', co, { Parent: Error }),
  uo = re(k),
  so = oe(k),
  ao = J(k),
  lo = K(k),
  fo = bn(k),
  ho = wn(k),
  po = kn(k),
  mo = Zn(k),
  _o = $n(k),
  go = yn(k),
  vo = In(k),
  zo = En(k),
  v = u(
    'ZodType',
    (e, n) => (
      g.init(e, n),
      (e.def = n),
      (e.type = n.type),
      Object.defineProperty(e, '_def', { value: n }),
      (e.check = (...t) =>
        e.clone({
          ...n,
          checks: [
            ...(n.checks ?? []),
            ...t.map((r) =>
              typeof r == 'function'
                ? { _zod: { check: r, def: { check: 'custom' }, onattach: [] } }
                : r
            ),
          ],
        })),
      (e.clone = (t, r) => E(e, t, r)),
      (e.brand = () => e),
      (e.register = (t, r) => (t.add(e, r), e)),
      (e.parse = (t, r) => uo(e, t, r, { callee: e.parse })),
      (e.safeParse = (t, r) => ao(e, t, r)),
      (e.parseAsync = async (t, r) => so(e, t, r, { callee: e.parseAsync })),
      (e.safeParseAsync = async (t, r) => lo(e, t, r)),
      (e.spa = e.safeParseAsync),
      (e.encode = (t, r) => fo(e, t, r)),
      (e.decode = (t, r) => ho(e, t, r)),
      (e.encodeAsync = async (t, r) => po(e, t, r)),
      (e.decodeAsync = async (t, r) => mo(e, t, r)),
      (e.safeEncode = (t, r) => _o(e, t, r)),
      (e.safeDecode = (t, r) => go(e, t, r)),
      (e.safeEncodeAsync = async (t, r) => vo(e, t, r)),
      (e.safeDecodeAsync = async (t, r) => zo(e, t, r)),
      (e.refine = (t, r) => e.check(di(t, r))),
      (e.superRefine = (t) => e.check(fi(t))),
      (e.overwrite = (t) => e.check(x(t))),
      (e.optional = () => ye(e)),
      (e.nullable = () => Ie(e)),
      (e.nullish = () => ye(Ie(e))),
      (e.nonoptional = (t) => oi(e, t)),
      (e.array = () => Wo(e)),
      (e.or = (t) => Jo([e, t])),
      (e.and = (t) => Yo(e, t)),
      (e.transform = (t) => Ee(e, Ho(t))),
      (e.default = (t) => ni(e, t)),
      (e.prefault = (t) => ri(e, t)),
      (e.catch = (t) => ci(e, t)),
      (e.pipe = (t) => Ee(e, t)),
      (e.readonly = () => ai(e)),
      (e.describe = (t) => {
        const r = e.clone();
        return (U.add(r, { description: t }), r);
      }),
      Object.defineProperty(e, 'description', {
        get() {
          return U.get(e)?.description;
        },
        configurable: !0,
      }),
      (e.meta = (...t) => {
        if (t.length === 0) return U.get(e);
        const r = e.clone();
        return (U.add(r, t[0]), r);
      }),
      (e.isOptional = () => e.safeParse(void 0).success),
      (e.isNullable = () => e.safeParse(null).success),
      e
    )
  ),
  Ke = u('_ZodString', (e, n) => {
    (ie.init(e, n), v.init(e, n));
    const t = e._zod.bag;
    ((e.format = t.format ?? null),
      (e.minLength = t.minimum ?? null),
      (e.maxLength = t.maximum ?? null),
      (e.regex = (...r) => e.check(Rr(...r))),
      (e.includes = (...r) => e.check(Lr(...r))),
      (e.startsWith = (...r) => e.check(Mr(...r))),
      (e.endsWith = (...r) => e.check(Vr(...r))),
      (e.min = (...r) => e.check(B(...r))),
      (e.max = (...r) => e.check(Ge(...r))),
      (e.length = (...r) => e.check(Je(...r))),
      (e.nonempty = (...r) => e.check(B(1, ...r))),
      (e.lowercase = (r) => e.check(Ur(r))),
      (e.uppercase = (r) => e.check(Fr(r))),
      (e.trim = () => e.check(Br())),
      (e.normalize = (...r) => e.check(Wr(...r))),
      (e.toLowerCase = () => e.check(Gr())),
      (e.toUpperCase = () => e.check(Jr())));
  }),
  bo = u('ZodString', (e, n) => {
    (ie.init(e, n),
      Ke.init(e, n),
      (e.email = (t) => e.check(sr(wo, t))),
      (e.url = (t) => e.check(hr(ko, t))),
      (e.jwt = (t) => e.check(Or(Co, t))),
      (e.emoji = (t) => e.check(pr(Zo, t))),
      (e.guid = (t) => e.check(ve(ke, t))),
      (e.uuid = (t) => e.check(ar(F, t))),
      (e.uuidv4 = (t) => e.check(lr(F, t))),
      (e.uuidv6 = (t) => e.check(dr(F, t))),
      (e.uuidv7 = (t) => e.check(fr(F, t))),
      (e.nanoid = (t) => e.check(mr($o, t))),
      (e.guid = (t) => e.check(ve(ke, t))),
      (e.cuid = (t) => e.check(_r(yo, t))),
      (e.cuid2 = (t) => e.check(gr(Io, t))),
      (e.ulid = (t) => e.check(vr(Eo, t))),
      (e.base64 = (t) => e.check(yr(So, t))),
      (e.base64url = (t) => e.check(Ir(jo, t))),
      (e.xid = (t) => e.check(zr(Oo, t))),
      (e.ksuid = (t) => e.check(br(Po, t))),
      (e.ipv4 = (t) => e.check(wr(To, t))),
      (e.ipv6 = (t) => e.check(kr(Ao, t))),
      (e.cidrv4 = (t) => e.check(Zr(No, t))),
      (e.cidrv6 = (t) => e.check($r(Do, t))),
      (e.e164 = (t) => e.check(Er(xo, t))),
      (e.datetime = (t) => e.check(Qr(t))),
      (e.date = (t) => e.check(no(t))),
      (e.time = (t) => e.check(ro(t))),
      (e.duration = (t) => e.check(io(t))));
  });
function hi(e) {
  return ur(bo, e);
}
const m = u('ZodStringFormat', (e, n) => {
    (p.init(e, n), Ke.init(e, n));
  }),
  wo = u('ZodEmail', (e, n) => {
    (_t.init(e, n), m.init(e, n));
  }),
  ke = u('ZodGUID', (e, n) => {
    (pt.init(e, n), m.init(e, n));
  }),
  F = u('ZodUUID', (e, n) => {
    (mt.init(e, n), m.init(e, n));
  }),
  ko = u('ZodURL', (e, n) => {
    (gt.init(e, n), m.init(e, n));
  }),
  Zo = u('ZodEmoji', (e, n) => {
    (vt.init(e, n), m.init(e, n));
  }),
  $o = u('ZodNanoID', (e, n) => {
    (zt.init(e, n), m.init(e, n));
  }),
  yo = u('ZodCUID', (e, n) => {
    (bt.init(e, n), m.init(e, n));
  }),
  Io = u('ZodCUID2', (e, n) => {
    (wt.init(e, n), m.init(e, n));
  }),
  Eo = u('ZodULID', (e, n) => {
    (kt.init(e, n), m.init(e, n));
  }),
  Oo = u('ZodXID', (e, n) => {
    (Zt.init(e, n), m.init(e, n));
  }),
  Po = u('ZodKSUID', (e, n) => {
    ($t.init(e, n), m.init(e, n));
  }),
  To = u('ZodIPv4', (e, n) => {
    (Pt.init(e, n), m.init(e, n));
  }),
  Ao = u('ZodIPv6', (e, n) => {
    (Tt.init(e, n), m.init(e, n));
  }),
  No = u('ZodCIDRv4', (e, n) => {
    (At.init(e, n), m.init(e, n));
  }),
  Do = u('ZodCIDRv6', (e, n) => {
    (Nt.init(e, n), m.init(e, n));
  }),
  So = u('ZodBase64', (e, n) => {
    (Dt.init(e, n), m.init(e, n));
  }),
  jo = u('ZodBase64URL', (e, n) => {
    (jt.init(e, n), m.init(e, n));
  }),
  xo = u('ZodE164', (e, n) => {
    (xt.init(e, n), m.init(e, n));
  }),
  Co = u('ZodJWT', (e, n) => {
    (Rt.init(e, n), m.init(e, n));
  }),
  Ye = u('ZodNumber', (e, n) => {
    (Ve.init(e, n),
      v.init(e, n),
      (e.gt = (r, o) => e.check(be(r, o))),
      (e.gte = (r, o) => e.check(M(r, o))),
      (e.min = (r, o) => e.check(M(r, o))),
      (e.lt = (r, o) => e.check(ze(r, o))),
      (e.lte = (r, o) => e.check(L(r, o))),
      (e.max = (r, o) => e.check(L(r, o))),
      (e.int = (r) => e.check(Ze(r))),
      (e.safe = (r) => e.check(Ze(r))),
      (e.positive = (r) => e.check(be(0, r))),
      (e.nonnegative = (r) => e.check(M(0, r))),
      (e.negative = (r) => e.check(ze(0, r))),
      (e.nonpositive = (r) => e.check(L(0, r))),
      (e.multipleOf = (r, o) => e.check(we(r, o))),
      (e.step = (r, o) => e.check(we(r, o))),
      (e.finite = () => e));
    const t = e._zod.bag;
    ((e.minValue =
      Math.max(
        t.minimum ?? Number.NEGATIVE_INFINITY,
        t.exclusiveMinimum ?? Number.NEGATIVE_INFINITY
      ) ?? null),
      (e.maxValue =
        Math.min(
          t.maximum ?? Number.POSITIVE_INFINITY,
          t.exclusiveMaximum ?? Number.POSITIVE_INFINITY
        ) ?? null),
      (e.isInt =
        (t.format ?? '').includes('int') ||
        Number.isSafeInteger(t.multipleOf ?? 0.5)),
      (e.isFinite = !0),
      (e.format = t.format ?? null));
  });
function pi(e) {
  return Dr(Ye, e);
}
const Ro = u('ZodNumberFormat', (e, n) => {
  (Ut.init(e, n), Ye.init(e, n));
});
function Ze(e) {
  return Sr(Ro, e);
}
const Uo = u('ZodUnknown', (e, n) => {
  (Ft.init(e, n), v.init(e, n));
});
function $e() {
  return jr(Uo);
}
const Fo = u('ZodNever', (e, n) => {
  (Lt.init(e, n), v.init(e, n));
});
function Lo(e) {
  return xr(Fo, e);
}
const Mo = u('ZodDate', (e, n) => {
  (Mt.init(e, n),
    v.init(e, n),
    (e.min = (r, o) => e.check(M(r, o))),
    (e.max = (r, o) => e.check(L(r, o))));
  const t = e._zod.bag;
  ((e.minDate = t.minimum ? new Date(t.minimum) : null),
    (e.maxDate = t.maximum ? new Date(t.maximum) : null));
});
function mi(e) {
  return Cr(Mo, e);
}
const Vo = u('ZodArray', (e, n) => {
  (Vt.init(e, n),
    v.init(e, n),
    (e.element = n.element),
    (e.min = (t, r) => e.check(B(t, r))),
    (e.nonempty = (t) => e.check(B(1, t))),
    (e.max = (t, r) => e.check(Ge(t, r))),
    (e.length = (t, r) => e.check(Je(t, r))),
    (e.unwrap = () => e.element));
});
function Wo(e, n) {
  return Kr(Vo, e, n);
}
const Bo = u('ZodObject', (e, n) => {
  (Bt.init(e, n),
    v.init(e, n),
    h(e, 'shape', () => n.shape),
    (e.keyof = () => Xo(Object.keys(e._zod.def.shape))),
    (e.catchall = (t) => e.clone({ ...e._zod.def, catchall: t })),
    (e.passthrough = () => e.clone({ ...e._zod.def, catchall: $e() })),
    (e.loose = () => e.clone({ ...e._zod.def, catchall: $e() })),
    (e.strict = () => e.clone({ ...e._zod.def, catchall: Lo() })),
    (e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 })),
    (e.extend = (t) => dn(e, t)),
    (e.safeExtend = (t) => fn(e, t)),
    (e.merge = (t) => hn(e, t)),
    (e.pick = (t) => an(e, t)),
    (e.omit = (t) => ln(e, t)),
    (e.partial = (...t) => pn(Xe, e, t[0])),
    (e.required = (...t) => mn(qe, e, t[0])));
});
function _i(e, n) {
  const t = {
    type: 'object',
    get shape() {
      return (I(this, 'shape', e ? rn(e) : {}), this.shape);
    },
    ...l(n),
  };
  return new Bo(t);
}
const Go = u('ZodUnion', (e, n) => {
  (Gt.init(e, n), v.init(e, n), (e.options = n.options));
});
function Jo(e, n) {
  return new Go({ type: 'union', options: e, ...l(n) });
}
const Ko = u('ZodIntersection', (e, n) => {
  (Jt.init(e, n), v.init(e, n));
});
function Yo(e, n) {
  return new Ko({ type: 'intersection', left: e, right: n });
}
const H = u('ZodEnum', (e, n) => {
  (Kt.init(e, n),
    v.init(e, n),
    (e.enum = n.entries),
    (e.options = Object.values(n.entries)));
  const t = new Set(Object.keys(n.entries));
  ((e.extract = (r, o) => {
    const c = {};
    for (const i of r)
      if (t.has(i)) c[i] = n.entries[i];
      else throw new Error(`Key ${i} not found in enum`);
    return new H({ ...n, checks: [], ...l(o), entries: c });
  }),
    (e.exclude = (r, o) => {
      const c = { ...n.entries };
      for (const i of r)
        if (t.has(i)) delete c[i];
        else throw new Error(`Key ${i} not found in enum`);
      return new H({ ...n, checks: [], ...l(o), entries: c });
    }));
});
function Xo(e, n) {
  const t = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new H({ type: 'enum', entries: t, ...l(n) });
}
const qo = u('ZodTransform', (e, n) => {
  (Yt.init(e, n),
    v.init(e, n),
    (e._zod.parse = (t, r) => {
      if (r.direction === 'backward') throw new Oe(e.constructor.name);
      t.addIssue = (c) => {
        if (typeof c == 'string') t.issues.push(j(c, t.value, n));
        else {
          const i = c;
          (i.fatal && (i.continue = !1),
            i.code ?? (i.code = 'custom'),
            i.input ?? (i.input = t.value),
            i.inst ?? (i.inst = e),
            t.issues.push(j(i)));
        }
      };
      const o = n.transform(t.value, t);
      return o instanceof Promise
        ? o.then((c) => ((t.value = c), t))
        : ((t.value = o), t);
    }));
});
function Ho(e) {
  return new qo({ type: 'transform', transform: e });
}
const Xe = u('ZodOptional', (e, n) => {
  (Xt.init(e, n), v.init(e, n), (e.unwrap = () => e._zod.def.innerType));
});
function ye(e) {
  return new Xe({ type: 'optional', innerType: e });
}
const Qo = u('ZodNullable', (e, n) => {
  (qt.init(e, n), v.init(e, n), (e.unwrap = () => e._zod.def.innerType));
});
function Ie(e) {
  return new Qo({ type: 'nullable', innerType: e });
}
const ei = u('ZodDefault', (e, n) => {
  (Ht.init(e, n),
    v.init(e, n),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeDefault = e.unwrap));
});
function ni(e, n) {
  return new ei({
    type: 'default',
    innerType: e,
    get defaultValue() {
      return typeof n == 'function' ? n() : Ae(n);
    },
  });
}
const ti = u('ZodPrefault', (e, n) => {
  (Qt.init(e, n), v.init(e, n), (e.unwrap = () => e._zod.def.innerType));
});
function ri(e, n) {
  return new ti({
    type: 'prefault',
    innerType: e,
    get defaultValue() {
      return typeof n == 'function' ? n() : Ae(n);
    },
  });
}
const qe = u('ZodNonOptional', (e, n) => {
  (er.init(e, n), v.init(e, n), (e.unwrap = () => e._zod.def.innerType));
});
function oi(e, n) {
  return new qe({ type: 'nonoptional', innerType: e, ...l(n) });
}
const ii = u('ZodCatch', (e, n) => {
  (nr.init(e, n),
    v.init(e, n),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeCatch = e.unwrap));
});
function ci(e, n) {
  return new ii({
    type: 'catch',
    innerType: e,
    catchValue: typeof n == 'function' ? n : () => n,
  });
}
const ui = u('ZodPipe', (e, n) => {
  (tr.init(e, n), v.init(e, n), (e.in = n.in), (e.out = n.out));
});
function Ee(e, n) {
  return new ui({ type: 'pipe', in: e, out: n });
}
const si = u('ZodReadonly', (e, n) => {
  (rr.init(e, n), v.init(e, n), (e.unwrap = () => e._zod.def.innerType));
});
function ai(e) {
  return new si({ type: 'readonly', innerType: e });
}
const li = u('ZodCustom', (e, n) => {
  (or.init(e, n), v.init(e, n));
});
function di(e, n = {}) {
  return Yr(li, e, n);
}
function fi(e) {
  return Xr(e);
}
export { Wo as a, mi as d, pi as n, _i as o, hi as s, Jo as u };
