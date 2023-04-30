if(document.readyState !== "loading"){
	console.log("Document is ready");
	initializeCode();
} else {
	document.addEventListener("DOMContentLoaded", function(){
		console.log("Document ready after waiting!");
		initializeCode();
	})
}

async function displayRooms() { // requests the posts from the server and populates the homepage with them
	let url = "http://localhost:3000/booking/rooms";
	let response = await fetch(url);
	let rooms = await response.json();

	const container = document.getElementById('container');
	const roomList = document.createElement('ul');
	for (let i = 0; i < rooms.length; i++) {
		const roomItem = document.createElement('div');
		roomItem.setAttribute("class", "roomData");
		const roomNum = document.createElement('h2');
		const roomOccup = document.createElement('p');
		const roomPrice = document.createElement('p');
		const roomAvail = document.createElement('p');
		
		roomNum.textContent = "Room " + rooms[i].roomNumber;
		roomOccup.textContent = "Occupancy: " + rooms[i].occupancy;
		roomPrice.textContent = "Price: " + rooms[i].price + "$";
		roomAvail.textContent = rooms[i].booked ? "Booked" : "Available";
		
		roomItem.appendChild(roomNum);
		roomItem.appendChild(roomOccup);
		roomItem.appendChild(roomPrice);
		roomItem.appendChild(roomAvail);

		if (rooms[i].booked == false) {
			const bookButton = document.createElement('button');
			bookButton.innerText = "Book";
			bookButton.setAttribute("id", "room" + i);
			roomItem.appendChild(bookButton);

			bookButton.addEventListener("click", function() {
				bookRoom(rooms[i].roomNumber);
			})
		}

		roomList.appendChild(roomItem);
	}
	container.appendChild(roomList);
}

function initializeCode() {
	displayRooms();
}

function bookRoom(roomNumber) {
	fetch("http://localhost:3000/booking/bookroom", {
		method: "post",
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify({id: roomNumber})
	});
}
