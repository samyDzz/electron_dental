const {BrowserWindow} = require('electron')
const appMenu = require('../menu')
var path = require('path')
const ejse = require('ejs-electron')
    .options('debug', false)
var jwt = require('jsonwebtoken')
var JWT_KEY = "secret";


exports.createJWT = (payload) => {
	try {
		return jwt.sign(payload, JWT_KEY, { algorithm: 'HS256' });
	}catch(e) {
		console.log(e.stack);
	}
}

exports.decodeJWT = (token) => {
	try{
		return jwt.verify(token , JWT_KEY , { algorithm : "HS256" });
	}catch(e) {
		console.log(e.message);
		return false;
	}
}