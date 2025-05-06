const Book = require('../models/Book');
const { multipleToObject } = require('../../util/mysql');
const jwt = require('jsonwebtoken');
const path = require('path'); 

class SiteController {
    // [GET] /
    async index(req, res, next) {
        try {
            const books = await Book.findAll();
            // Sắp xếp theo thời gian tạo mới nhất (createdAt giảm dần)
            books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            var token = req.cookies.token;
            var result = jwt.verify(token, 'mk');
            console.log(result);
            
            res.render('home', {
                books: books, // Không cần chuyển đổi vì MySQL đã trả về object
            });
        } catch (error) {
            next(error);
        }
    }
    
    async showVietNamBooks(req, res, next) {
        try {
            // Sử dụng query SQL để lọc theo catelogy
            const [books] = await Book.findByCatelogy("Sách Tiếng Việt");
            
            res.render('home', {
                books: books,
            });
        } catch (error) {
            next(error);
        }
    }
    
    async showEnglishBooks(req, res, next) {
        try {
            const books = await Book.findByCatelogy("Sách Tiếng Anh");
            
            res.render('home', {
                books: books,
            });
        } catch (error) {
            next(error);
        }
    }
    
    async showAbilitiesBooks(req, res, next) {
        try {
            const books = await Book.findByCatelogy("Sách kỹ năng sống");
            
            res.render('home', {
                books: books,
            });
        } catch (error) {
            next(error);
        }
    }
    
    async showDetectiveBooks(req, res, next) {
        try {
            const books = await Book.findByCatelogy("Truyện trinh thám");
            
            res.render('home', {
                books: books,
            });
        } catch (error) {
            next(error);
        }
    }
    
    async showComicBooks(req, res, next) {
        try {
            const books = await Book.findByCatelogy("Truyện tranh");
            
            res.render('home', {
                books: books,
            });
        } catch (error) {
            next(error);
        }
    }
    
    showForgetPassword(req, res, next) {
        res.sendFile(path.join(__dirname, '../../views/forgot_password.html'));
    }
}

module.exports = new SiteController();