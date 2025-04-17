require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Set to true in production
  },
});

// Test the connection
pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

module.exports = pool;