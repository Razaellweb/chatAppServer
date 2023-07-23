const express = require('express');
const cors = require('cors');
const  app = express();
const mongoose = require('mongoose');
const User = require('./models/user-model')
const Chat = require('./models/chat-model')
const path = require('path')


app.use(cors())
app.use(express.json())

mongoose.connect( process.env.URI);

//mongoose.connect("mongodb://127.0.0.1:27017/chatSpace");

app.post("/api/register", async (req, res) => {
  console.log(req.body)
  try {
       await User.create({
       email: req.body.email,
       name: req.body.name,
       password: req.body.password,
       profile: "true"
     })
     res.json({status: "registration successful", done: true})
  }
  catch(error) {
    res.json({status: "Error"})
  }
})

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })
    if(user) {
      res.json({status: "login successful", name: user.name, loggedIn: true, email: user.email})
    }
    else {
      res.json({status: "Invalid Login", loggedIn: false})
    }
  }
  catch {
    res.json({status: "Invalid Login"})
  }
})

app.post("/api/getMessages", async(req, res) => {
  try {
    const messages = await Chat.find({
      $or: [{id: req.body.chatid1}, {id: req.body.chatid2}]
    })
  
    if (messages) {
      res.json({status: "message retrieved successfully", messages})
    }
    else {
      res.json({status: "error"})
    }
  }
  catch {
      res.json({status: "error"})
  }
})

app.post("/api/sendMessage", async(req, res) => {
  try{
    await Chat.create({
      sender: req.body.name,
      id: req.body.chatid1,
      message: req.body.message,
      class: "receiver"
    })
    res.json({status: "message sent succesfully", sent: true})
  }
  catch {
    res.json({status: "message not sent", sent: false})
  }
})

app.post("/api/getUsers", async (req, res) => {
  const users = await User.find({
    $and: [{profile: req.body.profile}, {email: {$not:{ $eq: req.body.email1} }}]
  })
  if(users) {
    res.json({status: "complete", get: true, users})
  }
  else {
    res.json({status: "could not complete", get: false})
  }
})

// app.use(express.static(path.join(__dirname, '/client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });


app.listen(process.env.PORT || '1387', () => {
  console.log("Server Started Succesfuly")
})