
window.onload = function () {
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB11-WmRlcL4U_jAD3J9g-qFoXFO1vFGP0",
    authDomain: "bootcamp-test-dtg.firebaseapp.com",
    databaseURL: "https://bootcamp-test-dtg.firebaseio.com",
    projectId: "bootcamp-test-dtg",
    storageBucket: "bootcamp-test-dtg.appspot.com",
    messagingSenderId: "661065361"
  };
  firebase.initializeApp(config);

//Create a variable to reference the database
var database = firebase.database();

//Initial Values
var trainName = "";
var destination = "";   
var firstTime = "";
var frequency = "";

// Submit Button Click
$("#submit-button").on("click", function(event) {

    event.preventDefault();

	
	// Code in the logic for storing and retrieving the most recent trains.
	trainName = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	firstTime = $("#firsttrain-input").val().trim();
	frequency = $("#frequency-input").val().trim();


    console.log("Train name: " + trainName);
    console.log("Destination: " + destination);
    console.log("First time: " + firstTime);
    console.log("Frequency: " + frequency);

	$("#train-input").val("");
	$("#destination-input").val("");
	$("#firsttrain-input").val("");
	$("#frequency-input").val("");

	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency
	});


});

// Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      trainName = childSnapshot.val().trainName;
      destination = childSnapshot.val().destination
      firstTime = childSnapshot.val().firstTime;
      frequency = childSnapshot.val().frequency;


      var firstTimeMoment = moment(firstTime, "HH:mm");
      console.log("TIME CONVERTED: " + firstTimeMoment);
      
      // It is Now - moment
      var currentTime = moment();
      // console.log("Now TIME: " + currentTime);

      var minuteArrival = currentTime.diff(firstTimeMoment, 'minutes');
      var minuteLast = minuteArrival % frequency;
      var awayTrain = frequency - minuteLast;

      // console.log("Minutes: " + minuteArrival);
      // console.log("Minutes Last: " + minuteLast);
      // console.log("Away Train: " + awayTrain);

      var nextArrival = currentTime.add(awayTrain, 'minutes');
      var arrivalTime = nextArrival.format("HH:mm");
      // console.log("Away Arrival: " + nextArrival);
      // console.log("Arrival Time: " + arrivalTime);

      
    // full list of items to the well
	$("#NewTrain").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivalTime + "</td><td>" + awayTrain + "</td>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
}