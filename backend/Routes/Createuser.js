const express = require('express');
const router = express.Router();
const User = require('../models/User'); // You should have a User model defined
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret = "Hadabdhsdbshbj"

router.post("/createuser", [
    // Validation checks for request body fields
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('phoneno').isLength({ min: 10, max: 10 }),
    body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);

    try {
      
      await User.create({
        name: req.body.name,
        password: securePass ,
        email: req.body.email,
        phoneno: req.body.phoneno,
        location: req.body.location
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });

  router.post("/loginuser", [
    // Validation checks for request body fields
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
    // Validate the request body against the defined checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ...

try {
    const email = req.body.email;
  
    // Find a user with the provided email address
    let userdata = await User.findOne({ email });
  
    if (!userdata) {
      return res.status(400).json({ errors: "Try With Correct Credentials" });
    }
  
    const pwdCompare = await bcrypt.compare(req.body.password, userdata.password); 
    if (!pwdCompare) {
      return res.status(400).json({ success: false, error: "Try Logging in with correct credentials" });
    }
  
    const data = {
      user: {
        id: userdata.id
      }
    }
    const authToken = jwt.sign(data, jwtSecret);
  

    return res.json({ success: true, authToken: authToken });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
  
  

  });
  module.exports = router;
  