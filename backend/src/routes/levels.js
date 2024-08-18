// useRoute.js
const express = require('express');
const router = express.Router();

const levelController = require('../controllers/LevelController');
router.get('/', levelController.getAllLevels);
router.get('/getLevelId', levelController.getLevelsWithSubjectById);
router.get('/getLevels', levelController.getLevelAndCollectionChilds);
router.post('/createLevel', levelController.createLevel);




module.exports = router;
