//let timeZoneSettings = document.getElementById('settings-DropDownTimezone');
const timeZoneSubmit = document.getElementById('settings-timezone');
let timeZoneSettings;

timeZoneSubmit.addEventListener('click', e => {
	return timeZoneSettings = document.getElementById('settings-DropDownTimezone').value;
	console.log(timeZoneSettings);
})

//Sign Out User
$('.settings-sign-out').click(function(){
  console.log('sign out clicked');
  firebase.auth().signOut().then(function() {
    console.log('sign out successful');
    window.location.href="index.html";
  }).catch(function(error) {
    console.log('error happened');
  });
})