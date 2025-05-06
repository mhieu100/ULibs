const path = require('path');
const { toObject } = require('../../util/mysql');
const users = require('../models/User');

class AdminController {
  show(req, res, next) {
    res.sendFile(path.join(__dirname, '../../views/admin/index.html'));
  }
  
  showProductListView(req, res, next) {
    res.sendFile(path.join(__dirname, '../../views/admin/product-manager.html'));
  }
  
  showUserListView(req, res, next) {
    res.sendFile(path.join(__dirname, '../../views/admin/user-manager.html'));
  }
  
  async showAllUser(req, res, next) {
    try {
      const usersList = await users.findAll();
      
      // Sắp xếp theo thời gian từ mới nhất (createdAt giảm dần)
      usersList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      return res.json({
        success: true,
        users: usersList
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
}
   
module.exports = new AdminController();