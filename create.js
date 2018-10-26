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
    return createTitle = $( this ).val();
  })
  .keyup();

//Get value of location input
$( "#create-location" )
  .keyup(function() {
    return createLocation = $( this ).val();
  })
  .keyup();

  //Get value of description input
$( "#create-description" )
  .keyup(function() {
    return createDescription = $( this ).val();
  })
  .keyup();