const Sequelize = require('sequelize');

const connection = new Sequelize('facebook', 'root', 'senhadb',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;