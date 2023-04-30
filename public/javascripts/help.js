if(document.readyState !== "loading"){
	console.log("Document is ready");
	initializeCode();
} else {
	document.addEventListener("DOMContentLoaded", function(){
		console.log("Document ready after waiting!");
		initializeCode();
	})
}

async function displayResponse() {
	let url = "http://localhost:3000/help/response";
	let response = await fetch(url);
	let respo = await response.json();

	const container = document.getElementById("container");
	const input = document.createElement("p");
	const output = document.createElement("p");

	input.innerText = respo.input;
	output.innerText = respo.output;

	container.appendChild(input);
	container.appendChild(output);
}

function sendMessage(message) { 
	const msg = {msg: message};

	fetch("http://localhost:3000/help/send", {
		method: "post",
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(msg)
	});
}

function initializeCode() {
	const helpForm = document.getElementById("helpForm");

	displayResponse();

	helpForm.addEventListener('submit', function(event) {
		event.preventDefault();
		sendMessage(message.value);
	});
}