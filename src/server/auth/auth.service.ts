import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  PERMISSIONS,
  resolvePermissions,
} from '../policies/permission.resolver';
import type { Role, Subrole, Scope } from '../policies/permission.resolver';
import { prisma } from '../../../server/db/prisma';

export type LoginResult = {
  ok: true;
  accessToken: string;
  refreshToken: string;
  landing: string;
};

export class AuthService {
  private accessTtl = '15m';
  private refreshTtl = '7d';

  async loginWithRoleHint(
    email: string,
    password: string,
    _roleHint?: Role
  ): Promise<LoginResult> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) throw new Error('invalid_credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error('invalid_credentials');

    // Determine permissions deterministically from stored role/subroles/scope
    const role = user.role as Role;
    const subroles = (user.subroles || []) as Subrole[];
    const scope = (user.scope || {}) as Scope;
    const permissions = resolvePermissions(role, subroles, scope);

    const accessToken = this.signJwt(
      {
        userId: user.id,
        role,
        subroles,
        scope,
        permissions,
      },
      this.accessTtl
    );

    const refreshToken = this.signJwt(
      {
        userId: user.id,
        type: 'refresh',
      },
      this.refreshTtl
    );

    return {
      ok: true,
      accessToken,
      refreshToken,
      landing: this.landingForRole(role),
    };
  }

  signJwt(payload: Record<string, unknown>, expiresIn: string): string {
    const secret = process.env.JWT_SECRET || 'dev';
    return jwt.sign(payload, secret, { expiresIn });
  }

  landingForRole(role: Role): string {
    if (role === 'TEACHER') return '/dashboards/class';
    if (role === 'LEADER') return '/dashboards/school';
    return '/dashboards/region';
  }
}
