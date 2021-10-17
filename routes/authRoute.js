const passport = require('passport');
const express = require('express')
const passportConfig = require('../auth/passport');
const router = express.Router();
const successUrl = "http://localhost:3000/profile"
const TsuccessUrl = "/profile"
const failedUrl = "http://localhost:3000/failed"

router.route('/google').get(passport.authenticate('google', { scope:[ 'email', 'profile' ] }))

router.route('/google/redirect').get(
	passport.authenticate('google', { 
	  failureRedirect: failedUrl, 
	  failureMessage: "Cannot logging in to Google, please try again later!",
	}),
	(req, res) => {
    // Successful authentication, redirect home.
    res.redirect(TsuccessUrl);
});

module.exports = router
