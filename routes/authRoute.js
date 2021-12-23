const passport = require('passport');
const express = require('express')
const passportConfig = require('../auth/passport');
const router = express.Router();
const successUrl = "/profile"
const failedUrl = "/"

router.route('/google').get(passport.authenticate('google', { scope:[ 'email', 'profile' ] }))

router.route('/google/callback').get(
	passport.authenticate('google', { 
	  failureRedirect: failedUrl,
	  successRedirect: successUrl,
	  failureMessage: "Cannot logging in to Google, please try again later!",
	})
);



module.exports = router
