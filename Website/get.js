var callAPI = (CustomerName,
			   Salesperson,
			   Date,
			   MeetingType,
			   MeetingSubject,
			   MeetingDetails,
			   VIPCustomer,
			   Feedback) => {

	var myHeaders = new Headers();

	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		"CustomerName": CustomerName,
		"Salesperson": Salesperson,
		"Date": Date,
		"MeetingType": MeetingType,
		"MeetingSubject": MeetingSubject,
		"MeetingDetails": MeetingDetails,
		"VIPCustomer": VIPCustomer,
		"Feedback": Feedback
	});

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	// make API call to pass visit data
	fetch("https://748nxq4fc1.execute-api.us-east-1.amazonaws.com/dev", requestOptions)
		.then(response => response.text())
		.then(result => alert(JSON.parse(result).body))
		.catch(error => console.log('error', error));
}
