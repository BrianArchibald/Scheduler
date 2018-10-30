const nav = document.querySelector('.nav-container-main');
const mobileNavIcon = document.querySelector('.mobile-nav-icon');
const mobileNavList = document.querySelector('#mobile-nav');
const closeMenu = document.querySelector('#close-menu');
//const signOut = document.getElementById('main-sign-out');

function changeMobileNav() {
  if (nav.style.display != "none") {
    mobileNavIcon.style.display = "none";
    nav.style.display = "none";
    mobileNavList.style.display = "block";
  } else {
    mobileNavIcon.style.display = "inline-block";
    nav.style.display = "flex";
    mobileNavList.style.display = "none";
  }
}
mobileNavIcon.addEventListener('click', changeMobileNav);
closeMenu.addEventListener('click', changeMobileNav);

// Show/Hide Edit Buttons on Meeting Link
// $(".link-edit-container").click(function () {
//   $(this).toggleClass("buttons-not-hidden");
// })

//Create Meeting click
$('.create-link-button').click(function(){
   window.location.href='createMeeting.html';
})

//Sign Out User
$('#main-sign-out').click(function(){
  console.log('sign out clicked');
  firebase.auth().signOut().then(function() {
    console.log('sign out successful');
    window.location.href="index.html";
  }).catch(function(error) {
    console.log('error happened');
  });
})

//Get userID from local storage
let userID = localStorage.getItem('userID');
//Get url and set as link for meetings
let meetingLink = `calendar.html#${userID}`;
// Set href on sheduled meetings
$('ind-link-id').attr('href',meetingLink);
document.getElementById("ind-link-id").innerHTML = 'Scheduled Meeting Link';

//Copy meeting link to clipboard via copy button
function copyToClipboard(element) {
  let $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

//Delete link when delete button clicked
$('.delete-meeting-link').click(function(){
  document.getElementById("ind-link-id").innerHTML = "";
})
