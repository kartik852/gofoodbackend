const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "Mynameiskartiksharmaappnameisfoo"
const user = require('../models/User')
router.post("/createuser" ,
[body('email').isEmail(),
body('name').isLength({ min: 5 }),
body('password','Incorrect password').isLength({ min: 5 })],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password,salt);
    try {
        user.create({
            name: req.body.name,
            password:secpassword,
            email: req.body.email,
            location:req.body.location
        })
    res.json({success:true});
    } catch (error) {
        console.log("error");
    }
})
router.post("/loginuser",
[body('email').isEmail(),
body('password','Incorrect password').isLength({ min: 5 })] ,
async (req,res)=>{
    let email =req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userdata=  await user.findOne({email});
      if(!userdata){
        return res.status(400).json({errors: "Try logging with correct credentials"})
      }
      const pwdcompare =await bcrypt.compare(req.body.password,userdata.password);

      if(!pwdcompare){
        return res.status(400).json({errors: "Try logging with correct credentials"})
      }
      const data ={
        user:{
            id:userdata.id
        }
      }
      const authtoken =jwt.sign(data,jwtsecret);
      return res.json({success:true,authtoken:authtoken});
    } catch (error) {
        console.log("error");
    }
})
module.exports= router;