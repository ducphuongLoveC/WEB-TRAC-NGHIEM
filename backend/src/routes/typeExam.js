// useRoute.js
const express = require('express');
const router = express.Router();


const typeExamController = require('../controllers/TypeExamController');
router.get('/', typeExamController.getAllTypeExam);
router.get('/getTypeExamWithTest', typeExamController.getTypeExamsWithTest);

router.post('/create_type_exam', typeExamController.createTypeExam);



module.exports = router;
