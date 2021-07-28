var express = require('express');
var router = express.Router();
const Customer = require('../models/customerModel').Customer;

/* GET Register page. */
router.get('/', function (req, res, next) {
    res.render('register', { title: 'Register' });
});

// To create a new customer (Registration)
router.post('/register', function (req, res, next) {
    // const post = new Post(req.body);
    const cust = new Customer();
    cust.firstname = req.body.firstname;
    cust.lastname = req.body.lastname;
    cust.phone = req.body.phone;
    cust.email = req.body.email;
    cust.password = req.body.rpassword;
    cust.save((err) => {
        // if(err) throw err;
        if (err) {
            const errorArray = [];
            const errorKeys = Object.keys(err.errors);
            errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
            return res.render("register", {
                errors: errorArray
            });
        }
        console.log(cust);
        res.redirect("thankyou");
    });
});

// Shows a single registration
// router.get('/:custLastName', function (req, res, next) {
//     const customerLastName = req.params.custLastNme;
//     Customer.findOne({ lastname: customerLastName }, (err, post) => {
//         res.render('customer-register', { customerRegistration: post });
//     });
// });

module.exports = router;
