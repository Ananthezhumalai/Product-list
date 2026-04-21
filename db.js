const knex = require('knex');
const knexfile = require('./knexfile');

const environment = process.env.NODE_ENV || 'development';

console.log("ENV:", environment);

const config = knexfile[environment];

console.log("DB CONFIG:", config);

module.exports = knex(config);