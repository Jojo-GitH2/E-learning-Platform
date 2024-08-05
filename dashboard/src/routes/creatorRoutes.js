const express = require('express');
const router = express.Router();
const { getCreatorDashboard, createCourse, updateCourse, deleteCourse } = require('../controllers/creatorController');
const auth = require('../middleware/adminAuth');
const creatorAuth = require('../middleware/creatorAuth');

router.get('/dashboard', [auth, creatorAuth], getCreatorDashboard);
router.post('/courses', [auth, creatorAuth], createCourse);
router.put('/courses/:id', [auth, creatorAuth], updateCourse);
router.delete('/courses/:id', [auth, creatorAuth], deleteCourse);

module.exports = router;
