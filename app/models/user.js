require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
  }
);

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registeredAt: {
    type: DataTypes.VIRTUAL,
    get() {
      const date = this.getDataValue('createdAt');
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    },
    set(value) {
      throw new Error('Do not try to set the `createdAt` value!');
    },
  }
});

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  delete values.password;
  delete values.createdAt;
  delete values.updatedAt;
  return values;
}

module.exports = {
  sequelize,
  User
};