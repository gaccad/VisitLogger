

	var myHeaders = new Headers();
        // add content type header to object
        //myHeaders.append("Content-Type", "application/json");	
			
        var requestOptions = {
            method: 'GET',
            //headers: myHeaders,
            redirect: 'follow'
            };
			
		//async function getData(){
			const fetchPromise  = fetch("https://748nxq4fc1.execute-api.us-east-1.amazonaws.com/dev/", requestOptions);
		//const fetchPromise = fetch("https://ghibliapi.herokuapp.com/people");
		const main = document.getElementById("main");
		fetchPromise.then(response => {
		  return response.json();
		})
		
		.then(people => {
		  //const names = JSON.stringify(people);  // Append names to main element
		  //main.innerHTML = names;
		  
		  // main.innerHTML = people.body[4].ID; 	// WORKING
		  
		  //const persons = people.body.map(person => person.ID).join("\n");    // WORKING
		  main.innerHTML = listOfNames(people.body);
		});
		  
		  
		  function listOfNames(people) {
			  const names = people.map(person => `<li>${person.ID}</li>`).join("\n");
			  return `<ul>${names}</ul>`
		  
		}

		