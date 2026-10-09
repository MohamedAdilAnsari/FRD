const net = require('net');
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Simple .env parser to detect DATABASE_DIALECT
try {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k, ...rest] = trimmed.split('=');
        const key = k.trim();
        if (key && !process.env[key]) {
          process.env[key] = rest.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    }
  }
} catch (e) {}

const PG_PORT = 5433;
const PG_DATA_DIR = path.join(process.cwd(), 'data', 'pgdata');
const POSTGRES_BIN = '/usr/lib/postgresql/18/bin/postgres';
const INITDB_BIN = '/usr/lib/postgresql/18/bin/initdb';

async function checkPgRunning() {
  const { Client } = require('pg');
  const socketPath = path.join(PG_DATA_DIR, `.s.PGSQL.${PG_PORT}`);
  if (fs.existsSync(socketPath)) {
    try {
      const client = new Client({
        host: PG_DATA_DIR,
        port: PG_PORT,
        user: 'postgres',
        database: 'postgres',
      });
      await client.connect();
      await client.end();
      return true;
    } catch (e) {
      // socket file might be stale
    }
  }

  // Also check TCP
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(PG_PORT, '127.0.0.1');
  });
}

async function ensurePostgres() {
  const dialect = process.env.DATABASE_DIALECT || 'sqlite';
  if (dialect === 'sqlite') {
    console.log('[Database] Configured for SQLite (./data/frdg.sqlite). Skipping PostgreSQL daemon.');
    return;
  }

  if (!fs.existsSync(POSTGRES_BIN) || !fs.existsSync(INITDB_BIN)) {
    console.log('[PostgreSQL] PostgreSQL binaries not found. Falling back to SQLite mode.');
    return;
  }

  const isRunning = await checkPgRunning();
  if (isRunning) {
    console.log(`[PostgreSQL] Daemon already active and connected on port/socket ${PG_PORT}.`);
    return;
  }

  // Ensure cluster initialized
  if (!fs.existsSync(path.join(PG_DATA_DIR, 'PG_VERSION'))) {
    console.log(`[PostgreSQL] Initializing new database cluster at ${PG_DATA_DIR}...`);
    fs.mkdirSync(PG_DATA_DIR, { recursive: true });
    execSync(`${INITDB_BIN} -D "${PG_DATA_DIR}" -U postgres --auth=trust`, { stdio: 'inherit' });
  }

  console.log(`[PostgreSQL] Launching database daemon on port ${PG_PORT}...`);
  const pgProcess = spawn(
    POSTGRES_BIN,
    ['-D', PG_DATA_DIR, '-p', String(PG_PORT), '-k', PG_DATA_DIR, '-h', '127.0.0.1'],
    {
      detached: true,
      stdio: 'ignore',
    }
  );
  pgProcess.unref();

  // Wait for it to become ready
  let attempts = 0;
  while (attempts < 15) {
    await new Promise((r) => setTimeout(r, 400));
    const ready = await checkPgRunning();
    if (ready) {
      console.log(`[PostgreSQL] Successfully started and listening on port/socket ${PG_PORT}.`);
      try {
        execSync(`/usr/lib/postgresql/18/bin/createdb -h "${PG_DATA_DIR}" -p ${PG_PORT} -U postgres frdg_db 2>/dev/null || true`);
      } catch (e) {}
      return;
    }
    attempts++;
  }
}

if (require.main === module) {
  ensurePostgres().catch(console.error);
}

module.exports = { ensurePostgres };
