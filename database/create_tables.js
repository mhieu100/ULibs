const { pool } = require('../src/config/db/mysql');

async function createTables() {
  try {

    const connection = await pool.getConnection();
    connection.release();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        displayName VARCHAR(255),
        address VARCHAR(255),
        dob VARCHAR(255),
        gender VARCHAR(25),
        avatar_img VARCHAR(500),
        phoneNumber VARCHAR(255),
        role VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bookName VARCHAR(255) NOT NULL,
        description TEXT,
        price VARCHAR(255),
        image VARCHAR(255),
        slug VARCHAR(255) UNIQUE,
        authorName VARCHAR(255),
        raiing FLOAT,
        catelogy VARCHAR(255),
        deletedAt TIMESTAMP NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    process.exit(0);
  } catch (error) {
    console.error('Lu1ed7i khi tu1ea1o bu1ea3ng:', error);
    process.exit(1);
  }
}

createTables();
