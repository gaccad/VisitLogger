import React from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";


var vip = document.getElementsByName('vip-meeting');
var vip_value;
	
function getVIP() {

	for(var i = 0; i < vip.length; i++){
		if(vip[i].checked){
			vip_value = vip[i].value;
			break;
		}
	}
	
	return vip_value;
}	

var feedback = document.getElementsByName('meeting-feedback');
var feedback_value;
		
function getFeedback() {	
	for(var j = 0; j < feedback.length; j++){
		if(feedback[j].checked){
			feedback_value = feedback[j].value;
			break;
		}
	}
	
	return feedback_value;
}

function callAPI (CustomerName,
			   Salesperson,
			   Date,
			   MeetingType,
			   MeetingSubject,
			   MeetingDetails,
			   VIPCustomer,
			   Feedback) 
			   {

	
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
	
	//Change date format to dd/mm/yy
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



 // const App = () => (
  // <div>
    // <AmplifySignOut />
    
  // </div>
// ); 

function sayHello(name) {
    alert(`hello, ${name}`);
  }

function App() {
  return(
    // <div className="visit-form">
      // <h1>How About Them Apples</h1>
      // <form>
      // <fieldset>
         // <label>
           // <p>Name</p>
           // <input name="name" />
         // </label>
       // </fieldset>
       // <button type="submit">Submit</button>
      // </form>


	
	<div className="visit-form">
	
		<div className="visit-form--max-width">
<AmplifySignOut />
		  <div className="w3-container w3-dark-gray">
		  
			<h2>Visit Logger</h2>
		  </div>

		  <form className="w3-container w3-card-4 w3-padding-24">

			<p>We hope you had a good meeting. Please let us know a few details about your meeting.</p>
			<p></p>

			<label form="CustomerName">
			  <span>Customer name:</span>
			  <input className="w3-input w3-light-grey" type="text" id="CustomerName" />
			</label>
			<p></p>
			
			<label for="Salesperson">
				<label >Sales person name:</label>
				<input class="w3-input w3-light-grey" type="text" id="Salesperson"/>
			</label>
			<p></p>
			
        <label for="Date">
          <span>Date:</span>
          <input class="w3-input w3-light-grey" type="date" id="Date"/>
        </label>
        <p></p>		

        <label>Meeting type:</label>
        <select class="w3-select w3-light-grey" id="MeetingType">
          <option value="MEETING">Meeting</option>
          <option value="COLLECTION">Collection</option>
          <option value="COMPLAINT">Complaint</option>
          <option value="STOREVISIT">Store Visit</option>
          <option value="ADMIN">Admin Work</option>
        </select>
        <p></p>		
		
		<label for="MeetingSubject">
          <span>Meeting subject:</span>
          <input class="w3-input w3-light-grey" type="text" id="MeetingSubject"/>
        </label>
        <p></p>
		
		<label for="MeetingDetails">
          <span>Meeting details:</span>
          <textarea class="w3-input w3-light-grey" type="text" id="MeetingDetails"></textarea>
        </label>
        <p></p>
		
		<p>Did you meet a VIP customer?</p>
        <label>
          <input class="w3-radio" type="radio" name="vip-meeting" value="YES" onclick="getVIP()"/>
          <span>Yes</span>
        </label>
        <label>
          <input class="w3-radio" type="radio" name="vip-meeting" value="NO" onclick="getVIP()"/>
          <span>No</span>
        </label>
		
		<p>How was the meeting?</p>
        <label>
          <input class="w3-radio" type="radio" name="meeting-feedback" value="Good" onclick="getFeedback()"/>
          <img class="icon--size" src="fontawesome-free-5.15.3-web/smile-regular.svg"
               alt="smiling emoticon"/>
        </label>
        <label>
          <input class="w3-radio" type="radio" name="meeting-feedback" value="Neutral" onclick="getFeedback()"/>
          <img class="icon--size" src="fontawesome-free-5.15.3-web/meh-regular.svg"
               alt="meh emoticon"/>
        </label>
        <label>
          <input class="w3-radio" type="radio" name="meeting-feedback" value="Bad" onclick="getFeedback()"/>
          <img class="icon--size" src="fontawesome-free-5.15.3-web/frown-regular.svg"
               alt="frown emoticon"/>
        </label>
        <label>
          <input class="w3-radio" type="radio" name="meeting-feedback" value="Terrible" onclick="getFeedback()"/>
          <img class="icon--size" src="fontawesome-free-5.15.3-web/sad-cry-regular.svg"
               alt="sad crying emoticon"/>
        </label>
			
			<p></p>
			
			
		

			
		
		
			
		<button className="w3-btn w3-amber" type="button" onClick= {() => 
		
		callAPI(document.getElementById('CustomerName').value,
		document.getElementById('Salesperson').value,
		document.getElementById('Date').value,
		document.getElementById('Salesperson').value,
        document.getElementById('Date').value,
        document.getElementById('MeetingType').value,
		getVIP(),
		getFeedback()
		)}>Submit</button>

		  
		

			
	      </form>

		</div>
	</div>
	      // document.getElementById('Salesperson').value,
          // document.getElementById('Date').value,
          // document.getElementById('MeetingType').value,
          // document.getElementById('MeetingSubject').value,
          // document.getElementById('MeetingDetails').value,
          // vip_value,
          // feedback_value
		  
		  //		<button onClick={() => sayHello(getFeedback())}>Greet</button>
  )
}



export default withAuthenticator(App);