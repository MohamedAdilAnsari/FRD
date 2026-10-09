const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'frdg.sqlite');
const db = new sqlite3.Database(dbPath);

function generateFlowsForProject(p) {
  const pName = p.projectName || 'Enterprise Platform';
  const cName = p.companyName || 'Client Organization';
  const ind = p.industry || 'Enterprise Solution';

  const overallSystemFlow = `[User / Client Portal] -> [API Gateway & Auth Control]
 |
 v
[${pName} Core Operations Engine]
 |
 v
[Automated Business Logic & Validation Layer]
 |
 v
[Database Persistence & Relational Models]
 |
 v
[${cName} Executive Analytics & Auditing Dashboard]`;

  const highLevelArchitectureFlow = `[Presentation Tier: Next.js / Mobile Client]
 |
 v
[API Gateway: JWT Auth & Rate Limiting]
 |
 v
[Application Tier: Node.js / Express Microservices]
 |
 v
[Data Tier: PostgreSQL / SQLite + Redis Cache]
 |
 v
[Background Jobs & Asynchronous Notification Engine]`;

  const adminFlow = `[Super Administrator Command Center]
 |
 +-- [User Management & Role-based Access Control (RBAC)]
 +-- [${ind} Core Configuration Settings]
 +-- [Audit Trails & Security Incident Logs]
 +-- [System Health & Data Export Engine]`;

  const phaseWiseFlow = `Phase 1: Foundation & Core System Schemas (Weeks 1-4)
------------------------------------------------------------
System Schema Setup -> Authentication -> Core Data Models

Phase 2: Primary Business Logic & Workflows (Weeks 5-8)
------------------------------------------------------------
Business Logic Engine -> Operational Workflows -> Transaction Logs

Phase 3: Integrations & Extended Subsystems (Weeks 9-12)
------------------------------------------------------------
API Integrations -> Background Jobs -> Automated Notifications

Phase 4: Analytics, UAT & Production Launch (Weeks 13-16)
------------------------------------------------------------
Executive Reporting -> Security Audit -> UAT Sign-off -> Production Deployment`;

  return JSON.stringify({
    overallSystemFlow,
    highLevelArchitectureFlow,
    adminFlow,
    phaseWiseFlow
  });
}

db.all('SELECT id, projectName, companyName, industry, architectureFlows FROM projects', (err, rows) => {
  if (err) {
    console.error('Error fetching projects:', err);
    db.close();
    return;
  }

  let updatedCount = 0;
  const stmt = db.prepare('UPDATE projects SET architectureFlows = ? WHERE id = ?');

  rows.forEach((p) => {
    let parsed = null;
    try {
      if (p.architectureFlows) parsed = JSON.parse(p.architectureFlows);
    } catch (e) {}

    // If empty or missing overallSystemFlow
    if (!parsed || typeof parsed !== 'object' || !parsed.overallSystemFlow || String(parsed.overallSystemFlow).trim() === '') {
      const newFlows = generateFlowsForProject(p);
      stmt.run(newFlows, p.id, (uErr) => {
        if (!uErr) {
          updatedCount++;
          console.log(`Updated AI Architecture flows for project ${p.id}: ${p.projectName}`);
        }
      });
    }
  });

  stmt.finalize(() => {
    console.log(`Finished updating ${updatedCount} projects with AI architecture flows.`);
    db.close();
  });
});
