const fs = require('fs');
const path = require('path');
const { pool } = require('../src/config/db/mysql');

const booksData = JSON.parse(fs.readFileSync(path.join(__dirname, 'books.json'), 'utf8'));
const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8'));

async function importBooks() {
  try {
    console.log(`Bu1eaft u0111u1ea7u import ${booksData.length} su00e1ch...`);
    
    await pool.query('TRUNCATE TABLE books');
    
    for (const book of booksData) {
      const bookData = {
        bookName: book.bookName,
        description: book.description || '',
        price: book.price || '0',
        image: book.image || '',
        slug: book.slug || '',
        authorName: book.authorName || '',
        raiing: book.raiing || 0,
        catelogy: book.catelogy || '',
        createdAt: book.createdAt && book.createdAt.$date ? new Date(parseInt(book.createdAt.$date.$numberLong)) : new Date(),
        updatedAt: book.updatedAt && book.updatedAt.$date ? new Date(parseInt(book.updatedAt.$date.$numberLong)) : new Date()
      };
      
      await pool.query('INSERT INTO books SET ?', bookData);
    }
    
    console.log('Import su00e1ch hou00e0n tu1ea5t!');
  } catch (error) {
    console.error('Lu1ed7i khi import su00e1ch:', error);
  }
}

async function importUsers() {
  try {
    console.log(`Bu1eaft u0111u1ea7u import ${usersData.length} ngu01b0u1eddi du00f9ng...`);
    
    await pool.query('TRUNCATE TABLE users');
    
    for (const user of usersData) {
      const userData = {
        username: user.username,
        password: user.password || '',
        email: user.email || '',
        displayName: user.displayName || '',
        address: user.address || 'Chu01b0a cu1eadp nhu1eadt',
        dob: user.dob || 'Chu01b0a cu1eadp nhu1eadt',
        gender: user.gender || 'Chu01b0a cu1eadp nhu1eadt',
        avatar_img: user.avatar_img || '',
        phoneNumber: user.phoneNumber || 'Bu1ea1n chu01b0a liu00ean ku1ebft su1ed1 u0111iu1ec7n thou1ea1i',
        role: user.role || 'member',
        createdAt: user.createdAt && user.createdAt.$date ? new Date(parseInt(user.createdAt.$date.$numberLong)) : new Date(),
        updatedAt: user.updatedAt && user.updatedAt.$date ? new Date(parseInt(user.updatedAt.$date.$numberLong)) : new Date()
      };
      
      await pool.query('INSERT INTO users SET ?', userData);
    }
    
    console.log('Import ngu01b0u1eddi du00f9ng hou00e0n tu1ea5t!');
  } catch (error) {
    console.error('Lu1ed7i khi import ngu01b0u1eddi du00f9ng:', error);
  }
}

async function importData() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    
    await importBooks();
    await importUsers();
    
    console.log('Hou00e0n tu1ea5t import du1eef liu1ec7u!');
    process.exit(0);
  } catch (error) {
    console.error('Lu1ed7i:', error);
    process.exit(1);
  }
}

importData();
