const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
 "profile" : String,
 "name" : String,
 "bio" : String,
 "phone" : String,
 "email" : String,
 "password" : String
});

const UserModel = mongoose.model('User',userSchema);
module.exports = {UserModel}