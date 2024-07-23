const express = require('express');
const router = express.Router();
const { getAdminDashboard, manageUsers, manageCourses } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.get('/dashboard', [auth, adminAuth], getAdminDashboard);
router.get('/users', [auth, adminAuth], manageUsers);
router.get('/courses', [auth, adminAuth], manageCourses);

module.exports = router;
