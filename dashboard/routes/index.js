const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const creatorController = require('../controllers/creatorController');
const auth = require('../middleware/auth');

// Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

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
