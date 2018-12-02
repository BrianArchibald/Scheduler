const doneButton = document.getElementById('calender-done-button');

doneButton.addEventListener('click', e => {
	location.href=`booking.html#${userID}`;
})

