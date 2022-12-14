const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: false
  },
  password: {
    type: String,
    required: true,
  },

})

const AdminSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  token: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  mobile: {
    type: Number,
    required: false
  },
})
const User=mongoose.model("User",userSchema);
const Admin =mongoose.model("Admin",AdminSchema);


module.exports = {User,Admin}