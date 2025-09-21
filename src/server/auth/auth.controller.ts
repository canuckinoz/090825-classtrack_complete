import { Router } from 'express';
import { AuthService } from './auth.service';

export const authRouter = Router();
const svc = new AuthService();

async function handleLogin(
  req: any,
  res: any,
  roleHint: 'TEACHER' | 'LEADER' | 'CENTRAL'
) {
  try {
    const { email, password } = req.body || {};
    const result = await svc.loginWithRoleHint(email, password, roleHint);
    // Set refresh token cookie (httpOnly, secure in prod)
    res.cookie('rt', result.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return res.json({
      ok: true,
      accessToken: result.accessToken,
      landing: result.landing,
    });
  } catch (e: any) {
    return res
      .status(401)
      .json({ ok: false, error: e?.message || 'invalid_credentials' });
  }
}

authRouter.post('/api/auth/login/teacher', (req, res) =>
  handleLogin(req, res, 'TEACHER')
);
authRouter.post('/api/auth/login/leader', (req, res) =>
  handleLogin(req, res, 'LEADER')
);
authRouter.post('/api/auth/login/central', (req, res) =>
  handleLogin(req, res, 'CENTRAL')
);
