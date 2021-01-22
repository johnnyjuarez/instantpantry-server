require('dotenv').config();
const pg = require('pg');

pg.defaults.ssl = true;

module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'connectionString':
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
  'ssl': 'true'
};