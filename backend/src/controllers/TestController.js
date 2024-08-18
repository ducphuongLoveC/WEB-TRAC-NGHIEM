const mongoose = require('mongoose');
const Test = require('../models/Test');

class TestController {
    async saveTests(req, res) {
        try {
            const { id_type_exam, tests } = req.body;

            // Kiểm tra nếu không có dữ liệu tests
            if (!tests || tests.length === 0) {
                return res.status(400).json({ message: 'Không có dữ liệu test để lưu' });
            }

            // Lọc ra các bản ghi tests hiện tại từ cơ sở dữ liệu
            const currentTests = await Test.find({ id_type_exam });

            // Tạo map từ các bản ghi hiện tại
            const currentTestsMap = currentTests.reduce((map, test) => {
                if (test._id) { // Kiểm tra _id tồn tại
                    map[test._id.toString()] = test;
                }
                return map;
            }, {});

            // Chuẩn bị các thao tác cập nhật
            const updates = tests.map(test => ({
                filter: { _id: test._id }, // Lọc theo _id
                update: {
                    id_type_exam: new mongoose.Types.ObjectId(id_type_exam),
                    title: test.title,
                    options: test.options
                },
                options: { upsert: true, new: true } // Tạo mới nếu không tồn tại và trả về bản ghi mới
            }));

            // Xóa trường _id để MongoDB tự sinh _id mới
            tests.forEach(test => {
                delete test._id;
            });

            // Thực hiện các thao tác cập nhật
            const updatePromises = updates.map(async update => {
                if (update.filter._id && currentTestsMap[update.filter._id.toString()]) {
                    // Nếu _id tồn tại và có trong currentTestsMap, thực hiện cập nhật
                    const result = await Test.findOneAndUpdate(update.filter, update.update, update.options);
                    return result;
                } else {
                    // Ngược lại, thực hiện tạo mới
                    const newTest = new Test(update.update);
                    await newTest.save();
                    return newTest;
                }
            });

            // Xóa các bản ghi không được cập nhật từ cơ sở dữ liệu
            const testIdsToUpdate = updates.map(update => update.filter._id && update.filter._id.toString());
            const deletePromises = currentTests
                .filter(test => test._id && !testIdsToUpdate.includes(test._id.toString()))
                .map(test => Test.deleteOne({ _id: test._id }));

            await Promise.all([...updatePromises, ...deletePromises]);

            res.status(201).json({ message: 'Cập nhật tests thành công' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new TestController();
