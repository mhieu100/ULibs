const Book = require('../models/Book');
const User = require('../models/User');
const { toObject } = require('../../util/mysql');
const jwt = require('jsonwebtoken');
const fileUploader = require('../../config/cloudinary.config');

class MeController {
    async show(req, res, next) {
        try {
            var token = req.cookies.token;
            var result = jwt.verify(token, 'mk');
            if (result) {
                // Su1eed du1ee5ng id thay cho _id trong MySQL
                const user = await User.findById(result._id);
                if (user) {
                    res.render('users/show', {
                        user: user // Khu00f4ng cu1ea7n chuyu1ec3n u0111u1ed5i vu00ec MySQL u0111u00e3 tru1ea3 vu1ec1 object
                    });
                } else {
                    console.log('User not found');
                    res.redirect('/login');
                }
            }
        } catch (error) {
            console.log(error);
            res.redirect('/login');
        }
    }
    
    async update(req, res, next) {
        try {
            const displayName = req.body.displayName;
            const dob = req.body.dob;
            const gender = req.body.gender;
            const id = req.body.id;
            const address = req.body.address;
            const avatar_img = req.file ? req.file.path : null;

            if (!req.file) {
                console.log("No File");
                // Khu00f4ng return su1edbm u0111u1ec3 cu00f3 thu1ec3 cu1eadp nhu1eadt cu00e1c tru01b0u1eddng khu00e1c
            }
            
            // Cu1eadp nhu1eadt du1eef liu1ec7u ngu01b0u1eddi du00f9ng
            const updateData = {
                displayName,
                dob,
                gender,
                address,
            };
            
            // Thu00eam avatar_img nu1ebfu cu00f3 file
            if (avatar_img) {
                updateData.avatar_img = avatar_img;
            }
            
            await User.updateById(id, updateData);
            
            res.json({
                success: true,
            });
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                error: err.message
            });
        }
    }
    
    cart(req, res, next) {
        res.render('cart');
    }
    
    async payment(req, res, next) {
        try {
            var token = req.cookies.token;
            var result = jwt.verify(token, 'mk');
            if (result) {
                const user = await User.findById(result._id);
                if (user) {
                    res.render('payment', {
                        user: user
                    });
                } else {
                    console.log('User not found');
                    res.redirect('/login');
                }
            }
        } catch (error) {
            console.log(error);
            res.redirect('/login');
        }
    }
    
    payment_success(req, res, next) {
        res.render('payment_success');
    }
}

module.exports = new MeController();