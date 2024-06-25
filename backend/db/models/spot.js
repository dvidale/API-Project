'use strict';
const {
  Model,
  ValidationError
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
      Spot.belongsTo(models.User,{
        as: 'owner'        
      });
      Spot.hasMany(models.Booking,{
        foreignKey: 'spotId',
        onDelete: 'CASCADE'
      });
      Spot.hasMany(models.SpotImage,{
        foreignKey: 'spotId',
        onDelete: 'CASCADE'
      });
      Spot.hasMany(models.Review,{
        foreignKey: 'spotId'
      })
    }
  }
  Spot.init({
    ownerId:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model: 'Users'
      }
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city:{
      type: DataTypes.STRING(100),
      allowNull:false
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(100),
    allowNull: false
  },
    lat: {
      type:DataTypes.DECIMAL,
      allowNull: true
    },
    lng: {
      type:DataTypes.DECIMAL,
    allowNull: true 
  },
    name: {
      type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
      },
    price: {
      type:DataTypes.DECIMAL,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};