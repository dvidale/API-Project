"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Booking, {
        foreignKey: 'userId'
      })
    }
  }
  User.init(
    {
      firstName:{
        type: DataTypes.STRING(30),
        allowNull: false,
        validate:{
          notEmpty: true,
          isAlpha: true
        }
      },
      lastName:{
        type: DataTypes.STRING(30),
        allowNull: false,
        validate:{
          notEmpty: true,
          isAlpha: true
        }
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        allowNull: false,
        len: [60, 60],
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope:{
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      }
    }
  );
  return User;
};
