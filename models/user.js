const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
 email:{
     type: String,
    required: true,
    unique:true,
    minlength: 10,
    maxlength: 200
 },
 password:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
 }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(0).max(50).required(),
    email: Joi.string().min(0).max(50).required(),
    password: Joi.string().min(0).max(50).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;