const users = require('../models/User');
const { toObject } = require('../../util/mysql');
const { param } = require("express/lib/request");
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const siteController = require('./SiteController');

class LoginController {
    show (req, res, next){
        var token = req.cookies.token;
        res.clearCookie('connect.sid');
        console.log(req.user);
        if (token) {
            res.clearCookie('token');
        }
        res.sendFile(path.join(__dirname, '../../views/login.html'));
    }
    
    async authenticate(req, res, next) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;

            // Tìm kiếm người dùng theo username hoặc email
            let data;
            if (username) {
                data = await users.findByUsername(username);
            } else if (email) {
                data = await users.findByEmail(email);
            }

            if (data) {
                // So sánh password
                const result = await bcrypt.compare(password, data.password);
                if (result) {
                    const token = jwt.sign({
                        _id: data.id, // Sử dụng id thay cho _id trong MySQL
                    }, 'mk');
                    return res.json({
                        success: true,
                        token: token,
                    });
                } else {
                    return res.json({
                        success: false,
                    });
                }
            } else {
                return res.json('that bai');
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'loi server' });
        }
    }
    
    checkAuth(req, res, next) {
        try {
            var token = req.cookies.token;
            var result = jwt.verify(token, 'mk');
            if(result) {
                next();
            }
        } catch (error) {
            return res.redirect('/login');
        }
    }
    
    accepted(req, res, next) {
        res.json('Welcome');
    }
}

module.exports = new LoginController();