var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require('passport');
const session = require('express-session');
const initializePassport = require('../auth/passport-config.js');

users = [];

// Functions
function getUserByUsername(username) {
	return users.find(user => user.username === username);
}

function getUserById(id) {
	return users.find(user => user.id === id);
}

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	return next();
}

initializePassport(passport, getUserByUsername, getUserById);

router.use(session({ // initializing the session
	secret: "bapem390i532iMJ9",
	resave: false,
	saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());

router.get('/', function(req, res) {
	res.render('index');
});

// Handling of loggin in and out
router.get('/login', (req, res, next) => {
	res.render('login');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
	successRedirect: "/",
	failureRedirect: "/login",
}));

router.get('/logout', checkAuthenticated, (req, res, next) => {
	res.render('logout');
});

router.post('/logout', checkAuthenticated, (req, res, next) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
		return res.redirect("/login");
	})
})

// Handling of registration
router.get('/register', (req, res, next) => {
	res.render('register');
});

router.post('/register', checkNotAuthenticated, async (req, res) => {
	try {
		const hash = await bcrypt.hash(req.body.password, 10);
		users.push({ // creating a new user
			id: Date.now().toString(),
			username: req.body.username,
			password: hash
		})
		res.redirect("/login");
	} catch {
		res.redirect("/register");
	}
});

module.exports = router;
