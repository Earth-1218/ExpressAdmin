require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Read dbconfig.json file
const dbConfigPath = path.resolve(__dirname, 'dbconfig.json');
const dbconfig = JSON.parse(fs.readFileSync(dbConfigPath, 'utf-8'));

// Create a new Sequelize instance using the config object directly
const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig.options);

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