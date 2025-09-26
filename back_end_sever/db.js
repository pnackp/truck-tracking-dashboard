const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'mydb',
  password: 'admin',
  port: 5432, 
});

pool.query('SELECT NOW()', (err, res) => {
  if(err) {
    console.log('DB connection error:', err);
  } else {
    console.log('DB connected! Time:', res.rows[0].now);
  }
});

module.exports = pool;
