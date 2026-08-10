import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  type Profile,
} from 'passport-google-oauth20';
import { env } from '../config/env.js';
import {
  findUserById,
  upsertGoogleUser,
  type AuthUser,
} from '../repositories/users.js';

function getVerifiedEmail(profile: Profile): string {
  const email = profile.emails?.[0]?.value;
  const emailVerified =
    (profile._json as { email_verified?: boolean }).email_verified === true;

  if (!email || !emailVerified) {
    throw new Error('Google account must have a verified email address');
  }

  return email;
}

export function configurePassport(): void {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.googleClientId,
        clientSecret: env.googleClientSecret,
        callbackURL: env.googleCallbackUrl,
        state: true,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const user = await upsertGoogleUser({
            providerAccountId: profile.id,
            email: getVerifiedEmail(profile),
            name: profile.displayName,
            avatarUrl: profile.photos?.[0]?.value ?? null,
          });

          done(null, user);
        } catch (error) {
          done(error as Error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, (user as AuthUser).id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await findUserById(id);
      done(null, user ?? false);
    } catch (error) {
      done(error as Error);
    }
  });
}

export { passport };
