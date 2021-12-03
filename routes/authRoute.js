const passport = require('passport');
const express = require('express')
const passportConfig = require('../auth/passport');
const router = express.Router();
const successUrl = "/profile"
const TsuccessUrl = "https://tping-game.herokuapp.com/profile"
const failedUrl = "https://tping-game.herokuapp.com/rank"

router.route('/google').get(passport.authenticate('google', { scope:[ 'email', 'profile' ] }))

router.route('/google/callback').get(
	passport.authenticate('google', { 
	  failureRedirect: failedUrl,
	  successRedirect: TsuccessUrl,
	  failureMessage: "Cannot logging in to Google, please try again later!",
	})
);

router.route("/logout").delete((req, res) =>{
	  if (req.session) {
		  req.session.destroy(err => {
			if (err) {
			  res.status(400).send('Unable to log out')
			  console.log("logout error")
			} else {
			  console.log("logout successfuly")
		res.redirect('/login')
			}
		  });
		} else {
		  res.end()
		}
	alert('dfdf')
	});

module.exports = router
