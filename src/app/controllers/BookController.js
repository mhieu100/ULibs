const books = require("../models/Book");
const { param } = require("express/lib/request");

class BookController {
  
    // [GET] /search
    async show(req, res, next) {
        try {
            const book = await books.findOneBySlug(req.params.slug);
            res.render('books/show', {
                book: book
            });
        } catch (error) {
            next(error);
        }
    }
    
    // [GET] /admin/products
    async showAll(req, res, next) {
        try {
            const booksList = await books.findAll();
            return res.json({
                "success": true,
                "books": booksList,
            });
        } catch (error) {
            next(error);
        }
    }
    
    // [GET] /books/search
    async search(req, res, next) {
        try {
            const book = await books.findOneByName(req.query.tag);
            res.render('books/show', {
                book: book
            });
        } catch (error) {
            next(error);
        }
    }
    
    // [GET] /books/create
    create(req, res, next) {
        res.render('books/create');
    }

    // [POST] /books/create
    async store(req, res, next) {
        try {
            const formData = req.body;
            // Tạo slug từ bookName nếu không có
            if (!formData.slug && formData.bookName) {
                formData.slug = formData.bookName
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');
            }
            await books.create(formData);
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }

    // [GET] /books/:id/create
    async edit(req, res, next) {
        try {
            const book = await books.findById(req.params.id);
            res.render('books/edit', {
                book: book
            });
        } catch (error) {
            next(error);
        }
    }
    
    // [PUT] /books/:id
    async update(req, res, next) {
        try {
            await books.updateById(req.params.id, req.body);
            res.redirect('/me/stored/books');
        } catch (error) {
            next(error);
        }
    }
    
    // [DELETE] /books/:id
    async delete(req, res, next) {
        try {
            await books.deleteById(req.params.id);
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }
}
   
module.exports = new BookController();