let clickedDuration;
let createTitle = "";
let createLocation = "";
let createDescription = "";

// Meeting Duration Buttons
$(".create-duration-times").click(function() {
  let clicked = $(this);
  // Get data attr from clicked time
  clickedDuration = clicked.data("create-sec");
  localStorage.setItem("clickedDuration", clickedDuration);
  if (clicked.hasClass("active-button")) {
    $(".create-duration-times").removeClass("disabled"); // Enable all again
    clicked.removeClass("active-button");
  } else {
    $(".create-duration-times").removeClass("active-button");
    clicked.addClass("active-button");
    clicked.removeClass("disabled");
    $(".create-duration-times")
      .not(clicked)
      .addClass("disabled"); // Disable everything except clicked element
  }
});

var userID;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Signed in
    userID = user.uid;
    console.log(userID, "userID");
  } else {
    // No user is signed in.
    console.log("signed out", user);
  }
});

// Click on availability to show calendar
$("#create-save").click(function() {
  // Generate unique ID when save is clicked
  let uniqueID = (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2, 5)
  ).toUpperCase();
  localStorage.setItem("uniqueID", uniqueID);

  window.location.href = `calendar.html#${userID}`;
});

// Cancel button back to main page.
$(".create-cancel").click(function() {
  window.location.href = "main.html";
});

// Get value of title input
$("#create-title-input")
  .keyup(function() {
    createTitle = $(this).val();
  })
  .keyup();

// Set title to local storage
$("#create-location").blur(function() {
  localStorage.setItem("title", createTitle);
});

// Get value of location input
$("#create-location")
  .keyup(function() {
    createLocation = $(this).val();
  })
  .keyup();

//Set location to local storage
$("#create-location").blur(function() {
  localStorage.setItem("location", createLocation);
});

//Get value of description input
$("#create-description")
  .keyup(function() {
    createDescription = $(this).val();
  })
  .keyup();

//Set desciption to local storage
$("#create-description").blur(function() {
  localStorage.setItem("description", createDescription);
});
