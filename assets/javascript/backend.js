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
     var trainName = " ";
     var destination = " ";
     var frequency = " ";
     var nextArrival = " ";
     var minutesAway = " ";
     var firstTime = " ";

// on click function takes input information and assigns it to the table
    $("#addEmployee").on("click", function(){

        event.preventDefault();

        trainName = $("#trainName").val();
        destination = $("#destination").val();
        firstTime = $("#firstTime").val();
        frequency = $("#frequency").val();

        database.ref().set({

        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
        
      });

// firebase reference for variables
        database.ref().on("child_added", function(snapshot) {

        var trainRow = $("<tr>");

        trainRow.append(snapshot.val().trainName);
        trainRow.append(snapshot.val().destination);
        trainRow.append(snapshot.val().firstTime);
        trainRow.append(snapshot.val().frequency);
      
        $("#tableRow").append(trainRow);

        });
        
        
      });
    });