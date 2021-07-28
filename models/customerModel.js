// Require the mongoose module
const mongoose = require('mongoose');

// var connLocal = 'mongodb://localhost:27017/blog';
// var connAtlas = "mongodb+srv://gacasti:1234321@cluster0.jg6vs.mongodb.net/custTest?retryWrites=true&w=majority";

// mongoose.connect(process.env.MONGO_ATLAS_URL || process.env.MONGO_COMPASS_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect(process.env.MONGO_ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get the connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log("We're connected to the database ...!")
});

const uniqueValidator = require("mongoose-unique-validator");

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: "Please enter your last name.",
        trim: true
    },
    laststname: {
        type: String,
        required: "Please enter your last name.",
        trim: true
    },
    remail: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[A-Z0-9._%+-]+@([A-Z0-9-]+\\.)+[A-Z]{2,4}$/i.test(v);
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
    rpassword: {
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