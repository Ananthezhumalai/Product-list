require("dotenv").config();
const path = require('path');

const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
const isPostgres = dbUrl && dbUrl.startsWith('postgres');

module.exports = {
  development: {
    client: isPostgres ? 'postgresql' : 'better-sqlite3',
    connection: isPostgres
      ? dbUrl
      : { filename: path.resolve(__dirname, 'dev.sqlite3') },
    useNullAsDefault: true
  },

  production: {
    client: isPostgres ? 'postgresql' : 'better-sqlite3',
    connection: isPostgres
      ? dbUrl
      : { filename: path.resolve(__dirname, 'dev.sqlite3') },
    useNullAsDefault: true
  }
};