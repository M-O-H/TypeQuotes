const passport = require('passport')
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session');
const path = require("path");
const PORT = process.env.PORT || 3001

require('dotenv').config()

// connect to mongodb
mongoose.connect(process.env.MONGODB_DB_URL, (err)=>{
  if(err) throw err
  console.log('connected to database successfully')
})

// middleware
app.use(cors({origin: 'http://localhost:3000/'}));
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(cookieSession({
	maxAge: "tut-session",
	keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());

// user routes
app.use('/', require('./routes/userRoute'))
// authentication routes
app.use('/auth', require('./routes/authRoute'))


if(process.env.NODE_ENV === 'production'){
	app.use(express.static('frontend/build'));
	app.use((req, res, next) => {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	  });
	  
}

app.listen(PORT, () => {
	console.log("Server is up and running on port" + `http://localhost:${PORT}/`)
})
