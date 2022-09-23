'use strict';
const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('sewasam-ns');
Sequelize.useCLS(namespace);
const initModel = require('./init-models');

let db = new Sequelize(process.env.MYSQL_DBNAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
  timezone: '+07:00',
  logging: false,
  pool: {
    max: 100,
  },
  retry: {
    max: 0,
  },
});

const model = initModel(db);

model.db = db;

module.exports = model;
