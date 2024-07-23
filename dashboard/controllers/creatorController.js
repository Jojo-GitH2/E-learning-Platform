const Course = require('../models/Course');

exports.getCreatorDashboard = async (req, res) => {
    try {
        const courses = await Course.find({ creator: req.user.id });
        res.json(courses);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createCourse = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newCourse = new Course({
            title,
            description,
            creator: req.user.id,
        });
        const course = await newCourse.save();
        res.json(course);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateCourse = async (req, res) => {
    const { title, description } = req.body;
    try {
        let course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }
        if (course.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        course = await Course.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description } },
            { new: true }
        );
        res.json(course);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }
        if (course.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Course.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Course removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
