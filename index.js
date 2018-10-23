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




// // Copy to clipboard 
// function copyToClipboard(elementId) {

//   // Create a "hidden" input
//   var aux = document.createElement("input");

//   // Assign it the value of the specified element
//   aux.setAttribute("value", document.getElementById(elementId).innerHTML);

//   // Append it to the body
//   document.body.appendChild(aux);

//   // Highlight its content
//   aux.select();

//   // Copy the highlighted text
//   document.execCommand("copy");

//   // Remove it from the body
//   document.body.removeChild(aux);

// }

// <p id="p1">P1: I am paragraph 1</p>
// <p id="p2">P2: I am a second paragraph</p>
// <button onclick="copyToClipboard('p1')">Copy P1</button>
// <button onclick="copyToClipboard('p2')">Copy P2</button>
// <br/><br/><input type="text" placeholder="Paste here for test" />


// Copy to clipboard 
function copyToClipboard(elementId) {
  console.log("copy ran");
  // Create a "hidden" input
  var aux = document.createElement("input");

  // Assign it the value of the specified element
  aux.setAttribute("value", document.getElementById(elementId).innerHTML);

  // Append it to the body
  document.body.appendChild(aux);

  // Highlight its content
  aux.select();

  // Copy the highlighted text
  document.execCommand("copy");

  // Remove it from the body
  document.body.removeChild(aux);

}