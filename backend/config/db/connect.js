const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/TracNghiem');
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
}
module.exports = { connect }
