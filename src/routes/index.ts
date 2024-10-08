import type { Express } from 'express';
import { default as auth } from './auth.js';
import { default as links } from './links.js';
import { default as user } from './user.js';

export function useRoutes(app: Express) {
  app.use('/api/auth', auth);
  app.use('/api/links', links);
  app.use('/api/user', user);
};
