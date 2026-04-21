require("dotenv").config();

const fs = require('fs');
const path = require('path');

const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
const isPostgres = dbUrl && dbUrl.startsWith('postgres');

// Vercel Serverless Function SQLite Workaround (Read-Only Filesystem Fix)
let sqlitePath = './dev.sqlite3';
if (!isPostgres && process.env.VERCEL) {
  sqlitePath = '/tmp/dev.sqlite3';
  try {
    // If we're booting cold on Vercel, copy the seeded database to the writable /tmp directory
    if (!fs.existsSync(sqlitePath) && fs.existsSync(path.resolve(__dirname, 'dev.sqlite3'))) {
      fs.copyFileSync(path.resolve(__dirname, 'dev.sqlite3'), sqlitePath);
    }
  } catch(e) {
    console.error("Vercel sqlite workaround failed", e);
  }
}

module.exports = {
  development: {
    client: isPostgres ? 'postgresql' : 'sqlite3',
    connection: isPostgres ? dbUrl : { filename: sqlitePath },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: isPostgres ? 'postgresql' : 'sqlite3',
    connection: isPostgres ? (dbUrl + (dbUrl.includes('?') ? '&' : '?') + 'sslmode=require') : { filename: sqlitePath },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
