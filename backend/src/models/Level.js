const mongoose = require('mongoose');

const Level = new mongoose.Schema({
    name: String,
    icon: String,
    createdAt: { type: Date, default: Date.now }
    
});

module.exports = mongoose.model('Levels', Level, 'Levels'); // 'Levels' là tên của collection
