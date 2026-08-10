import { Router } from 'express';
import { env } from '../config/env.js';
import { passport } from '../auth/passport.js';

export const authRouter = Router();

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['openid', 'email', 'profile'],
    prompt: 'select_account',
  }),
);

authRouter.get('/google/callback', (request, response, next) => {
  if (request.query.error) {
    response.redirect(`${env.frontendOrigin}/?auth_error=oauth_denied`);
    return;
  }

  passport.authenticate(
    'google',
    (error: Error | null, user: Express.User | false) => {
      if (error || !user) {
        response.redirect(`${env.frontendOrigin}/?auth_error=oauth_failed`);
        return;
      }

      request.session.regenerate((regenerateError) => {
        if (regenerateError) {
          next(regenerateError);
          return;
        }

        request.logIn(user, (loginError) => {
          if (loginError) {
            next(loginError);
            return;
          }

          response.redirect(env.frontendOrigin);
        });
      });
    },
  )(request, response, next);
});

authRouter.get('/me', (request, response) => {
  if (!request.isAuthenticated() || !request.user) {
    response.status(401).json({ user: null });
    return;
  }

  response.json({ user: request.user });
});

authRouter.post('/logout', (request, response, next) => {
  request.logout((logoutError) => {
    if (logoutError) {
      next(logoutError);
      return;
    }

    request.session.destroy((sessionError) => {
      if (sessionError) {
        next(sessionError);
        return;
      }

      response.clearCookie(env.sessionCookieName, {
        httpOnly: true,
        secure: env.isProduction,
        sameSite: 'lax',
        path: '/',
      });
      response.status(204).send();
    });
  });
});
