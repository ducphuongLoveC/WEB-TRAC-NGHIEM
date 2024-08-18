
const Type_exam = require('../models/TypeExam');

class SubjectController {

    async createTypeExam(req, res) {
        try {
            const { name, time_exam , id_subject } = req.body;

            console.log(time_exam);

            const newTypeExam = new Type_exam({
                name, 
                time_exam,
                id_subject
            });


            const createdTypeExam = await newTypeExam.save();

            res.status(201).json(createdTypeExam);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllTypeExam(req, res) {

        try {
            const typeExam = await Type_exam.find({});
            res.status(200).json(typeExam);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTypeExamsWithTest(req, res) {
        try {
            const id_type_exam = req.query.id_type_exam;

            const typeExamWithTest = await Type_exam.aggregate([
                {
                    $lookup: {
                        from: 'Test', // Tên collection mà bạn muốn join
                        localField: '_id', // Tên field trong collection hiện tại
                        foreignField: 'id_type_exam', // Tên field trong collection join
                        as: 'tests' // Tên field sẽ chứa kết quả join
                    }
                },

            ]);


            const found = typeExamWithTest.find((v) => v._id.equals(id_type_exam));

            if (found) {
                res.status(200).json(found);
            } else {
                res.status(404).json({ message: 'not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }





}

module.exports = new SubjectController;
