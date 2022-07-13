const mongoose = require('mongoose')

const Chats = new mongoose.Schema({
    id: {type: String, required: true},
    sender: {type: String, required: true},
    message: {type: String, required: true},
    class: {type: String, required: true}
}, 
{collection: "chats"})

const model = mongoose.model("chatData", Chats)

module.exports = model;