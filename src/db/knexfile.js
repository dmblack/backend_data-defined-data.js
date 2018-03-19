var path = require('path');

module.exports = {
  test: {
    client: 'testddd',
    debug: false,
    connection: {
      // socketPath: '/var/run/mysqld/mysqld.sock',
      host: '127.0.0.1',
      port: '5432',
      user: 'test_ddd',
      password: '()m-vD!-[tG-F4)',
      database: 'test_ddd'
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
      user: 'development_ddd',
      password: '()m-vD!-[tG-F4)',
      database: 'development_ddd'
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
  production: {
    client: 'postgresql',
    debug: false,
    connection: {
      // socketPath: '/var/run/mysqld/mysqld.sock',
      host: '127.0.0.1',
      port: '5432',
      user: 'production_ddd',
      password: '()m-vD!-[tG-F4)',
      database: 'production_ddd'
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
