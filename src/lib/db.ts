import { Sequelize, DataTypes, Model } from 'sequelize';
import path from 'path';
import fs from 'fs';
import sqlite3 from 'sqlite3';

const isProduction = process.env.NODE_ENV === 'production';
const dialect = (process.env.DATABASE_DIALECT as 'sqlite' | 'postgres') || 'sqlite';
const databaseUrl = process.env.DATABASE_URL;
const databaseHost = process.env.DATABASE_HOST || path.join(process.cwd(), 'data', 'pgdata');
const databasePort = parseInt(process.env.DATABASE_PORT || '5433', 10);
const databaseName = process.env.DATABASE_NAME || 'frdg_db';
const databaseUser = process.env.DATABASE_USER || 'postgres';
const databasePassword = process.env.DATABASE_PASSWORD || '';

const globalForSequelize = globalThis as unknown as {
  sequelize?: Sequelize;
  dbInitialized?: boolean;
  initDbPromise?: Promise<Sequelize> | null;
};

let sequelize: Sequelize;

if (globalForSequelize.sequelize) {
  sequelize = globalForSequelize.sequelize;
} else if (dialect === 'postgres') {
  if (databaseHost.startsWith('/')) {
    // Unix domain socket connection (reliable inside and outside sandbox on Linux)
    sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
      dialect: 'postgres',
      host: databaseHost,
      port: databasePort,
      logging: false,
      pool: {
        max: 10,
        min: 2,
        acquire: 20000,
        idle: 10000,
      },
    });
  } else if (databaseUrl) {
    sequelize = new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 10,
        min: 2,
        acquire: 20000,
        idle: 10000,
      },
      dialectOptions: isProduction
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
    });
  } else {
    sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
      dialect: 'postgres',
      host: databaseHost,
      port: databasePort,
      logging: false,
      pool: {
        max: 10,
        min: 2,
        acquire: 20000,
        idle: 10000,
      },
    });
  }
  globalForSequelize.sequelize = sequelize;
} else {
  // SQLite fallback
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const storagePath = path.join(dataDir, 'frdg.sqlite');
  
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: false,
    dialectModule: sqlite3,
  });
  globalForSequelize.sequelize = sequelize;
}

// Models
export class User extends Model {
  declare id: string;
  declare email: string;
  declare passwordHash: string;
  declare name: string;
  declare role: 'admin' | 'client';
  declare companyName: string;
  declare phone: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'client'),
      defaultValue: 'client',
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export class Project extends Model {
  declare id: string;
  declare projectName: string;
  declare companyName: string;
  declare contactPerson: string;
  declare contactEmail: string;
  declare contactPhone: string;
  declare industry: string;
  declare locations: string;
  declare targetAudience: string;
  declare productDescription: string;
  declare startDate: string;
  declare endDate: string;
  declare creationDate: string;
  declare lastUpdatedDate: string;
  declare selectedCategoryIds: string; // JSON string
  declare selectedTypeIds: string; // JSON string
  declare selectedModuleIds: string; // JSON string
  declare selectedSubModuleIds: string; // JSON string
  declare selectedSubSubModuleIds: string; // JSON string
  declare customItems: string; // JSON string
  declare techStack: string; // JSON string
  declare architectureFlows: string; // JSON string
  declare implementationPhases: string; // JSON string
  declare paymentSplitup: string; // JSON string
  declare excludedItems: string; // JSON string
  declare companyTemplates: string; // JSON string
  declare adminNotes: string;
  declare estimatedBudget: string;
  declare status: string;
  declare clientId: string;
  declare clientName: string;
  declare clientEmail: string;
  declare pdfFileName: string;
  declare pdfContent: string;
  declare pdfData: string;
}

Project.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    locations: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    targetAudience: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creationDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastUpdatedDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    selectedCategoryIds: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    selectedTypeIds: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    selectedModuleIds: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    selectedSubModuleIds: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    selectedSubSubModuleIds: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    customItems: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    techStack: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    architectureFlows: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    implementationPhases: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    paymentSplitup: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    excludedItems: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    companyTemplates: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    adminNotes: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    estimatedBudget: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'submitted',
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clientEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pdfFileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pdfContent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pdfData: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
  }
);

// Relationships
User.hasMany(Project, { foreignKey: 'clientId', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'clientId', as: 'client' });

export class CompanyTemplateStoreModel extends Model {
  declare id: string;
  declare payload: string;
}

CompanyTemplateStoreModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: 'current_store',
    },
    payload: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'CompanyTemplateStore',
    tableName: 'company_template_store',
    timestamps: true,
  }
);

async function seedDatabaseAsync() {
  try {
    const { hashPassword } = await import('@/lib/auth');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@nutz.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminName = process.env.ADMIN_NAME || 'Nutz Admin';
    const adminCompany = process.env.ADMIN_COMPANY || 'Nutz Technovation Private Limited';
    const adminPhone = process.env.ADMIN_PHONE || '+91 98765 43210';

    const clientEmail = process.env.CLIENT_EMAIL || 'client@example.com';
    const clientPassword = process.env.CLIENT_PASSWORD || 'client123';
    const clientName = process.env.CLIENT_NAME || 'Demo Client';
    const clientCompany = process.env.CLIENT_COMPANY || 'Acme Enterprises';
    const clientPhone = process.env.CLIENT_PHONE || '+91 98765 43210';

    const adminCount = await User.count({ where: { role: 'admin' } });
    if (adminCount === 0) {
      await User.create({
        id: '1',
        email: adminEmail,
        passwordHash: hashPassword(adminPassword),
        name: adminName,
        role: 'admin',
        companyName: adminCompany,
        phone: adminPhone,
      });
    }

    const existingDemoClient = await User.findOne({ where: { email: clientEmail } });
    if (!existingDemoClient) {
      const clientId = await getNextUserId();
      await User.create({
        id: clientId,
        email: clientEmail,
        passwordHash: hashPassword(clientPassword),
        name: clientName,
        role: 'client',
        companyName: clientCompany,
        phone: clientPhone,
      });
    }

    const templateRecord = await CompanyTemplateStoreModel.findByPk('current_store');
    if (!templateRecord) {
      const { getCompanyTemplateStore } = await import('@/lib/templates');
      const defaultStore = getCompanyTemplateStore();
      await CompanyTemplateStoreModel.create({
        id: 'current_store',
        payload: JSON.stringify(defaultStore),
      });
    }
  } catch (seedErr) {
    console.error('Database background seed error:', seedErr);
  }
}

export async function getNextUserId(): Promise<string> {
  const users = await User.findAll({ attributes: ['id'] });
  const numIds = users
    .map(u => parseInt(String(u.id), 10))
    .filter(n => !isNaN(n) && n > 0);
  const maxId = numIds.length > 0 ? Math.max(...numIds) : 0;
  return String(maxId + 1);
}

export async function getNextProjectId(): Promise<string> {
  const projects = await Project.findAll({ attributes: ['id'] });
  const numIds = projects
    .map(p => parseInt(String(p.id), 10))
    .filter(n => !isNaN(n) && n > 0);
  const maxId = numIds.length > 0 ? Math.max(...numIds) : 0;
  return String(maxId + 1);
}

export async function resequenceUsers(): Promise<void> {
  try {
    const users = await User.findAll({ order: [['createdAt', 'ASC']] });
    let counter = 1;
    for (const u of users) {
      const newId = String(counter++);
      if (String(u.id) !== newId) {
        const oldId = String(u.id);
        const tempId = `tmp_u_${Date.now()}_${newId}`;
        await User.update({ id: tempId }, { where: { id: oldId } });
        await User.update({ id: newId }, { where: { id: tempId } });
        await Project.update({ clientId: newId }, { where: { clientId: oldId } });
      }
    }
  } catch (err) {
    console.error('Error re-sequencing users:', err);
  }
}

export async function resequenceProjects(): Promise<void> {
  try {
    const projects = await Project.findAll({ order: [['createdAt', 'ASC']] });
    let counter = 1;
    for (const p of projects) {
      const newId = String(counter++);
      if (String(p.id) !== newId) {
        const oldId = String(p.id);
        const tempId = `tmp_p_${Date.now()}_${newId}`;
        await Project.update({ id: tempId }, { where: { id: oldId } });
        await Project.update({ id: newId }, { where: { id: tempId } });
      }
    }
  } catch (err) {
    console.error('Error re-sequencing projects:', err);
  }
}

export async function initDb(): Promise<Sequelize> {
  if (globalForSequelize.dbInitialized) {
    return sequelize;
  }
  if (!globalForSequelize.initDbPromise) {
    globalForSequelize.initDbPromise = (async () => {
      try {
        await sequelize.authenticate();
        await sequelize.sync();
        await seedDatabaseAsync();
        globalForSequelize.dbInitialized = true;
        return sequelize;
      } catch (e) {
        try {
          await sequelize.sync({ alter: true });
          await seedDatabaseAsync();
          globalForSequelize.dbInitialized = true;
          return sequelize;
        } catch (alterErr) {
          console.error('Sequelize sync error:', alterErr);
          globalForSequelize.initDbPromise = null;
          throw alterErr;
        }
      }
    })();
  }
  return globalForSequelize.initDbPromise;
}

export { sequelize };

