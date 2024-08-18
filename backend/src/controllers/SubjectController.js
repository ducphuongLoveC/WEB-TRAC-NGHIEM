// controllers/SubjectController.js
const Subject = require('../models/Subject');
const mongoose = require('mongoose');
class SubjectController {

    async createSubject(req, res) {
        try {
            const { name, image, des, id_level } = req.body;



            const newSubject = new Subject({
                name, 
                image, 
                des, 
                id_level
            });


            const createdSubject = await newSubject.save();

            res.status(201).json(createdSubject);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAllSubject(req, res) {
        try {

            const subject = await Subject.find({});
            res.status(200).json(subject);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSubjectsWithTypeById(req, res) {
        try {
            const id_subject = req.query.id_subject;

            const subjectWithType = await Subject.aggregate([
                {
                    $lookup: {
                        from: 'Type_exam', // Tên collection mà bạn muốn join
                        localField: '_id', // Tên field trong collection hiện tại
                        foreignField: 'id_subject', // Tên field trong collection join
                        as: 'typeExams' // Tên field sẽ chứa kết quả join
                    }
                },

            ]);


            const foundSubject = subjectWithType.find((v) => v._id.equals(id_subject));

            if (foundSubject) {
                res.status(200).json(foundSubject);
            } else {
                res.status(404).json({ message: 'subject not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }





}

module.exports = new SubjectController;
