const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret';

router.post('/createUser', 
// Validate the data
body('email', 'Incorrect Email').isEmail(),
body('password', 'Incorrect Password').isLength({min: 5}),
body('name').isLength({min: 3}),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;

        const { name, location, email, password } = req.body;

        // Perform data validation before saving
        const user = new User({ name, location, email, password });

        // Save the user to the database
        await user.save();

        res.json({ success: true, message: 'User created successfully.' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
);

router.post('/loginUser', [body('email', 'Incorrect Email').isEmail(), body('password', 'Incorrect Password').isLength({ min: 5 })],
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        

        const data = await User.findOne({ email: req.body.email });
        if (!data) {
            return res.json({ success: false, message: 'User not found.' });
        }
        const comparePasswords = await bcrypt.compareSync(req.body.password, data.password);
        if (!comparePasswords) {
            return res.json({ success: false, message: 'Incorrect password.' });
        }
        const dataObject = {
            user:{
                id: data._id
            }
        }
        const token = await jwt.sign(dataObject, jwtSecret);
        res.cookie('token', token, { httpOnly: true });


        return res.json({ success: true, token: token, message: 'User logged in successfully.'});
        


    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

module.exports = router;