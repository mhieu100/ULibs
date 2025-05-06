const { pool } = require('../../config/db/mysql');

// Book model functions for MySQL
const Book = {
  async findOneBySlug(slug) {
    const [rows] = await pool.query('SELECT * FROM books WHERE slug = ? LIMIT 1', [slug]);
    return rows[0];
  },
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM books');
    return rows;
  },
  async findOneByName(bookName) {
    const [rows] = await pool.query('SELECT * FROM books WHERE bookName = ? LIMIT 1', [bookName]);
    return rows[0];
  },
  async findByCatelogy(catelogy) {
    const [rows] = await pool.query('SELECT * FROM books WHERE catelogy = ?', [catelogy]);
    return rows;
  },
  async create(data) {
    const [result] = await pool.query('INSERT INTO books SET ?', [data]);
    return result.insertId;
  },
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM books WHERE id = ? LIMIT 1', [id]);
    return rows[0];
  },
  async updateById(id, data) {
    await pool.query('UPDATE books SET ? WHERE id = ?', [data, id]);
  },
  async deleteById(id) {
    await pool.query('DELETE FROM books WHERE id = ?', [id]);
  }
};

module.exports = Book;