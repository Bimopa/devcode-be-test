const Sequelize = require('sequelize');

const info = {
  revision: 1,
  name: 'init',
  comment: '',
};

const migrationCommands = transaction => [
  {
    fn: 'createTable',
    params: [
      'Activity',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(255), 
          field: 'email', 
          allowNull: false
        },
        title: {
          type: Sequelize.STRING(255), 
          field: 'title', 
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: true,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: true,
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deletedAt',
          allowNull: true,
        },
      },
      {transaction},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Todo',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        activity_group_id: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          field: 'activity_group_id',
          references: {model: 'Activity', key: 'id'},
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(255), 
          field: 'title', 
          allowNull: false
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          field: 'is_active',
          default: true,
          allowNull: false,
        },
        priority: {
          type: Sequelize.ENUM('low','high','very-high'),
          field: 'priority',
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: true,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: true,
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deletedAt',
          allowNull: true,
        },
      },
      {transaction},
    ],
  },
]
const rollbackCommands = transaction => [];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = transaction => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (this.useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) => execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) => execute(queryInterface, sequelize, rollbackCommands),
  info,
};
