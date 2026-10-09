const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const sqlite3 = require('sqlite3');

const standardAgreements = [
  { id: 'agr-1', agreement: 'Phase 1 payment must be completed before project commencement.', order: 1 },
  { id: 'agr-2', agreement: 'Advance payment for each phase is non-refundable once development has commenced.', order: 2 },
  { id: 'agr-3', agreement: 'The project timeline begins only after receipt of all required assets, approvals and Phase 1 payment.', order: 3 },
  { id: 'agr-4', agreement: 'Each subsequent phase will commence only after successful completion, client approval and payment of the previous phase.', order: 4 },
  { id: 'agr-5', agreement: 'Any additional requirements beyond the approved Functional Requirement Document (FRD) shall be treated as Change Requests and quoted separately.', order: 5 },
  { id: 'agr-6', agreement: 'Additional UI/UX revisions beyond the approved scope may incur extra charges.', order: 6 },
  { id: 'agr-7', agreement: 'The client shall provide all required content, branding assets, credentials and third-party service access.', order: 7 },
  { id: 'agr-8', agreement: 'Project timelines may extend due to delays in client approvals, feedback or pending deliverables.', order: 8 },
  { id: 'agr-9', agreement: 'Source code ownership will be transferred only after full payment of the project.', order: 9 },
  { id: 'agr-10', agreement: 'Production deployment will be performed after successful User Acceptance Testing (UAT).', order: 10 },
  { id: 'agr-11', agreement: 'Support and services will be provided at no cost for a period of 30 days after the project rollout.', order: 11 },
  { id: 'agr-12', agreement: 'Annual Maintenance Contract (AMC) and extended support will be provided under a separate agreement.', order: 12 },
  { id: 'agr-13', agreement: 'This quotation is valid for 30 days from the issue date.', order: 13 },
];

async function updateDatabases() {
  const storeData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/companyTemplates.json'), 'utf8'));
  const payloadStr = JSON.stringify(storeData);

  // 1. PostgreSQL
  console.log('Connecting to PostgreSQL frdg_db...');
  const pgClient = new Client({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    database: 'frdg_db',
  });
  await pgClient.connect();

  await pgClient.query('ALTER TABLE company_template_store ADD COLUMN IF NOT EXISTS payload TEXT;');
  const existingStore = await pgClient.query('SELECT id FROM company_template_store WHERE id = $1;', ['current_store']);
  if (existingStore.rows.length === 0) {
    await pgClient.query(
      'INSERT INTO company_template_store (id, payload, "activeTemplateId", templates, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW());',
      ['current_store', payloadStr, storeData.activeTemplateId, JSON.stringify(storeData.templates)]
    );
  } else {
    await pgClient.query(
      'UPDATE company_template_store SET payload = $1, "activeTemplateId" = $2, templates = $3, "updatedAt" = NOW() WHERE id = $4;',
      [payloadStr, storeData.activeTemplateId, JSON.stringify(storeData.templates), 'current_store']
    );
  }
  console.log('PostgreSQL company_template_store updated successfully.');

  // Update all projects in PostgreSQL
  const pgProjects = await pgClient.query('SELECT id, "projectName", "companyTemplates", "customItems" FROM projects;');
  for (const proj of pgProjects.rows) {
    let ct = {};
    try {
      ct = typeof proj.companyTemplates === 'string' ? JSON.parse(proj.companyTemplates || '{}') : (proj.companyTemplates || {});
    } catch (e) {
      ct = {};
    }
    ct.agreements = standardAgreements;

    let ci = {};
    try {
      ci = typeof proj.customItems === 'string' ? JSON.parse(proj.customItems || '{}') : (proj.customItems || {});
    } catch (e) {
      ci = {};
    }
    ci.projectAgreements = standardAgreements;

    await pgClient.query('UPDATE projects SET "companyTemplates" = $1, "customItems" = $2 WHERE id = $3;', [
      JSON.stringify(ct),
      JSON.stringify(ci),
      proj.id
    ]);
    console.log(`Updated PG Project ${proj.id} (${proj.projectName}) with 13 agreements.`);
  }

  await pgClient.end();

  // 2. SQLite
  const sqlitePath = path.join(__dirname, '../data/frdg.sqlite');
  if (fs.existsSync(sqlitePath)) {
    console.log('Updating SQLite database...');
    const sqliteDb = new sqlite3.Database(sqlitePath);
    await new Promise((resolve) => {
      sqliteDb.run(
        "INSERT OR REPLACE INTO company_template_store (id, payload, createdAt, updatedAt) VALUES ('current_store', ?, datetime('now'), datetime('now'));",
        [payloadStr],
        (err) => {
          if (err) console.error('SQLite store error:', err);
          else console.log('SQLite company_template_store updated.');
          resolve();
        }
      );
    });

    await new Promise((resolve) => {
      sqliteDb.all('SELECT id, projectName, companyTemplates, customItems FROM projects;', async (err, rows) => {
        if (err || !rows) {
          return resolve();
        }
        for (const proj of rows) {
          let ct = {};
          try { 
            const parsed = JSON.parse(proj.companyTemplates || '{}');
            ct = (parsed && typeof parsed === 'object') ? parsed : {};
          } catch(e){ ct = {}; }
          ct.agreements = standardAgreements;

          let ci = {};
          try { 
            const parsed = JSON.parse(proj.customItems || '{}');
            ci = (parsed && typeof parsed === 'object') ? parsed : {};
          } catch(e){ ci = {}; }
          ci.projectAgreements = standardAgreements;

          sqliteDb.run('UPDATE projects SET companyTemplates = ?, customItems = ? WHERE id = ?;', [
            JSON.stringify(ct),
            JSON.stringify(ci),
            proj.id
          ]);
          console.log(`Updated SQLite Project ${proj.id} with 13 agreements.`);
        }
        resolve();
      });
    });

    sqliteDb.close();
    console.log('SQLite updated successfully.');
  }

  console.log('SUCCESS: All databases synchronized with 13 Other Project Agreements.');
}

updateDatabases().catch((err) => {
  console.error('Migration error:', err);
  process.exit(1);
});
