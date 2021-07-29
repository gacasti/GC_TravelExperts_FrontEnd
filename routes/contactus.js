var express = require('express');
var router = express.Router();
const ConctactUs = require('../models/contactusModel').ConctactUs;

/* GET Register page. */
// router.get('/', function (req, res, next) {
//     res.render('register', { title: 'Register' });
// });

// To send us a contactus
router.post('/contactThem', function (req, res, next) {
    // const post = new Post(req.body);
    const contact = new ConctactUs();
    contact.fullname = req.body.fullname;
    contact.phone = req.body.phone;
    contact.email = req.body.email;
    contact.comments = req.body.comments;
    contact.save((err) => {
        // if(err) throw err;
        if (err) {
            const errorArray = [];
            const errorKeys = Object.keys(err.errors);
            errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
            return res.render("/", {
                postdata: req.body,
                errors: errorArray,
            });
        }
        console.log(req.body);
        res.redirect("/thankyou");
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

