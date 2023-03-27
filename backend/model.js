const mongoose     = require("mongoose");

//schema 
const UserSchema = new mongoose.Schema({
    firstname : { type: String,    required: true, },
    lastname  : { type: String,    required: true, },
    email     : { type: String,    required: true, },
    password  : { type: String,    required: true, },
    usergroup : { type: Number,    required: true, }
  });
  const User = mongoose.model("users", UserSchema);
  module.exports = User;