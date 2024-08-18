const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const db = require('../config/db/connect');
const route = require('./routes/index');



// Khởi tạo Express app
const app = express();



// Thiết lập middleware
app.use(cors());
app.use(express.json());

// mid
app.use(bodyParser.json());
app.use(cookieParser());

// Kết nối đến MongoDB
db.connect();

// Định nghĩa các route
route(app);

// Khởi động server lắng nghe trên cổng 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
