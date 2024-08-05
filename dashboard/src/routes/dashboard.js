const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const creatorController = require('../controllers/creatorController');
const { handleSignUp } = require('../controllers/authController');

// Route for user registration
router.post(
    '/register',           
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
    ],
    validate,
    handleSignUp
);

// User Routes
router.get('/user/dashboard', auth, userController.getUserDashboard);

// Admin Routes
router.get('/admin/dashboard', auth, adminController.getAdminDashboard);
router.get('/admin/users', auth, adminController.manageUsers);
router.get('/admin/courses', auth, adminController.manageCourses);

// Creator Routes
router.get('/creator/dashboard', auth, creatorController.getCreatorDashboard);
router.post('/creator/courses', auth, creatorController.createCourse);
router.put('/creator/courses/:id', auth, creatorController.updateCourse);
router.delete('/creator/courses/:id', auth, creatorController.deleteCourse);

module.exports = router;
