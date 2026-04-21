require("dotenv").config();

const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
const isPostgres = dbUrl && dbUrl.startsWith('postgres');

module.exports = {
  development: {
    client: isPostgres ? 'postgresql' : 'sqlite3',
    connection: isPostgres ? dbUrl : { filename: './dev.sqlite3' },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: dbUrl ? (dbUrl + (dbUrl.includes('?') ? '&' : '?') + 'sslmode=require') : undefined,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
