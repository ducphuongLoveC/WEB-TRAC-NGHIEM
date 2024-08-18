// useRoute.js
const express = require('express');
const router = express.Router();

const testController = require('../controllers/TestController');
router.get('/');
router.post('/save_tests', testController.saveTests);



module.exports = router;
