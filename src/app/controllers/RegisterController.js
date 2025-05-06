const users = require("../models/User");
const { toObject } = require("../../util/mysql");
const { param } = require("express/lib/request");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const siteController = require("./SiteController");
const { log } = require("console");

class RegisterController {
  show(req, res, next) {
    var token = req.cookies.token;
    if (token) {
      res.clearCookie("token");
    }
    res.sendFile(path.join(__dirname, "../../views/register.html"));
  }
  
  async register(req, res, next) {
    try {
      // Kiểm tra xem username hoặc email đã tồn tại chưa
      const existingUser = await users.findByUsername(req.body.username) || 
                           await users.findByEmail(req.body.email);
      
      if (existingUser) {
        return res.json("user got duplicated");
      }
      
      // Chuẩn bị dữ liệu user mới
      const userData = {
        ...req.body,
        avatar_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        phoneNumber: `Bạn chưa liên kết số điện thoại`,
        role: `member`,
        address: `Chưa cập nhật`,
        dob: `Chưa cập nhật`,
        gender: `Chưa cập nhật`,
      };
      
      // Hash password
      const hash = await bcrypt.hash(userData.password, 10);
      userData.password = hash;
      
      // Lưu user vào database
      await users.create(userData);
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }
}

module.exports = new RegisterController();
