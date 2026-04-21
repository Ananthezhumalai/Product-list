const knex = require('knex');
const knexfile = require('./knexfile');

const environment = process.env.NODE_ENV || 'development';
const configOptions = knexfile[environment];

module.exports = knex(configOptions);
