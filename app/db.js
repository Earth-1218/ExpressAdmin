const { Sequelize } = require('sequelize');
require('dotenv').config();

// Option 1: SQLite in-memory database
// const dbconnection = new Sequelize('sqlite::memory:');

// Option 2: SQLite with a file
// const dbconnection = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: PostgreSQL
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

// Option 4: MySQL
const dbconnection = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
  }
);

// const dbconnection = new Sequelize({
//   dialect: 'mysql',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

// Option 5: Other dialects
// const dbconnection = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

dbconnection.authenticate()
.then(() => {
  console.log('Database connected successfully!');
})
.catch(err => {
  console.error('Error connecting to database:', err);
});

module.exports = dbconnection;
