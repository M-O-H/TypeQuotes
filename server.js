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
mongoose.connect(process.env.MONGODB_DB_URL || "mongodb+srv://admin:12345@cluster0.ncy4q.mongodb.net/test?retryWrites=true&w=majority", (err)=>{
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

// app.use(express.static(path.join("frontend/build")));
// app.get("*", function (request, response) {
// 	response.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });



if(process.env.NODE_ENV === 'production'){
	app.use(express.static('frontend/build'));
	app.use((req, res, next) => {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	  });
	// app.use(express.static("public"));
	// app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/frontend/build/index.html')))
	// app.get("*", (req, res) => {
	// 	let url = path.join(__dirname, 'frontend/build', 'index.html');
	// 	if (!url.startsWith('/app/')) // since we're on local windows
	// 	  url = url.substring(1);
	// 	res.sendFile(url);
	//   });
	  
}

app.listen(PORT, () => {
	console.log("Server is up and running on port" + `http://localhost:${PORT}/`)
})