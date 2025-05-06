const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'b8fopqsxizltq02hgt0g-mysql.services.clever-cloud.com',
  user: 'uoz7ackw3iinwujc',
  password: 'SwxuJW0oLQPRvhK4Hs9b', 
  database: 'b8fopqsxizltq02hgt0g',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function connect() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL Connect Successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('MySQL Connect Failure:', error);
    return false;
  }
}

module.exports = { pool, connect };
