const express = require('express');
const router = express.Router();
const users = require('../controllers/user');

// Signing up user
router.post('/signup', users.signup);

// login
router.post('/login', users.login);

// deleting a user
router.delete('/:userId', users.deleteUser);

module.exports = router;