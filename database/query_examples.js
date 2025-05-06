const { pool } = require('../src/config/db/mysql');

async function queryExamples() {
  try {
    console.log('Bu1eaft u0111u1ea7u thu1ef1c hiu1ec7n cu00e1c cu00e2u tru1ee5y vu1ea5n...');
    
    // 1. Lu1ea5y tu1ea5t cu1ea3 ngu01b0u1eddi du00f9ng
    console.log('\n1. Lu1ea5y danh su00e1ch ngu01b0u1eddi du00f9ng:');
    const [users] = await pool.query('SELECT id, username, email, displayName, role FROM users LIMIT 5');
    console.log(users);
    
    // 2. Lu1ea5y tu1ea5t cu1ea3 su00e1ch
    console.log('\n2. Lu1ea5y danh su00e1ch su00e1ch:');
    const [books] = await pool.query('SELECT id, bookName, authorName, price, catelogy FROM books LIMIT 5');
    console.log(books);
    
    // 3. Lu1ea5y su00e1ch theo theu1ec3 lou1ea1i
    console.log('\n3. Lu1ea5y su00e1ch theo theu1ec3 lou1ea1i:');
    const [booksByCategory] = await pool.query('SELECT id, bookName, authorName FROM books WHERE catelogy = ? LIMIT 5', ['Su00e1ch Tiu1ebfng Viu1ec7t']);
    console.log(booksByCategory);
    
    // 4. Tu00ecm kiu1ebfm su00e1ch theo tu00ean
    console.log('\n4. Tu00ecm kiu1ebfm su00e1ch theo tu00ean:');
    const [booksByName] = await pool.query('SELECT id, bookName, authorName, price FROM books WHERE bookName LIKE ? LIMIT 5', ['%Cam%']);
    console.log(booksByName);
    
    // 5. Lu1ea5y ngu01b0u1eddi du00f9ng theo vai tru00f2
    console.log('\n5. Lu1ea5y ngu01b0u1eddi du00f9ng theo vai tru00f2:');
    const [usersByRole] = await pool.query('SELECT id, username, email, displayName FROM users WHERE role = ? LIMIT 5', ['member']);
    console.log(usersByRole);
    
    // 6. u0110u1ebfm su1ed1 lu01b0u1ee3ng su00e1ch theo theu1ec3 lou1ea1i
    console.log('\n6. u0110u1ebfm su1ed1 lu01b0u1ee3ng su00e1ch theo theu1ec3 lou1ea1i:');
    const [bookCount] = await pool.query('SELECT catelogy, COUNT(*) as count FROM books GROUP BY catelogy');
    console.log(bookCount);
    
    // 7. Su1eafp xu1ebfp su00e1ch theo giu00e1
    console.log('\n7. Su1eafp xu1ebfp su00e1ch theo giu00e1 (cao u0111u1ebfn thu1ea5p):');
    const [booksByPrice] = await pool.query('SELECT id, bookName, authorName, price FROM books ORDER BY CAST(price AS DECIMAL) DESC LIMIT 5');
    console.log(booksByPrice);
    
    // 8. Tu00ecm kiu1ebfm ngu01b0u1eddi du00f9ng theo email
    console.log('\n8. Tu00ecm kiu1ebfm ngu01b0u1eddi du00f9ng theo email:');
    const [userByEmail] = await pool.query('SELECT id, username, email, displayName FROM users WHERE email = ?', ['admin@gmail.com']);
    console.log(userByEmail);
    
    // 9. Lu1ea5y su00e1ch theo ID
    console.log('\n9. Lu1ea5y su00e1ch theo ID:');
    const [bookById] = await pool.query('SELECT * FROM books WHERE id = ? LIMIT 1', [1]);
    console.log(bookById);
    
    // 10. Lu1ea5y su00e1ch mu1edbi nhu1ea5t
    console.log('\n10. Lu1ea5y su00e1ch mu1edbi nhu1ea5t:');
    const [latestBooks] = await pool.query('SELECT id, bookName, authorName, createdAt FROM books ORDER BY createdAt DESC LIMIT 5');
    console.log(latestBooks);
    
    console.log('\nHou00e0n tu1ea5t cu00e1c cu00e2u tru1ee5y vu1ea5n!');
    process.exit(0);
  } catch (error) {
    console.error('Lu1ed7i khi thu1ef1c hiu1ec7n tru1ee5y vu1ea5n:', error);
    process.exit(1);
  }
}

// Thu1ef1c hiu1ec7n cu00e1c cu00e2u tru1ee5y vu1ea5n
queryExamples();
