var DataTypes = require('sequelize').DataTypes;
var _Activity = require('./Activity');
var _Todo = require('./Todo');

function initModels(sequelize) {
  var Activity = _Activity(sequelize, DataTypes);
  var Todo = _Todo(sequelize, DataTypes);

  Activity.hasMany(Todo, {as: 'todos', foreignKey: 'activity_group_id'});
  Todo.belongsTo(Activity, {as: 'activitiy', foreignKey: 'activity_group_id'});
  
  return {
    Activity,
    Todo
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
