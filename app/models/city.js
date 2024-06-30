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

const City = sequelize.define("City", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  state_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  country_code: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: '2014-01-01 06:31:01'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  flag: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  wikiDataId: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Rapid API GeoDB Cities'
  }
});

City.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  delete values.createdAt;
  delete values.updatedAt;
  return values;
}

// City.belongsTo(State, { foreignKey: 'state_id' });
// City.belongsTo(Country, { foreignKey: 'country_id' });


module.exports = {
  sequelize,
  City
};
