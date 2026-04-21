const knex = require('knex');
const knexfile = require('./knexfile');
const path = require('path');

// Force development config (SQLite)
const environment = process.env.NODE_ENV === 'production'
    ? 'development'
    : process.env.NODE_ENV || 'development';

const configOptions = knexfile[environment];

// 🔥 Fix SQLite path for Vercel
if (configOptions.client === 'sqlite3') {
    configOptions.connection.filename = path.join('/tmp', 'dev.sqlite3');
    configOptions.useNullAsDefault = true;
}

module.exports = knex(configOptions);