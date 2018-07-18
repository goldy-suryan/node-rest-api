const User = require('../model/user');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const validationSchema = require('../validation/validationSchema');

const userCtl = {
    signup: (req, res) => {
        req.checkBody(validationSchema.registrationSchema);
        const errors = req.validationErrors();

        if (errors) {
            return res.status(500).json({
                error: errors
            });
        }

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
    },

    login: (req, res) => {
        const delayResponse = resp => { // Basic security against brute force attack
            setTimeout(() => {          // best way is to capture number of login attempts from same ip
                resp();                 // and freeze the account for a day or so
            }, 800);
        };

        req.checkBody(validationSchema.loginSchema);
        const errors = req.validationErrors();

        if (errors) {
            return res.status(500).json({
                error: errors
            });
        }

        User.findOne({ email: req.body.email }, (err, result) => {
            if (err) {
                return delayResponse(() => res.status(500).json({
                    error: err
                }));
            } else if (!result) {
                return delayResponse(() => res.status(401).json({
                    message: 'Authorization failed'
                }));
            } else {
                bcrypt.compare(req.body.password, result.password)
                    .then(response => {
                        if (response) {
                            const token = jwt.sign({
                                email: result.email,
                                userId: result.userId
                            },
                                'secretKey',
                                {
                                    expiresIn: '1h'
                                }
                            );
                            return delayResponse(() => res.status(200).json({
                                message: 'Logged in successfully',
                                token
                            }));
                        } else {
                            return delayResponse(() => res.status(401).json({
                                message: 'Authorization failed, password doesn\'t match'
                            }));
                        }
                    })
                    .catch(err => {
                        return delayResponse(() => res.status(500).json({
                            error: err
                        }));
                    })
            }
        });
    },

    deleteUser: (req, res) => {
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
    }
};

module.exports = userCtl;