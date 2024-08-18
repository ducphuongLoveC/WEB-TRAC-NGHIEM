// useRoute.js
const express = require('express');
const router = express.Router();

const ExamResultController = require('../controllers/ExamResultController');

router.get('/get_info_exam_result', ExamResultController.getInfoResultExam);
router.post('/create_exam_result', ExamResultController.createExamResult);

module.exports = router;
