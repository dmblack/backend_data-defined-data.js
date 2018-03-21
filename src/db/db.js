const config = require('./knexfile.js');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(config[environment]);

module.exports = knex;

knex.migrate.latest([config]);
