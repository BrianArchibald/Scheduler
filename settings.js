//let timeZoneSettings = document.getElementById('settings-DropDownTimezone');
const timeZoneSubmit = document.getElementById('settings-timezone');

timeZoneSubmit.addEventListener('click', e => {
	let timeZoneSettings = document.getElementById('settings-DropDownTimezone').value;
	console.log(timeZoneSettings);
})
