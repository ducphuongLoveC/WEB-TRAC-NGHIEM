// controllers/LevelController.js
const Levels = require('../models/Level');
const mongoose = require('mongoose');

class LevelController {
    async createLevel(req, res) {
        try {
            const { icon = '', name } = req.body;

            
            // Tạo một instance mới của Level từ model Levels
            const newLevel = new Levels({
                icon,
                name
                // Nếu có các trường khác, bạn có thể thêm vào đây
            });

            // Lưu level mới vào database
            const createdLevel = await newLevel.save();

            res.status(201).json(createdLevel); // Trả về level đã được tạo thành công
        } catch (error) {
            res.status(500).json({ message: error.message }); // Xử lý lỗi nếu có
        }
    }
    async getAllLevels(req, res) {
        console.log(Levels.find({}));
        try {

            const levels = await Levels.find({});
            res.status(200).json(levels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getLevelsWithSubjectById(req, res) {
        try {
            const id_level = req.query.id_level;

            const levelWithSubjects = await Levels.aggregate([
                {
                    $lookup: {
                        from: 'Subject', // Tên collection mà bạn muốn join
                        localField: '_id', // Tên field trong collection hiện tại
                        foreignField: 'id_level', // Tên field trong collection join
                        as: 'subjects' // Tên field sẽ chứa kết quả join
                    }
                },

            ]);

            const foundLevel = levelWithSubjects.find((v) => v._id.equals(id_level));

            if (foundLevel) {
                res.status(200).json(foundLevel);
            } else {
                res.status(404).json({ message: 'Level not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getLevelAndCollectionChilds(req, res) {
        try {
            const subjectWithType = await Levels.aggregate([
                {
                    $lookup: {
                        from: 'Subject',
                        localField: '_id',
                        foreignField: 'id_level',
                        as: 'subjects'
                    }
                },
                {
                    $unwind: {
                        path: '$subjects',
                        preserveNullAndEmptyArrays: true // Giữ lại các giá trị rỗng khi unwind
                    }
                },
                {
                    $lookup: {
                        from: 'Type_exam',
                        localField: 'subjects._id',
                        foreignField: 'id_subject',
                        as: 'subjects.typeExams'
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        icon: { $first: '$icon' },
                        subjects: { $push: '$subjects' }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        icon: 1,
                        subjects: {
                            $map: {
                                input: '$subjects',
                                as: 'subject',
                                in: {
                                    _id: '$$subject._id',
                                    name: '$$subject.name',
                                    // Add other fields from Subject or Type_exam if needed
                                    typeExams: '$$subject.typeExams'
                                }
                            }
                        }
                    }
                }
            ]);

            if (subjectWithType.length > 0) {
                res.status(200).json(subjectWithType);
            } else {
                res.status(404).json({ message: 'Không tìm thấy Levels' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }







}

module.exports = new LevelController;
