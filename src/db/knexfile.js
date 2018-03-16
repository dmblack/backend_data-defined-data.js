var path = require('path');

module.exports = {
  test: {
    client: 'postgresql',
    debug: false,
    connection: {
      // socketPath: '/var/run/mysqld/mysqld.sock',
      host: '127.0.0.1',
      port: '5432',
      user: 'datawarehouse',
      password: '()m-vD!-[tG-F4)',
      database: 'datawarehouse'
    },
    pool: {
      min: 0,
      max: 7
    },
    migrations: {
      directory: path.join(__dirname, '/migrations/')
    },
    seeds: {
      directory: path.join(__dirname, '/seeds/')
    }
  },
  development: {
    client: 'postgresql',
    debug: true,
    connection: {
      // socketPath: '/var/run/mysqld/mysqld.sock',
      host: '127.0.0.1',
      port: '5432',
      user: 'datawarehouse',
      password: '()m-vD!-[tG-F4)',
      database: 'datawarehouse'
    },
    pool: {
      min: 0,
      max: 7
    },
    migrations: {
      directory: path.join(__dirname, '/migrations/')
    },
    seeds: {
      directory: path.join(__dirname, '/seeds/')
    }
  }
};
