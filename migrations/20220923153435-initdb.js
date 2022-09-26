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
      'activities',
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
        created_t: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: true,
          defaultValue: Sequelize.fn('NOW'),
        },
        updated_at: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          field: 'deleted_at',
          allowNull: true,
        },
      },
      {transaction},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'todos',
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
          references: {model: 'activities', key: 'id'},
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(255), 
          field: 'title', 
          allowNull: false
        },
        is_active: {
          type: Sequelize.INTEGER,
          field: 'is_active',
          default: true,
          allowNull: false,
        },
        priority: {
          type: Sequelize.ENUM('low','high','very-high'),
          field: 'priority',
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: true,
          defaultValue: Sequelize.fn('NOW'),
        },
        updated_at: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          field: 'deleted_at',
          allowNull: true,
        },
      },
      {transaction},
    ],
  },

    //index
    {
      fn: 'addIndex',
      params: [
        'todos',
        [{name: 'activity_group_id'}],
        {
          indexName: 'activity_group_id',
          name: 'activity_group_id',
          transaction,
        },
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
