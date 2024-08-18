// useRoute.js
const express = require('express');
const router = express.Router();



const userController = require('../controllers/UserController');
router.post('/', userController.getAllUsers);
router.post('/create_user', userController.createUser);


module.exports = router;
