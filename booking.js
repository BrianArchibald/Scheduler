const bookingModal = document.getElementById('booking-modal');

// when all three options are checked modal will pop up
// bookingModal.style.display = "block";


//

// If user clicks outside the modal, it will close
window.onclick = function() {
	if (event.target != bookingModal) {
		bookingModal.style.display = "none";
	}
}