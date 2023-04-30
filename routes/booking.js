var express = require('express');
var router = express.Router();

roomList = [
	{roomNumber: 101, occupancy: 2, price: 120, booked: false},
	{roomNumber: 102, occupancy: 4, price: 140, booked: false},
	{roomNumber: 103, occupancy: 4, price: 160, booked: false},
	{roomNumber: 104, occupancy: 2, price: 140, booked: false}
];

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect("..");
}

router.get('/', function(req, res) { // get the page
	res.render('booking', { title: 'Booking Service' });
});

router.get('/rooms', function(req, res) { // get the list of rooms
	res.json(roomList);
})

router.post('/bookroom', checkAuthenticated, function(req, res) {
	for (i=0; i<roomList.length; i++) {
		if (roomList[i].roomNumber == req.body.id) {
			roomList[i].booked = true;
		}
	}
	res.redirect("/")
})

module.exports = router;
