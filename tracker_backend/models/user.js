'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email_id: DataTypes.STRING,
    password: DataTypes.TEXT,
    type: DataTypes.ENUM('A', 'E'),
    active: DataTypes.BOOLEAN,
    image_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};