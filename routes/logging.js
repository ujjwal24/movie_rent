const Joi = require('joi');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("invalid email or password")
    
    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword)return res.status(400).send("invalid email or password");
    
    const token=jwt.sign({_id:user._id},'jwt')
    res.header('auth-token',token).send(token)
});

function validateUser(user) {
    const schema = {
      email: Joi.string().min(0).max(50).required(),
      password: Joi.string().min(0).max(50).required()
    };
  
    return Joi.validate(user, schema);
  }
module.exports=router