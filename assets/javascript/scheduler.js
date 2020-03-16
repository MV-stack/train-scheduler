
// Your web app's Firebase configuration
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

// Get a reference to the database
var database = firebase.database();
// variables for adding train
var name;
var destination;
var firstTrain;
var frequency = 0;
