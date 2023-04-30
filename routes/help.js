var express = require('express');
var router = express.Router();

const responses = { // chat bot's responses
	"hi": "Hello, how can I help you today?",
	"room service": "Sorry, I can't help you with that.",
	"thanks": "You're welcome. Have a great day!",
	"bye": "Goodbye!"
};

let respo = {
	input: "",
	output: ""
};

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect("/");
}

router.get('/', function(req, res) {
	res.render('help');
});

router.post('/send', checkAuthenticated, function(req, res) {
	if (req.body.msg in responses) {
		respo.input = "You: " + req.body.msg;
		respo.output = "Customer Support: " + responses[req.body.msg];
	} else {
		respo.input = "You: " + req.body.msg;
		respo.output = "Customer Support: I'm sorry, I don't understand. Can you please try again?";
	}

	res.redirect("/");
});

router.get('/response', function(req, res) {
	res.json(respo);
});

module.exports = router;
