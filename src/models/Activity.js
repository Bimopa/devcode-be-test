const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Activity',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      }
    },
    {
      sequelize,
      tableName: 'activities',
      paranoid: true,
      underscored: true
    },
  );
};
