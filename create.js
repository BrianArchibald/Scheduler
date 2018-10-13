// Meeting Duration Buttons
$(".create-duration-times").click(function() {
     let clicked = $(this);
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
// Click on Availability to show calendar
$("#create-save").click(function() {
 	window.location.href='calendar.html';
});
// Cancel button back to main page.
$('.create-cancel').click(function(){
   window.location.href='main.html';
})
