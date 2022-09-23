const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Todo ',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      activity_group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Activity',
          },
          key: 'id',
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: ""
      },
      priority: {
        type: DataTypes.ENUM('low', 'high', 'very-high'),
        allowNull: false,
        defaultValue: ""
      },
    },
    {
      sequelize,
      tableName: 'Todo',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: 'Todo_activityGroupId_foreign',
          fields: [
            {name: 'activity_group_id'}
          ],
        },
      ]
    },
  );
};
