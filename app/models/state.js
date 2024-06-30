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

const State = sequelize.define("State", {
  name: {
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
  fips_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  iso2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
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

State.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  delete values.createdAt;
  delete values.updatedAt;
  return values;
}

// State.belongsTo(Country, { foreignKey: 'country_id' });

module.exports = {
  sequelize,
  State
};
