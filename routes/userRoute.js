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
   res.send({status: 200, user:req.user});
  else
    res.send({status: 401, msg:'Unaauthorized'})
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
        res.send({status: 200, user:currentUser});
      else
        res.send({status: 401, msg:'user not exist in database'});
    })
  else
    res.status(401).send('user Unauthorized')
})

router.route('/board').get((req, res) => {
  User.find().sort({wpm: -1})
    .then(users => res.send({status: 200, users:users}))
    .catch(err => res.send({status: 401, msg:'Database is empty', error:err}))
})

router.route('/logout').get((req, res) => {
  res.clearCookie("express:sess.sig");
  res.clearCookie("express:sess");
})

module.exports = router;