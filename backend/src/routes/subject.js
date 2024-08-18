// useRoute.js
const express = require('express');
const router = express.Router();

const subjectController = require('../controllers/SubjectController');
router.get('/', subjectController.getAllSubject);
router.get('/getSubjectId', subjectController.getSubjectsWithTypeById);
router.post('/createSubject', subjectController.createSubject);



module.exports = router;
