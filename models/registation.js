const connect = require('../config/connect');
const mongoose = require('mongoose');
const Joi = require('joi'); // for validation

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name must be less than 50 characters']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'Age must be at least 18'],
        max: [120, 'Age must be less than 120']
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Mobile number must be 10 digits'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters']
    }
})

function addValidation(data) {
    const userval = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.empty': 'Name is required',
            'any.required': 'Name is required'
        }),
    
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
    
    age: Joi.number()
        .integer()
        .required()
        .min(18)
        .max(120)
        .messages({
            'number.empty': 'Age is required',
            'number.integer': 'Age must be a whole number',
            'number.min': 'Age must be at least 18',
            'number.max': 'Age must be less than 120',
            'any.required': 'Age is required'
        }),
    
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.pattern': 'Mobile number must be exactly 10 digits',
            'string.empty': 'Mobile number is required',
            'any.required': 'Mobile number is required'
        }),
    
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
    })

    let { error } = userval.validate(data);
    return error;
}

const user = mongoose.model('user', userSchema);

module.exports = { user, addValidation };



