const { pool } = require('../../config/db/mysql');

// User model functions for MySQL
const User = {
  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);
    return rows[0];
  },
  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
    return rows[0];
  },
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  },
  async create(data) {
    const [result] = await pool.query('INSERT INTO users SET ?', [data]);
    return result.insertId;
  },
  async updateById(id, data) {
    await pool.query('UPDATE users SET ? WHERE id = ?', [data, id]);
  },
  async deleteById(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  }
};

module.exports = User;
