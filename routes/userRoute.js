const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

const setResult = (id, wpm, accuracy) => {
  User.findOne({googleId:id}).then(doc => {
    if(wpm > doc.wpm)
    User.updateOne({googleId:id}, {wpm:wpm, accuracy:accuracy}).then(console.log("data updated"))
  });
}

router.route('/user').get((req, res) => {
  if(req.user)
   res.status(200).send(req.user);
  else
    res.status(401).send('user Unauthorized')
})

router.route('/result').post((req, res) => {
  if(req.body.id)
    setResult(req.body.id, req.body.wpm, req.body.accuracy);
  else
    res.status(401).send('user Unauthorized')
})

router.route('/userInfo').get((req, res) => {
  if(req.user)
    User.findOne({googleId:req.user.id})
    .then((currentUser) => {
      if(currentUser)
        res.status(200).send(currentUser);
        else
        res.status(401).send('no user exists in db')
    })
    else
    res.status(401).send('user Unauthorized')
})

router.route('/board').get((req, res) => {
  User.find().sort({wpm: -1})
    .then(users => res.status(200).send(users))
    .catch(err => res.status(401).send('db is empty'))
})

router.route('/logout').get((req, res) => {
  
})
module.exports = router;