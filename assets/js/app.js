
// FUNCTIONS
// ============
function setBackgroundImage(myObject, imageUrl) {
  myObject.css({
               "background-image": "url(" + imageUrl + ")",
               "background-position": "center",
               "background-size": "cover",         
               "background-attachment": "fixed"  
               });
};

var jumbotron = $("#section-jumbotron");
var imageUrl = 'assets/images/image2.jpg';

// GLOBAL VARIABLES
// ================

 
 
  

// MAIN PROCESS
// ============


$(document).ready(function(){
    //Sets background of jumbotron to imageUrl
    setBackgroundImage(jumbotron, imageUrl);

    $(function(){
        var scroll = new SmoothScroll('a[href*="#section-"]');
    });

    //Enables select form from Materialize
    $('select').formSelect();


        // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCmHmdKbE5Bo0Gu1kzo82FZ7Fbbv47AK7o",
        authDomain: "vmsapp-dd2e5.firebaseapp.com",
        databaseURL: "https://vmsapp-dd2e5.firebaseio.com",
        projectId: "vmsapp-dd2e5",
        storageBucket: "vmsapp-dd2e5.appspot.com",
        messagingSenderId: "284192092734"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    var regNumber;
    var countryBirth;
    var createdBy;
    var firstName;
    var lastName;
    var healthInfo;
    var meetingWith;
    var status;
    var timeIn;
    var timeOut;
    var visitDate;
    var visitPurpose;
    var phone;
    var key;

  // Capture checkin Button Click
  $("#checkin-btn").on("click", function(event) {
    // Prevent the page from refreshing
    event.preventDefault();

     // Grabbed values from the form
    firstName = $("#first_name").val().trim();
    lastName = $("#last_name").val().trim();
    phone = $("#phone").val().trim();
    visitPurpose = $("#reason").val().trim();
    regNumber = "";
    visitDate = "";
    meetingWith = "";
    timeIn = "";
    timeOut = "";
    status = "";
    countryBirth = "";
    healthInfo = "";

    // Creates local "temporary" object for holding the visitor data
    var visitor = {
        regNumber: regNumber,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        visitPurpose: visitPurpose,
        visitDate: visitDate,
        meetingWith: meetingWith,
        timeIn: timeIn,
        timeOut: timeOut,
        status: status,
        countryBirth: countryBirth,
        healthInfo: healthInfo,  
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    console.log(visitor);

    // Pushes train data to the database
    database.ref().push(visitor);
    alert("Visitor successfully added");
    
    //Clears the form
    resetForm();
 });

 //Create Firebase event for adding train info to the database and a row in the html when a user adds an entry
 database.ref().on("child_added", function(childSnapshot) {
       
    //Firebase watcher + initial loader. Store everything into a variable.
     
        regNumber = childSnapshot.val().regNumber;
        firstName = childSnapshot.val().firstName;
        lastName = childSnapshot.val().lastName;
        phone = childSnapshot.val().phone;
        visitPurpose = childSnapshot.val().visitPurpose;
        visitDate = childSnapshot.val().visitDate;
        meetingWith = childSnapshot.val().meetingWith;
        timeIn = childSnapshot.val().timeIn;
        timeOut = childSnapshot.val().timeOut;
        status  = childSnapshot.val().status;
        countryBirth = childSnapshot.val().countryBirth;
        healthInfo= childSnapshot.val().healthInfo;
        key = childSnapshot.key;
          // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
 });

});  