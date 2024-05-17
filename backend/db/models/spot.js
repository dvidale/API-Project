'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Booking,{
        foreignKey: 'spotId',
        onDelete: 'CASCADE'
      });
      Spot.belongsTo(models.User,{
        foreignKey: 'userId',
        as: 'ownerId'
      });
      Spot.hasMany(models.SpotImage,{
        foreignKey: 'spotId'
      });
      Spot.hasMany(models.Review,{
        foreignKey: 'spotId'
      })
    }
  }
  Spot.init({
    userId:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{model: 'Users',
              key: 'ownerId'
      }
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city:{
      type: DataTypes.STRING(255),
      allowNull:false
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate:{
        len:[2,2],
        isAlpha: true,
        isUppercase: true
      }
    },
    country: {
      type: DataTypes.STRING(255),
    allowNull: false,
      validate:{
        isAlpha: true
      }
  },
    lat: {
      type:DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type:DataTypes.DECIMAL,
    allowNull: false 
  },
    name: {
      type: DataTypes.STRING(50),
    allowNull: false,
    validate:{
      isAlpha: true
    }
  },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
      },
    price: {
      type:DataTypes.DECIMAL,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};