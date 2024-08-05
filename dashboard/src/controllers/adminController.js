const User = require('../models/User');
const Course = require('../models/Course');

exports.getAdminDashboard = async (req, res) => {
    try {
        const users = await User.find();
        const courses = await Course.find();
        res.json({ users, courses });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.manageUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.manageCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
