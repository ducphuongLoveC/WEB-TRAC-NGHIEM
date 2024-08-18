// models/Test.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Test = new Schema({
    id_type_exam: {
        type: Schema.Types.ObjectId,
        ref: 'TypeExam', // Tham chiếu đến model TypeExam
        required: true
    },
    other: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    options: [{
        title: String,
        _id: String,
        isCorrect: Boolean
    }]
});

module.exports = mongoose.model('Test', Test, 'Test');
