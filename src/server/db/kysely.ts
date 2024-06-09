// ===========================================================================
// Kysely Client (Wraps around a DB connection via Hrana)
// - This is the preferred client for most queries.
// = For develop, we use the Bun dialect.
// ===========================================================================

import { privateConfig } from '@/config.private';

import { LibsqlDialect } from '@libsql/kysely-libsql';
import { Kysely } from 'kysely';
import { BunWorkerDialect } from 'kysely-bun-worker';
import type { DB } from './types'; // Generated by prisma.

const getDialect = () => {
  const isLocal = privateConfig.database.URL.includes('file:');

  if (isLocal) {
    console.log('Found file local database. Using BunWorkerDialect.');
    // Can swap this with better-sqlite-3 if not Bun. (Node).
    return new BunWorkerDialect({
      url: privateConfig.database.URL
    });
  }

  console.log('Found remote database. Using LibsqlDialect.');
  return new LibsqlDialect({
    authToken: privateConfig.database.AUTH_TOKEN,
    url: privateConfig.database.URL
  });
};

export const db = new Kysely<DB>({
  dialect: getDialect()
});
