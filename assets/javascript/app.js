
//firebase link
  // Your web app's Firebase configuration
 /* var firebaseConfig = {
    apiKey: "AIzaSyABne-83rJ0DOe8R2AR_Bm_FAz14hlzkcE",
    authDomain: "train-scheduler-86.firebaseapp.com",
    databaseURL: "https://train-scheduler-86.firebaseio.com",
    projectId: "train-scheduler-86",
    storageBucket: "train-scheduler-86.appspot.com",
    messagingSenderId: "952502562757",
    appId: "1:952502562757:web:90394e04a14df3452c65ac"
  }; */
  // Initialize Firebase
 // firebase.initializeApp(firebaseConfig);
  
  //global variables

  //let database = firebase.database()

  //current time via moment.js
  let currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);

  let database = [];
  let trainName = "";
  let destination = "";
  let frequency = ""; // use this input to help calculate nextArrival and minutesAway
  let firstTrainTime = ""; // use this input to help calculate nextArrival and minutesAway
  // Defining variables used to compute "nextArrival" & "minutesAway" globally so they can be re assigned a new value inside the event listener
  let firstTrainTimeConverted; 
  let differenceInTime;
  let timeRemaining;
  let minutesAway;
  let nextArrival; 

  // form submit-btn event listener
$(document).ready (function(){


  $("#submit-btn").on("click", function (event) {
    event.preventDefault();

    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-train-time-input").val().trim(); // use this value to compute nextArrival and minutesAway
    frequency = $("#frequency-input").val().trim();

    //variables "nextArrival" & "minutesAway" computed using moment.js
    firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years")
    differenceInTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    timeRemaining = differenceInTime % frequency;
    minutesAway = frequency - timeRemaining;
    nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    let newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
     // dateAdded: currentTime
    };

   // database.ref().push(newTrain);
    database.push(newTrain);

  //  console.log(newTrain.trainName);
  //  console.log(newTrain.destination);
  //  console.log(newTrain.firstTrainTime);
  //  console.log(newTrain.frequency);
  //  console.log(newTrain.dateAdded);
   console.log(database);

    //clears form inputs

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val(""); 
    $("#frequency-input").val("");

    appendRow();
  });
})
  // Use moment.js and variables "frequency" and "firstTrainTime" to calculate variables "nextArrival" and "minutesAway"

  //append table row from form input

  var appendRow = function() {
    var tRow = $('<tr>');
    var trainNameTd = $('<td>').text(trainName);
    var destinationTd = $('<td>').text(destination);
    var frequencyTd = $('<td>').text(frequency);
    var nextArrivalTd = $('<td>').text(nextArrival);
    var minutesAwayTd = $('<td>').text(minutesAway);
    
  
    tRow.append(
      trainNameTd,
      destinationTd,
      frequencyTd,
      nextArrivalTd,
      minutesAwayTd
    );
  
    $('tbody').append(tRow);
  };

 /* database.on("child_added", function(snapshot) {
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstTrainTime);
      console.log(snapshot.val().frequency);
     // console.log(snapshot.val().dateAdded);
      
  },function(errorObject) {
      console.log('Errors handled: ' + errorObject.code);
    }
  ); */
  




