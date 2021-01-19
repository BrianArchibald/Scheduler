let clickedDuration;
let createTitle = "";
let createLocation = "";
let createDescription = "";

$(".create-duration-times").click(function() {
  let clicked = $(this);
  clickedDuration = clicked.data("create-sec");
  localStorage.setItem("clickedDuration", clickedDuration);
  if (clicked.hasClass("active-button")) {
    $(".create-duration-times").removeClass("disabled");
    clicked.removeClass("active-button");
  } else {
    $(".create-duration-times").removeClass("active-button");
    clicked.addClass("active-button");
    clicked.removeClass("disabled");
    $(".create-duration-times")
      .not(clicked)
      .addClass("disabled");
  }
});

let userID;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userID = user.uid;
    console.log(userID, "userID");
  } else {
    console.log("signed out", user);
  }
});

// Click on availability to show calendar
$("#create-save").click(function() {
  let uniqueID = (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2, 5)
  ).toUpperCase();
  localStorage.setItem("uniqueID", uniqueID);

  window.location.href = `calendar.html#${userID}`;
});

$(".create-cancel").click(function() {
  window.location.href = "main.html";
});

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
