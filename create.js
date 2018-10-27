let clickedDuration;
let createTitle = "";
let createLocation = "";
let createDescription = "";

// Meeting Duration Buttons
$(".create-duration-times").click(function() {
     let clicked = $(this);
     // get data attr from clicked time
     clickedDuration = clicked.data('create-sec');
     console.log(clickedDuration);
     localStorage.setItem('clickedDuration', clickedDuration);
	 if (clicked.hasClass('active-button')) {
	   $('.create-duration-times').removeClass('disabled'); //enable all again  
	   clicked.removeClass('active-button');
	 } else {
	  $('.create-duration-times').removeClass('active-button');
	   clicked.addClass('active-button');
	   clicked.removeClass('disabled');
	   $('.create-duration-times').not(clicked).addClass('disabled'); //disable everything except clicked element
	 }
});

var userID;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //signed in
     userID = user.uid;
    console.log(userID, "userID");
  } else {
    // No user is signed in.
    console.log("signed out", user);
  }
});

// Click on availability to show calendar
$("#create-save").click(function() {

 	window.location.href=`calendar.html#${userID}`;
});

// Cancel button back to main page.
$('.create-cancel').click(function(){
   window.location.href='main.html';
})

//Get value of title input
$( "#create-title-input" )
  .keyup(function() {
    createTitle = $( this ).val();
  })
  .keyup();
  //Set title to local storage
  $("#create-location").blur(function() {
    localStorage.setItem("title", createTitle);
    console.log("blur");
  });

//Get value of location input
$( "#create-location" )
  .keyup(function() {
    createLocation = $( this ).val();
  }) 
  .keyup();
//Set location to local storage
  $("#create-location").blur(function() {
    localStorage.setItem("location", createLocation);
    console.log("blur");
  });

  //Get value of description input
$( "#create-description" )
  .keyup(function() {
    createDescription = $( this ).val();
  })
  .keyup();
  //Set desciption to local storage
  $("#create-description").blur(function() {
    localStorage.setItem("description", createDescription);
    console.log("blur");
  });