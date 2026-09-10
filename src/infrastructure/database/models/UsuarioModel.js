// src/infrastructure/database/models/UsuarioModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

class UsuarioModel extends Model {}

UsuarioModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
  },
);

module.exports = UsuarioModel;
