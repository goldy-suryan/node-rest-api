"use strict";

const registrationSchema = {
    "email": {
        notEmpty: true,
        isEmail: {
            errorMessage: "Invalid email"
        }
    },
    "password": {
        notEmpty: true,
        isLength: {
            options: [{ min: 12 }],
            errorMessage: "password must be atleast 12 characters"
        },
        matches: {
            options: ["(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[!*&^%$#@()+]+).*", "g"],
            errorMessage: "password must be alphanumeric"
        },
        errorMessage: "invalid password"
    }
};

const loginSchema = {
    "email": {
        notEmpty: true,
        isEmail: {
            errorMessage: "Invalid email"
        }
    }
};

module.exports = { registrationSchema, loginSchema };