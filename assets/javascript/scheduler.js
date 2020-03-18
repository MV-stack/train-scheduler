$(document).ready(function () {
    // Firbase config
    var firebaseConfig = {
        apiKey: "AIzaSyD2vYBPnZvsS2L5LgPRrhebqhUAmS1oTeg",
        authDomain: "train-scheduler-deebf.firebaseapp.com",
        databaseURL: "https://train-scheduler-deebf.firebaseio.com",
        projectId: "train-scheduler-deebf",
        storageBucket: "train-scheduler-deebf.appspot.com",
        messagingSenderId: "570125928221",
        appId: "1:570125928221:web:4eb1786947636c3397c3f4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Reference the database.
    var database = firebase.database();

    // Variables for onClick
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;

    $("#add-train").on("click", function () {
        event.preventDefault();
        // Add train data
        name = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#firstTrainTime").val().trim();
        frequency = $("#frequency").val().trim();

        // Push train data to database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        // Clear form values
        $("#trainName").val("");
        $("#destination").val("");
        $("#frequency").val("");
        $("#firstTrainTime").val("");        
    });

    // Add childSnapshot
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var nextTrain = childSnapshot.val().nextTrain;
        var minutesAway = childSnapshot.val().minutesAway;

        // Checking values 
        console.log(name);
        console.log(destination);
        console.log(frequency);
        console.log(nextTrain);
        console.log(minutesAway);


        // Calculations using moment.js
        var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");        
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        var minutesAway = childSnapshot.val().frequency - remainder;
        var nextTrain = moment().add(minutesAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");
        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesAway)
        );
        

        $("#train-info").append(newRow);        
    
    });
    
});