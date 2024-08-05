const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const creatorController = require('../controllers/creatorController');
const { handleSignUp } = require('../controllers/authController');

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

// Route for user registration (same as authRoutes for testing)
router.post('/register', validate, handleSignUp);

module.exports = router;
