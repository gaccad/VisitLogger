function callAPI (CustomerName,
			   Salesperson,
			   Date,
			   MeetingType,
			   MeetingSubject,
			   MeetingDetails,
			   VIPCustomer,
			   Feedback) {

	var myHeaders = new Headers();

	myHeaders.append("Content-Type", "application/json");


/* 	CustomerName = 'TEST';
	Salesperson = 'TEST';
	Date = '21/06/21';
	MeetingType = 'MEETING';
	MeetingSubject = 'Chef';
	MeetingDetails = 'TEST';
	VIPCustomer = 'NO';
	Feedback = 'GOOD'; */
	
	// Change date format to dd/mm/yy
	const dt = Date.substring(8, 10);
	const mn = Date.substring(5, 7);
	const yy = Date.substring(2, 4);
	
	const newdate = dt + "/" + mn + "/" + yy
	

	var raw = JSON.stringify({
		"CustomerName": CustomerName,
		"Salesperson": Salesperson,
		"Date": newdate,
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
