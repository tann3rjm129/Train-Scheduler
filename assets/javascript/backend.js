$(document).ready(function(){
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_vdj-9y2ucqMOrdydXkVux73ftmXIw0Y",
    authDomain: "trainscheduler-83911.firebaseapp.com",
    databaseURL: "https://trainscheduler-83911.firebaseio.com",
    projectId: "trainscheduler-83911",
    storageBucket: "",
    messagingSenderId: "223254502049"
  };
  firebase.initializeApp(config);
    // Create a variable to reference the database
    var database = firebase.database();
     var trainName = "";
     var destination = "";
     var frequency = 0;
     var nextArrival = 0;
     var minutesAway = 0;
     var firstTime = 0;

// on click function takes input information and assigns it to the table
    $("#addTrain").on("click", function(){

        event.preventDefault();

        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTime = $("#firstTime").val().trim();
        frequency = $("#frequency").val().trim();

        // time calculation
        // First time - needs to be pushed back a year to come before current time
        var timeConverter = moment(firstTime, "hh:mm a").subtract(1, "years");
        var timeDifference = moment().diff(moment(timeConverter), "minutes");
        // remainder
        var timeRemaining = timeDifference % frequency;
        // minutes until next train
        var timeToNextTrain = frequency - timeRemaining;
        nextArrival = moment().add(timeToNextTrain, "minutes").format("hh:mm a");

        database.ref().set({

        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        nextArrival: nextArrival,
        timeToNextTrain: timeToNextTrain
        
      });




// firebase reference for variables
        database.ref().on("child_added", function(snapshot) {

          // append table row
        var trainRow = $("<tr></tr>");

        // table coloumns
        trainRow.append("<td>" + snapshot.val().trainName + "</td>");
        trainRow.append("<td>" + snapshot.val().destination + "</td>");
        trainRow.append("<td>" + snapshot.val().frequency + "</td>");
        trainRow.append("<td>" + snapshot.val().nextArrival + "</td>");
        trainRow.append("<td>" + snapshot.val().timeToNextTrain + "</td>");
      
        $("#tableRow").append(trainRow);

        });
        
        });
     
    });