(function() {
// initialize firebase
var config = {
      apiKey: "AIzaSyDJFbbPR1n6if3yX1giV8KvW_Pyq88aBKk",
      authDomain: "calendar-c07dd.firebaseapp.com",
      databaseURL: "https://calendar-c07dd.firebaseio.com",
      projectId: "calendar-c07dd",
      storageBucket: "calendar-c07dd.appspot.com",
      messagingSenderId: "1041934999578"
    };
      firebase.initializeApp(config);
    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();

    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
      firestore.settings(settings);


//const userID;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //signed in
    // userID = user.uid;
    //console.log(userID, "userID");
    // let userID = user.uid
    // localStorage.setItem('userID','userID');
    console.log("signed in");
    console.log(user.uid);
  } else {
    // No user is signed in.
    console.log("signed out", user);
  }
  //console.log(userID, "userIDinside block");
});
// let userID = localStorage.getItem('userID');
// console.log(userID, "userID after getting local");


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
$('.delete-meeting-link').click(function(){
  document.getElementById("ind-link-id").innerHTML = "";
})





    db.collection("events")
      //.where('holder', '==', userID)
        .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  var data = (doc.id, " => ", doc.data());
                  date=data.start_date;
                  date_seconds=date.seconds;

                  // time the meeting is at on modal
                  var actual_date=new Date(date_seconds).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true });

                  //may not need this if above has all the info
                  var d = new Date(date_seconds); // or whatever date you have
              var tzName = d.toLocaleString('en', {timeZoneName:'short'}).split(' ').pop();

              // data.name should be the name of the person who booked on modal    data.email will be modal email person and there timezone here
                 // var myHTML1='<li class="scheduled-meetings-list"><a id="title" class="ind-meeting">'+data.name+'</a><div class="link-edit-container booked-edit-container"><div class="meeting-link-buttons booked-links"><div class="booked-email booked-extras">Email: <span id="email" class="booked-email-text">'+data.email+'</span></div><div class="booked-timezone booked-extras">Timezone: <span id="timezone" class="booked-email-text">'+tzName+'</span></div><div class="booked-at booked-extras">Booked At: <span id="booked" class="booked-email-text">'+actual_date+'</span></div><button class="cancel-booked">Cancel Meeting</button></div></div></li>'
              // document.getElementById("meetings2_div").innerHTML += myHTML1;



              

                var myHTML='<li class="link-li-container"><div class="ind-link-text"><a class="ind-link" id="test" href="#">'+data.title+'</a></div><div class="link-edit-container"><div class="meeting-link-buttons"><button class="edit-meeting-link meeting-buttons" href="#">Edit</button><button class="copy-meeting-link meeting-buttons">Copy</button><button class="visit-meeting-link meeting-buttons" href="calendar.html">Visit</button><button class="delete-meeting-link meeting-buttons delete-meeting">Delete</button></div></div></li>';
                document.getElementById('meetings_div').innerHTML += myHTML;  
              });  
          });
            //console.log(userID);




    db.collection("booked")

      //.where('userID', '==', userID)
      // I need to add holder to booked collection from modal or userID
      //.where('holder', '==', userID)
        .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  var data = (doc.id, " => ", doc.data());

                  // data.name should be the name of the person who booked on modal    data.email will be modal email person and there timezone here    need to add most of modal confirms to db for referencing here
                  var myHTML1='<li class="scheduled-meetings-list"><a id="title" class="ind-meeting">'+data.description+'</a><div class="link-edit-container booked-edit-container"><div class="meeting-link-buttons booked-links"><div class="booked-email booked-extras">Email: <span id="email" class="booked-email-text">'+data.modalEmail+'</span></div><div class="booked-at booked-extras">Meeeting Date: <span id="booked" class="booked-email-text">'+data.date+' at '+data.time+'</span><div class="booked-at booked-extras">Location: <span id="booked" class="booked-email-text">'+data.location+'</span></div><button class="cancel-booked">Cancel Meeting</button></div></div></li>'
               document.getElementById("meetings2_div").innerHTML += myHTML1;

                  console.log(data);
                  //console.log(userID);
            });  
          });

          var tempUser = firebase.auth().currentUser;
console.log(tempUser);
}());
