// controllers/userController.js
const User = require('../models/User');

class UserController {
    async getAllUsers(req, res) {
        try {
            const { username, pass } = req.body;
            console.log(username + pass);
            const user = await User.find({});

            const [foundUser] = user.filter((u) => {
                return u.username == username && u.pass == pass
            })

            res.status(200).json(foundUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const { username, pass } = req.body;

            const newUser = new User({
                username,
                role: 'memmber',
                pass
            })
            const createdUser = await newUser.save();
            res.status(201).json(createdUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController;
