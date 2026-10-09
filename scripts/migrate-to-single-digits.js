const { Client } = require('pg');

async function migrate() {
  const client = new Client({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    database: 'frdg_db',
  });

  await client.connect();
  console.log('Connected to PostgreSQL frdg_db');

  try {
    // 1. Ensure columns are varchar(255)
    await client.query('ALTER TABLE users ALTER COLUMN id TYPE varchar(255) USING id::text;');
    await client.query('ALTER TABLE projects ALTER COLUMN id TYPE varchar(255) USING id::text;');
    await client.query('ALTER TABLE projects ALTER COLUMN "clientId" TYPE varchar(255) USING "clientId"::text;');

    // 2. Migrate users to sequential single-digit IDs
    // Admin -> "1", Demo Client -> "2"
    await client.query("UPDATE users SET id = '1' WHERE email = 'admin@nutz.in';");
    await client.query("UPDATE users SET id = '2' WHERE email = 'client@example.com';");

    // Any other users
    const otherUsers = await client.query("SELECT id, email FROM users WHERE email NOT IN ('admin@nutz.in', 'client@example.com') ORDER BY \"createdAt\" ASC;");
    let userCounter = 3;
    for (const u of otherUsers.rows) {
      await client.query("UPDATE users SET id = $1 WHERE id = $2;", [String(userCounter), u.id]);
      await client.query('UPDATE projects SET "clientId" = $1 WHERE "clientId" = $2;', [String(userCounter), u.id]);
      userCounter++;
    }

    // 3. Migrate projects to sequential single-digit IDs 1, 2, 3...
    const projectsRes = await client.query('SELECT id, "projectName", "clientId", "createdAt" FROM projects ORDER BY "createdAt\" ASC;');
    console.log(`Migrating ${projectsRes.rows.length} projects to single-digit IDs...`);

    let projCounter = 1;
    for (const p of projectsRes.rows) {
      const newId = String(projCounter++);
      const targetClientId = (p.clientId === '1' || p.clientId === 'b20382ea-b616-4b9a-9afa-7a96c16b6b0e') ? '1' : '2';
      // First set to temp id to avoid any collision
      const tempId = `temp_${Date.now()}_${newId}`;
      await client.query('UPDATE projects SET id = $1 WHERE id = $2;', [tempId, p.id]);
      await client.query('UPDATE projects SET id = $1, "clientId" = $2 WHERE id = $3;', [newId, targetClientId, tempId]);
    }

    const finalUsers = await client.query('SELECT id, email, name, role FROM users ORDER BY id::int ASC;');
    console.log('MIGRATED USERS:', finalUsers.rows);

    const finalProjects = await client.query('SELECT id, "projectName", "companyName", "clientId", status FROM projects ORDER BY id::int ASC;');
    console.log('MIGRATED PROJECTS:', finalProjects.rows);

    console.log('Single digit migration completed successfully!');
  } finally {
    await client.end();
  }
}

migrate().catch(console.error);
