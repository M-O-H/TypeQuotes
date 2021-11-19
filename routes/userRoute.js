const express = require('express')
const router = express.Router();
const User = require('../models/userModel');

const setResult = (id, wpm) => {
  User.findOne({googleId:id}).then(doc => {
    if(wpm > doc.wpm)
    User.updateOne({googleId:id}, {wpm:wpm}).then(console.log("data updated"))
  })
}

router.route('/user').get((req, res) => {
  if(req.user)
    res.json(req.user)
  else
    res.json('no user login')
})

router.route('/result').post((req, res) => {
  if(req.body.id)
    setResult(req.body.id, req.body.wpm)
})

router.route('/userInfo').get((req, res) => {
  if(req.user.id)
    User.findOne({googleId:req.user.id})
    .then((currentUser) => {
      if(currentUser)
        res.json(currentUser)
      else
        res.json("no user loggin in")
    })
})

router.route('/board').get((req, res) => {
  User.find().sort({wpm: -1})
    .then(users => res.json(users))
    .catch(err => { if(err) throw err })
})

router.route('/logout').get((req, res) => {
  
})
module.exports = router;