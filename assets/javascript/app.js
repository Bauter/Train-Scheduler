
//Initialize Firebase
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyABne-83rJ0DOe8R2AR_Bm_FAz14hlzkcE",
    authDomain: "train-scheduler-86.firebaseapp.com",
    databaseURL: "https://train-scheduler-86.firebaseio.com",
    projectId: "train-scheduler-86",
    storageBucket: "train-scheduler-86.appspot.com",
    messagingSenderId: "952502562757",
    appId: "1:952502562757:web:90394e04a14df3452c65ac"
  }; 
 
  firebase.initializeApp(firebaseConfig);
  
  //global variables

  let database = firebase.database()

  //current time via moment.js
  let currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);

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
      timeAdded: currentTime,
      minutesAway: minutesAway,
      nextArrival: nextArrival,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    database.ref().push(newTrain);

   console.log(newTrain.trainName);
   console.log(newTrain.destination);
   console.log(newTrain.firstTrainTime);
   console.log(newTrain.frequency);
   console.log(newTrain.timeAdded);
   console.log(newTrain.dateAdded);
   //console.log(database);

    //clears form inputs

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val(""); 
    $("#frequency-input").val("");

    //appendRow(); // using firebase to append table row
  });

  //append table row from form input

  // var appendRow = function() {
  //   var tRow = $('<tr>');
  //   var trainNameTd = $('<td>').text(trainName);
  //   var destinationTd = $('<td>').text(destination);
  //   var frequencyTd = $('<td>').text(frequency);
  //   var nextArrivalTd = $('<td>').text(nextArrival);
  //   var minutesAwayTd = $('<td>').text(minutesAway);
    
  
  //   tRow.append(
  //     trainNameTd,
  //     destinationTd,
  //     frequencyTd,
  //     nextArrivalTd,
  //     minutesAwayTd
  //   );
  
  //   $('tbody').append(tRow);
  // };

  database.ref().on("child_added", function(snapshot) {
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstTrainTime);
      console.log(snapshot.val().frequency);
      console.log(snapshot.val().timeAdded);
      console.log(snapshot.val().minutesAway);
      console.log(snapshot.val().nextArrival);
      console.log(snapshot.val().dateAdded);
      
  },function(errorObject) {
      console.log('Errors handled: ' + errorObject.code);
    }
  );
  
  database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    // re-calculating nextArrival and minutesAway to update on reload
    firstTrainTimeConverted = moment(snapshot.val().firstTrainTime, "HH:mm").subtract(1, "years")
    differenceInTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    timeRemaining = differenceInTime % snapshot.val().frequency;
    minutesAway = snapshot.val().frequency - timeRemaining;
    nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    // creating and appending table row
    tRow = $('<tr>');
    trainNameTd = $('<td>').text(snapshot.val().trainName);
    destinationTd = $('<td>').text(snapshot.val().destination);
    frequencyTd = $('<td>').text(snapshot.val().frequency);
    nextArrivalTd = $('<td>').text(nextArrival);
    minutesAwayTd = $('<td>').text(minutesAway);

    tRow.append(
      trainNameTd,
      destinationTd,
      frequencyTd,
      nextArrivalTd,
      minutesAwayTd
    );
    
    $('tbody').append(tRow);
    
  });

  $("#update").on("click", function() {
    location.reload();
  })

})
  
  




