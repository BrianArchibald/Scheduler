firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("signed in");
    console.log(user.uid);
  } else {
    // No user is signed in.
    console.log("signed out", user);
  }
});

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

// //Get userID from local storage
// let userID = localStorage.getItem('userID');
// //Get url and set as link for meetings
// let meetingLink = `calendar.html#${userID}`;
// // Set href on sheduled meetings
// $('ind-link-id').attr('href',meetingLink);
// document.getElementById("ind-link-id").innerHTML = 'Scheduled Meeting Link';

//Copy meeting link to clipboard via copy button
function copyToClipboard(element) {
  let $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

//Delete link when delete button clicked
// function cancelMeeting(id) {
//   console.log(" clicked");
// }


// $( document ).ready(function(){
//     // Sets up click behavior on all button elements with the alert class
//     // that exist in the DOM when the instruction was executed
//     $( "cancel-booked" ).click(function() {
       
//         console.log( "A button with the alert class was clicked!" );
//     }, 1500);
// });


let dataArray = [];
let userID = '#' + localStorage.userID;
let holder = localStorage.userID;
db.collection("events")
  .where('holder', '==', holder).orderBy('start_date')
    .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              let data = (doc.id, " => ", doc.data());
              console.log(data);
              dataArray.push(data);
              // uniqueTitles = [...new Set(dataArray.map(item => item.title))];
              // console.log(uniqueTitles);
              //date=data.start_date;
              //date_seconds=date.seconds;

              // time the meeting is at on modal
              //let actual_date=new Date(date_seconds).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true });

              //may not need this if above has all the info
              //let d = new Date(date_seconds); // or whatever date you have
              //let tzName = d.toLocaleString('en', {timeZoneName:'short'}).split(' ').pop();

             // let myHTML='<li class="link-li-container"><div class="ind-link-text"><a class="ind-link" id="test" href="#">'+data.title+'</a></div><div class="link-edit-container"><div class="meeting-link-buttons"><button class="edit-meeting-link meeting-buttons" href="#">Edit</button><button class="copy-meeting-link meeting-buttons">Copy</button><button class="visit-meeting-link meeting-buttons" href="calendar.html">Visit</button><button class="delete-meeting-link meeting-buttons delete-meeting">Delete</button></div></div></li>';
             // document.getElementById('meetings_div').innerHTML += myHTML;  

             // let myHTML='<li class="link-li-container"><div class="ind-link-text"><a class="ind-link" id="test" href="#">'+uniqueTitles+'</a></div><div class="link-edit-container"><div class="meeting-link-buttons"><button class="edit-meeting-link meeting-buttons" href="#">Edit</button><button class="copy-meeting-link meeting-buttons">Copy</button><button class="visit-meeting-link meeting-buttons" href="calendar.html">Visit</button><button class="delete-meeting-link meeting-buttons delete-meeting">Delete</button></div></div></li>';
             // document.getElementById('meetings_div').innerHTML += myHTML;  
          }); 

          //location.href=`booking.html#${userID}` send user to booking page

       // makes a new Set array with only unique elements
        const uniqueTitles = [...new Set(dataArray.map(item => item.title))];
        console.log(uniqueTitles);  
        uniqueTitles.forEach(function(element) {

          let myHTML='<li class="link-li-container"><div class="ind-link-text"><a class="ind-link" id="test" href="calendar.html'+userID+'">'+element+'</a></div><div class="link-edit-container><div class="meeting-link-buttons"><button class="edit-meeting-link meeting-buttons" href="calendar.html'+userID+'">Edit</button><button class="copy-meeting-link meeting-buttons" onclick="copyToClipboard()">Copy</button><button class="visit-meeting-link meeting-buttons" href="booking.html'+userID+'">Visit</button><button class="delete-meeting-link meeting-buttons delete-meeting" data-userid="'+userID+'" data-element"'+element+'">Delete</button></div></div></li>';
          document.getElementById('meetings_div').innerHTML += myHTML;  

          // let myHTML=
          //   `<li class="link-li-container">
          //     <div class="ind-link-text"><a class="ind-link" id="test" href=`calendar.html#${userID}`>${element}</a></div>
          //       <div class="link-edit-container">
          //         <div class="meeting-link-buttons">
          //           <button class="edit-meeting-link meeting-buttons" href=`calendar.html#${userID}`>Edit</button>
          //           <button class="copy-meeting-link meeting-buttons">Copy</button>
          //           <button class="visit-meeting-link meeting-buttons" href=`booking.html#${userID}`>Visit</button>
          //           <button class="delete-meeting-link meeting-buttons delete-meeting">Delete</button>
          //         </div>
          //       </div>
          //     </li>`;
          // document.getElementById('meetings_div').innerHTML += myHTML;
        });
        // get meeting ID of element when user clicks cancel meeting
          $( ".delete-meeting" ).click(function(event) {
              let clicked = $(this);
              console.log(clicked);
              let linkUserId = clicked.attr("userid");
              let linkElement = clicked.attr("element");
              console.log(linkUserId, linkElement);
               
          });
      });

//let bookedID = "";
db.collection("booked")
  .where('userID', '==', userID).orderBy('date')
    .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            let data = (doc.id, " => ", doc.data());
            console.log(doc.id);
            let myHTML1='<li class="scheduled-meetings-list"><a id="title" class="ind-meeting">'+data.description+'</a><div class="link-edit-container booked-edit-container"><div class="meeting-link-buttons booked-links"><div class="booked-email booked-extras">Name: <span id="email" class="booked-email-text">'+data.name+'</span></div><div class="booked-email booked-extras">Email: <span id="email" class="booked-email-text">'+data.modalEmail+'</span></div><div class="booked-at booked-extras">Meeeting Date: <span id="booked" class="booked-email-text">'+data.date+' at '+data.time+'</span><div class="booked-at booked-extras">Duration: <span id="booked" class="booked-email-text">'+data.interval+'</span></div><div class="booked-at booked-extras">Location: <span id="booked" class="booked-email-text">'+data.location+'</span></div><button class="cancel-booked" data-id="'+doc.id+'">Cancel Meeting</button></div></div></li>'
            document.getElementById("meetings2_div").innerHTML += myHTML1;

            // let myHTML1=
            //   `<li class="scheduled-meetings-list"><a id="title" class="ind-meeting">${data.description}</a>
            //     <div class="link-edit-container booked-edit-container">
            //       <div class="meeting-link-buttons booked-links">
            //         <div class="booked-email booked-extras">Name: <span id="email" class="booked-email-text">${data.name}</span></div>
            //         <div class="booked-email booked-extras">Email: <span id="email" class="booked-email-text">${data.modalEmail}</span></div>
            //         <div class="booked-at booked-extras">Meeeting Date: <span id="booked" class="booked-email-text">${data.date} at ${data.time}</span>
            //         <div class="booked-at booked-extras">Duration: <span id="booked" class="booked-email-text">${data.interval}</span></div>
            //         <div class="booked-at booked-extras">Location: <span id="booked" class="booked-email-text">${data.location}</span></div>
            //         <button class="cancel-booked">Cancel Meeting</button>
            //       </div>
            //     </div>
            //   </li>`
            //document.getElementById("meetings2_div").innerHTML += myHTML1;
          }); 
          // get meeting ID of element when user clicks cancel meeting
          $( ".cancel-booked" ).click(function(event) {
              let clicked = $(this);
              let bookedID = clicked.attr("data-id");
              console.log(bookedID, "booked ID");  

              db.collection("booked").doc(bookedID).delete().then(function() {
                  console.log("Document successfully deleted!");
              }).catch(function(error) {
                  console.error("Error removing document: ", error);
              });
            });
      });

