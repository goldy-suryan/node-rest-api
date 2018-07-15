const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const saltRounds = 10

// Signing up user
router.post('/signup', (req, res) => {
    User.find({ email: req.body.email }, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else if (result.length) {
            res.status(409).json({
                message: 'Email already exists'
            });
        } else {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User();
                    user.email = req.body.email;
                    user.password = hash;

                    user.save((err, user) => {
                        if (err) {
                            res.status(500).json({
                                error: err
                            });
                        } else {
                            res.status(201).json({
                                user,
                                message: 'User created successfully, try signing in'
                            });
                        }
                    });
                }
            });
        }
    });
});

router.delete('/:userId', (req, res) => {
    const id = req.params.userId;
    User.findByIdAndRemove(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else if (!result) {
            res.status(404).json({
                message: 'Unable to find the user'
            });
        } else {
            res.status(200).json({
                message: 'User deleted successfully',
                result
            });
        }
    })
});

module.exports = router;