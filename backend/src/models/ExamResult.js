const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamResult = new mongoose.Schema({
    completed: String,
    duration: String,
    id_type_exam: {
        type: Schema.Types.ObjectId,
        ref: 'Type_exam'
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    score: String,
    createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Exam_result', ExamResult, 'Exam_result');
