const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel')
require('dotenv').config()

passport.serializeUser((user, done) => {
	done(null, user);
})

passport.deserializeUser((user, done) => {
	done(null, user)
})
 
passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID ,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: "http://localhost:3001/auth/google/redirect",
},
	function(accessToken, refreshToken, profile, done) {
		// check user on MongoDB 
		User.findOne({googleId:profile.id}).then((currentUser) => {
			if(currentUser){
				// alrady have the user
				console.log("user is:", currentUser)
				done(null, profile)
			} else {
				new User({
					username: profile.displayName,
					googleId: profile.id,
					img:  profile._json.picture
				}).save().then((newUser) => {
					console.log("new user created" + newUser)
				})
			}
		})
  }
))
