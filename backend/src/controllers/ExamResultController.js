
const Exam_result = require('../models/ExamResult');

class ExamResultController {

    async createExamResult(req, res) {
        try {
            const { completed,
                id_type_exam,
                id_user,
                score
            } = req.body;

            const newExamResult = new Exam_result({
                completed, id_type_exam, id_user, score
            });

            const createdExamResult = await newExamResult.save();

            res.status(201).json(createdExamResult);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getInfoResultExam(req, res) {
        try {
            const examResults = await Exam_result.find()
                .populate('id_user') // Populate thông tin từ bảng User
                .populate('id_type_exam'); // Populate thông tin từ bảng Type_exam

            res.json(examResults);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

module.exports = new ExamResultController;
