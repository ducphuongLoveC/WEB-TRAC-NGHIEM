const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = new mongoose.Schema({
    name: String,
    image: String,
    des: String,
    id_level: {
        type: Schema.Types.ObjectId,
        ref: 'Levels' // Tham chiếu tới model 'Level'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subject', Subject, 'Subject'); // 'Levels' là tên của collection
