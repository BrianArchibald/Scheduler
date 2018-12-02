let forward = document.getElementById('forward'); 
let backward = document.getElementById('backward'); 
forward.href = `#${window.location.href.split("#")[1]}`
backward.href = `#${window.location.href.split("#")[1]}`
		
//flags to tell if all three buttons clicked to display modal
let durationClicked = false;
let dayClicked = false;
let meetingTimeClicked = false;

let n = 0;
let modalName = "";
let modalEmail = "";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
let d = new Date();
let weekday = new Array(7);
	weekday[0] = "Sun";
	weekday[1] = "Mon";
	weekday[2] = "Tue";
	weekday[3] = "Wed";
	weekday[4] = "Thur";
	weekday[5] = "Fri";
	weekday[6] = "Sat";
let newDay = weekday[d.getDay()];
let currentYear = new Date().getFullYear();	

function initWeekCalendar (x) {
    var weekHtml = "";
    n = n + x;
    n = n < 0 ? 0 : n;
	for (let i = n*7; i < (n*7)+7; i++) {		
		Date.prototype.addDays = function(days) {
		    let date = new Date(this.valueOf());
		    date.setDate(date.getDate() + days);
		    return date;
		}
		let date = new Date();
		let dayOfWeek = weekday[date.addDays(i).getDay()];
		let dayOfMonth = date.addDays(i).getMonth();
			
			weekHtml +=
			`<div class="booking-day">
				<div class="booking-day-title">${dayOfWeek}</div>
					<button class="booking-day-button" data-date="${date.addDays(i).getDate()}" data-month="${dayOfMonth}" data-year="${currentYear}" onclick="activeClass(this, $(this))">
						<div class="booking-day-button-month">${monthNames[dayOfMonth]}</div>
						<div class="booking-day-dayOfMonth">${date.addDays(i).getDate()}</div>
					</button>
			</div>`;
	}
	document.getElementById("booking-calendar").innerHTML = weekHtml;
}

let dateLeftArrow = undefined;
let dateRightArrow = undefined;

$(".fa-arrow-left").click(function() {
	// Need to have date - 7 days
	Date.prototype.addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        // Return date;
        let dateLeftArrow = date.addDays(-7);
        return dateLeftArrow;
    }
	initWeekCalendar(-1);
})

$(".fa-arrow-right").click(function() {
	// Need to have date + 7 days
	Date.prototype.addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        // Return date;
        let dateRightArrow = date.addDays(7);
        return dateRightArrow;
    }
	initWeekCalendar(1);
})

let startTimes = 0;
let endTimes = 0;
let interval = 0;
let userTimeZone = 0;

// Add active class to duration clicked
$(".booking-time-button").click(function() {
    let clicked = $(this);
	  if (clicked.hasClass('active-button')) {
	    $('.booking-time-button').removeClass('disabled'); // Enable all again  
	    clicked.removeClass('active-button');
	  } else {
	   $('.booking-time-button').removeClass('active-button');
	    clicked.addClass('active-button');
	    clicked.removeClass('disabled');
	    $('.booking-time-button').not(clicked).addClass('disabled'); // Disable everything except clicked element
	  }
	  if($('.booking-time-button').hasClass('active-button')) {
		durationClicked = true;
		} else {
		durationClicked = false;
		}

	interval = $(this).data("sec");
	let adjustedstartTime = startTimes + interval;
	document.getElementById("booking-time").innerHTML = "";

	populateTimes(adjustedstartTime,endTimes, interval);

	if (  $('#booking-calendar .active-button').length )
		activeClass(document.querySelector('#booking-calendar .active-button'), clicked );
});

// Add active class to button clicked
$(".booking-time-selector").click(function() {
	let clicked = $(this);
	console.log(clicked);
	  if (clicked.hasClass('active-button')) {
	    $('.booking-time-selector').removeClass('disabled'); // Enable all again  
	    clicked.removeClass('active-button');
	  } else {
	   $('.booking-time-selector').removeClass('active-button');
	    clicked.addClass('active-button');
	    clicked.removeClass('disabled');
	    $('.booking-time-selector').not(clicked).addClass('disabled'); // Disable everything except clicked element
	  }

	if($('.booking-time-selector').hasClass('active-button')) {
		meetingTimeClicked = true;
		} else {
		meetingTimeClicked = false;
	}		 
});

let clickedTimeButton;

// Add active class to specific time button
function activeClassSpecificTime(el) {
	let clicked = $(el);
	// Get specific time of meeting for Modal
	clickedTimeButton = clicked[0].innerHTML;
	// Add active class to button clicked
	  if (clicked.hasClass('active-button')) {
	    $('.booking-time-selector').removeClass('disabled'); // Enable all again  
	    clicked.removeClass('active-button');
	  	} else {
	   $('.booking-time-selector').removeClass('active-button');
	    clicked.addClass('active-button');
	    clicked.removeClass('disabled');
	    $('.booking-time-selector').not(clicked).addClass('disabled'); // Disable everything except clicked element
		}
		meetingTimeClicked = true;
		runModal();
};

function runModal() {
	if(durationClicked && dayClicked && meetingTimeClicked) {
		$('.pre-confirm-modal').css('display', 'grid');
		$('.booking-wrapper').css('opacity', '.4');
	}
	// Add date/time of meeting to modal
	$('.pre-confirm-time').html("Your meeting is on " + totalDateClicked + " at " + clickedTimeButton);
};

// Cancel button on modal
$('.confirm-modal-cancel-button').click(function () {
	$('.pre-confirm-modal').css('display', 'none');
	$('.booking-wrapper').css('opacity', '1');
})

let modalSaveDate = 0;

//Submit button on modal
$('.modal-signup-button').click(function () {
	//Get current time submit is clicked for main page.
	let modalSaveDate = new Date();
	let dd = modalSaveDate.getDate();
	let mm = modalSaveDate.getMonth()+1; 
	const yyyy = modalSaveDate.getFullYear();
	if(dd<10) 
	{
	    dd=`0${dd}`;
	} 
	if(mm<10) 
	{
	    mm=`0${mm}`;
	} 
	modalSaveDate = `${mm}/${dd}/${yyyy}`;
	
	sendUserEmail();
	sendOwnerEmail();
	addMeetingToFirebase();

	// Change Modal text after submit to success.
	$('#booking-modal').html('Congratulations on scheduling your meeting!  Both parties will receive email confirmations with the details');
	$('.pre-confirm-modal').addClass('modalSuccess');
})

// Use emailjs to send user confirmation email
function sendUserEmail() {
	let template_params = {
	   "ownerEmail": ownerEmail,
	   "modalEmail":  modalEmail,
	   "modalName": modalName,
	   "clickedTimeButton": clickedTimeButton,
	   "totalDateClicked": totalDateClicked,
	   "meetingDescription": meetingDescription,
	   "meetingLocation": meetingLocation
	}
	let service_id = "default_service";
	let template_id = "scheduler_confirm";
	emailjs.send(service_id,template_id,template_params);	
}

// Use emailjs to send owner confirmation email
function sendOwnerEmail() {
	let template_params = {
	   "ownerEmail": ownerEmail,
	   "modalEmail":  modalEmail,
	   "modalName": modalName,
	   "clickedTimeButton": clickedTimeButton,
	   "totalDateClicked": totalDateClicked,
	   "meetingDescription": meetingDescription,
	   "meetingLocation": meetingLocation
	}
	let service_id = "default_service";
	let template_id = "scheduler_confirm";
	emailjs.send(service_id,template_id,template_params);
}

function addMeetingToFirebase() {
	let userID = `#${window.location.href.split("#")[1]}`;
	interval = interval / 60 + ' mins';
		// Send meeting details to firebase
		db.collection('booked').add({   
			title: meetingTitle,
	    	location: meetingLocation,
	    	date: totalDateClicked,
	    	time: clickedTimeButton,
	    	description: meetingDescription,
	    	modalEmail: modalEmail,
	    	name: modalName,
	    	userID: userID,
	    	interval: interval
	})  
	.then(function() {
	    console.log("Document successfully written!");
	})
	.catch(function(error) {
	    console.error("Error writing document: ", error);
	});
}	

// Get name on modal
$('.modal-name-input').keyup(function() {
	return modalName = $( this ).val();
}).keyup();

// Get email on modal
$('.modal-email-input').keyup(function() {
	return modalEmail = $( this ).val();
}).keyup();

let monthClicked = 0;
let monthNameClicked = monthNames[monthClicked];
let dateClicked = 0;
let yearClicked = 0;
let totalDateClicked = "";
let ownerEmail = "";
let meetingTitle = "";
let meetingLocation = "";
let meetingDescription = "";
let userDurationClicked = 0;

function activeClass(el, target) {
	let clicked = $(el);
	document.getElementById("booking-time").innerHTML = "";
	
	// Add active class to button clicked
	  if (clicked.hasClass('active-button') && !target.hasClass('booking-time-button') ) {
	    $('.booking-day-button').removeClass('disabled'); //enable all again  
	    clicked.removeClass('active-button');
	  	} else {
	   $('.booking-day-button').removeClass('active-button');
	    clicked.addClass('active-button');
	    clicked.removeClass('disabled');
	    $('.booking-day-button').not(clicked).addClass('disabled'); //disable everything except clicked element
		}

		if($('.booking-day-button').hasClass('active-button')) {
		dayClicked = true;
			} else {
		dayClicked = false;
		}	

	let fixedMonth = parseInt(el.dataset.month) + 1;
	let dayPlusOne = parseInt(el.dataset.date) + 1;
	let calData = el.dataset.year + "-" + fixedMonth + "-" + el.dataset.date;
	let calDataPlusDay = el.dataset.year + "-" + fixedMonth   + "-" + dayPlusOne;
	let start = new Date(calData);
	let end = new Date(calDataPlusDay);

    // Get day from db of the day clicked
    this.db.collection('events')  
        .where('start_date', '>', start)
        .where('start_date', '<', end)
        .where('holder', '==', window.location.href.split("#")[1])
            .get()
				.then(function(querySnapshot) {					
					if(!querySnapshot.docs.length){
						document.getElementById("booking-time").innerHTML = 'No times available';
						return;
					}
		    		querySnapshot.forEach(function(doc) {
					ownerEmail = doc.data().email;
					timeZoneDB = doc.data().start_date.toDate();
					meetingTitle = doc.data().title;
					meetingLocation = doc.data().location;
					$('#location').html(meetingLocation);
					meetingDescription = doc.data().description;
					userDurationClicked = parseInt(doc.data().duration);
		       		startTimes = doc.data().start_date.seconds - interval;
		       		endTimes = doc.data().end_date.seconds;

		       		// Run function to populate drop down times
		       		populateTimes(startTimes, endTimes, interval);	
	    		});
	})
	.catch(function(error) {
  		console.log("Error getting documents: ", error);
	});	 

	monthClicked = clicked[0].dataset.month;
	monthClicked = parseInt(clicked[0].dataset.month) + 1;
	if (monthClicked > 12) {
		monthClicked = 1;
	}
	dateClicked = clicked[0].dataset.date;
	yearClicked = clicked[0].dataset.year;
	totalDateClicked = monthClicked + "/" + dateClicked + "/" + yearClicked;    
}

let timeZoneDate = new Date();
userTimeZone = timeZoneDate.getTimezoneOffset() * 60;

function populateTimes (start, end, seconds) {
	if (start != 0 && end != 0) {
		let startHtml = "";
		if(seconds) {
			do {
			 	start = start + seconds;
			 	endTimes = end - start;
			 	if(seconds > endTimes) {
			 		startHtml = "No times available";
			 		break;
			 	}
				let startFormatted = new Date(start * 1000);
				let formattedTime = startFormatted.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
					startHtml +=
					`<button class="booking-time-selector booking-button" data-hour-min=${formattedTime} onclick="activeClassSpecificTime(this)">${formattedTime}</button>`;
			} while (endTimes >= seconds * 2);
		document.getElementById("booking-time").innerHTML += startHtml;
		}
	}
}

initWeekCalendar(0);