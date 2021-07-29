// Require the mongoose module
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: "Please enter your last name.",
        trim: true
    },
    lastname: {
        type: String,
        required: "Please enter your last name.",
        trim: true
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        },
        required: 'Please enter your email address'
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[+]?(1\\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: 'Please enter your phone number'
    },
    password: {
        type: String,
        required: "Please enter a password",
        trim: true,
        validate: {
            validator: function (v) {
                return /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,}$/.test(v);
            },
            message: (props) =>
                `Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 6 characters.`,
        },
    },
    role: {
        type: String,
        trim: true,
        default: "customer",
    },
    // more fields defined below
});

customerSchema.plugin(uniqueValidator);
module.exports.Customer = mongoose.model('Customer', customerSchema);
