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

const Country = sequelize.define("Country", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  iso3: {
    type: DataTypes.STRING(3),
    allowNull: true
  },
  numeric_code: {
    type: DataTypes.STRING(3),
    allowNull: true
  },
  iso2: {
    type: DataTypes.STRING(2),
    allowNull: true
  },
  phonecode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  capital: {
    type: DataTypes.STRING,
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: true
  },
  currency_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  currency_symbol: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tld: {
    type: DataTypes.STRING,
    allowNull: true
  },
  native: {
    type: DataTypes.STRING,
    allowNull: true
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subregion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true
  },
  timezones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  translations: {
    type: DataTypes.TEXT,
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
  emoji: {
    type: DataTypes.STRING,
    allowNull: true
  },
  emojiU: {
    type: DataTypes.STRING,
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
    comment: 'Rapid API GeoDB'
  }
});

Country.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  delete values.createdAt;
  delete values.updatedAt;
  return values;
}

module.exports = {
  sequelize,
  Country
};
