const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    profile: {type: String, required: true}
}, 
{collection: "space-user"})

const model = mongoose.model("spaceUser", User)

module.exports = model;

