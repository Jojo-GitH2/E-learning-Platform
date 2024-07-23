const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const validate = require('../middleware/validate');

router.get('/dashboard', auth);

router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
    ],
    validate,
    (req, res) => {
        // Registration logic here
    }
);

module.exports = router;
