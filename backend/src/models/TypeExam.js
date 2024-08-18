const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Type_exam = new mongoose.Schema({
    name: String,
    id_subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject' // Tham chiếu tới model 'Subject'
    },
    time_exam: String,  
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Type_exam', Type_exam, 'Type_exam'); // 'TypeExam' là tên của collection
