const passport = require('passport');
const express = require('express')
const passportConfig = require('../auth/passport');
const router = express.Router();
const successUrl = "/profile"
const TsuccessUrl = "https://tping-game.herokuapp.com/"
const failedUrl = "https://tping-game.herokuapp.com/"

router.route('/google').get(passport.authenticate('google', { scope:[ 'email', 'profile' ] }))

router.route('/google/callback').get(
	passport.authenticate('google', { 
	  failureRedirect: failedUrl,
	  successRedirect: TsuccessUrl,
	  failureMessage: "Cannot logging in to Google, please try again later!",
	})
);



module.exports = router
