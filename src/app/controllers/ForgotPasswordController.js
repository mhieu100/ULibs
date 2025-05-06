const { multipleToObject } = require('../../util/mysql');
const { param } = require("express/lib/request");
const path = require('path');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const mailer = require('../../util/mailler');
const bcrypt = require('bcrypt');
const mlt = require('../../util/otp.mailler-template');

const rn = require('random-number');
var OTP;
const options = {
  min:  100000
, max:  999999
, integer: true
}

class ForgotPasswordController {
    show(req, res, next) {
        var token = req.cookies.token;
        if (token) {
            res.clearCookie('token');
        }
        res.sendFile(path.join(__dirname, '../../views/forgot_password.html'));
    }
    
    async find(req, res, next) {
        try {
            const email = req.body.email;
            const sending_otp = req.body.otp;
            const newPassword = req.body.password;
            
            if (req.body.code === 'email') {
                const user = await Users.findByEmail(email);
                if (user) {
                    OTP = rn(options);
                    mailer.sendMail(
                        email,
                        'Yêu cầu đổi mật khẩu',
                        mlt.mailContent(OTP),
                    );
                    res.json({message: true});
                } else {
                    res.json({message: false});
                }
            }
            
            if (req.body.code === 'otp') {
                let check = sending_otp == ('' + OTP);
                res.json({message: check});
            }
            
            if (req.body.code === 'new-password') {
                const user = await Users.findByEmail(email);
                if (!user) {
                    return res.json({message: false});
                }
                
                const hash_password = await bcrypt.hash(newPassword, 10);
                
                // Cập nhật password mới
                await Users.updateById(user.id, {
                    password: hash_password,
                });
                
                // Lấy dữ liệu user sau khi cập nhật
                const updatedUser = await Users.findByEmail(email);
                
                const token = jwt.sign({
                    _id: updatedUser.id,
                }, 'mk');
                
                res.json({
                    message: !!updatedUser,
                    token,
                });
            }
        } catch (err) {
            console.error(err);
            res.json({message: false, error: err.message});
        }
    }
}

module.exports = new ForgotPasswordController();