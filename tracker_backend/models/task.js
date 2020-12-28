'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Projects, {
        foreignKey: "project_id",
        onDelete: "CASCADE"
      })
    }
  };
  Task.init({
    project_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    start_datetime: DataTypes.DATE,
    end_datetime: DataTypes.DATE,
    clocked_time: DataTypes.INTEGER,
    is_billable: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};