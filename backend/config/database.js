const Sequelize = require('sequelize')
const path = require('path');

const connection = require('./connection')

let database;
console.info('NODE_ENV:', process.env.NODE_ENV || 'production');

switch (process.env.NODE_ENV || 'development') {

    default: database = new Sequelize(
        connection.development.database,
        connection.development.user,
        connection.development.password, {
            host: connection.development.host,
            dialect: connection.development.dialect,
            pool: {
                max: 5,
                min: 0,
                idle: 10000,
            },
            // storage: path.join(process.cwd(), 'db', 'database.sqlite'),
        },
    );
}
module.exports = database;