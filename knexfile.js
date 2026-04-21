require("dotenv").config();

const fs = require('fs');
const path = require('path');

const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
const isPostgres = dbUrl && dbUrl.startsWith('postgres');

// Default SQLite path
let sqlitePath = path.resolve(__dirname, 'dev.sqlite3');

// ✅ Vercel fix (production serverless)
if (!isPostgres && process.env.NODE_ENV === 'production') {
  sqlitePath = '/tmp/dev.sqlite3';

  try {
    const source = path.resolve(__dirname, 'dev.sqlite3');

    if (fs.existsSync(source) && !fs.existsSync(sqlitePath)) {
      fs.copyFileSync(source, sqlitePath);
      console.log('✅ SQLite DB copied to /tmp');
    }
  } catch (e) {
    console.error("❌ SQLite workaround failed:", e);
  }
}

const baseConfig = {
  client: isPostgres ? 'postgresql' : 'sqlite3',
  connection: isPostgres
    ? dbUrl
    : { filename: sqlitePath },
  useNullAsDefault: true,
  migrations: {
    tableName: 'knex_migrations'
  }
};

module.exports = {
  development: baseConfig,

  production: {
    ...baseConfig,
    connection: isPostgres
      ? (dbUrl + (dbUrl.includes('?') ? '&' : '?') + 'sslmode=require')
      : { filename: sqlitePath },
    pool: {
      min: 0,
      max: 5 // 🔥 safer for serverless
    }
  }
};