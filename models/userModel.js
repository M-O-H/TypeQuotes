const mongoose = require('mongoose');
const Schema = require("mongoose").Schema;

const UserScema = new Schema({
	username: {
		type: String,
		required: true
	},
	googleId: {
		type: String,
		required: true,
		unique: true
	},
	wpm: {
		type: Number,
		default: 0
	},
	rank: {
		type: String,
		default: 'typer'
	},
	img: {
        type: String,
		default: 'none'
    }
	
});

const User = mongoose.model('user', UserScema)

module.exports = User;