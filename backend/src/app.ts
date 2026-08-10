import cors from 'cors';
import express, {
  type ErrorRequestHandler,
  type Express,
} from 'express';
import session from 'express-session';
import helmet from 'helmet';
import connectPgSimple from 'connect-pg-simple';
import { configurePassport, passport } from './auth/passport.js';
import { database } from './config/database.js';
import { env } from './config/env.js';
import { authRouter } from './routes/auth.js';
import { healthRouter } from './routes/health.js';

const PostgresSessionStore = connectPgSimple(session);

type BuildAppOptions = {
  sessionStore?: session.Store;
};

export function buildApp(options: BuildAppOptions = {}): Express {
  const app = express();

  app.disable('x-powered-by');
  if (env.isProduction) {
    app.set('trust proxy', 1);
  }

  app.use(helmet());
  app.use(
    cors({
      origin: env.frontendOrigin,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(
    session({
      name: env.sessionCookieName,
      secret: env.sessionSecret,
      store:
        options.sessionStore ??
        new PostgresSessionStore({
          pool: database,
          tableName: 'user_sessions',
          createTableIfMissing: false,
        }),
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        secure: env.isProduction,
        sameSite: 'lax',
        maxAge: env.sessionMaxAgeMs,
        path: '/',
      },
    }),
  );

  configurePassport();
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', healthRouter);
  app.use('/auth', authRouter);

  const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
    console.error('Unhandled request error', error);
    response.status(500).json({
      error: 'Internal server error',
    });
  };

  app.use(errorHandler);

  return app;
}
