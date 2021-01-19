firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("signed in");
  } else {
    console.log("signed out", user);
  }
});

const nav = document.querySelector(".nav-container-main");
const mobileNavIcon = document.querySelector(".mobile-nav-icon");
const mobileNavList = document.querySelector("#mobile-nav");
const closeMenu = document.querySelector("#close-menu");

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

mobileNavIcon.addEventListener("click", changeMobileNav);
closeMenu.addEventListener("click", changeMobileNav);

$(".create-link-button").click(function() {
  window.location.href = "createMeeting.html";
});

$("#main-sign-out").click(function() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      window.location.href = "index.html";
    })
    .catch(function(error) {
    });
});

let dataArray = [];
let userID = "#" + localStorage.userID;
let holder = localStorage.userID;
db.collection("events")
  .where("holder", "==", holder)
  .orderBy("start_date")
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      let data = (doc.id, " => ", doc.data());
      dataArray.push(data, doc.id);
    });

    const uniqueTitles = [...new Set(dataArray.map(item => item.title))];
    uniqueTitles.forEach(function(element) {
      if (element != undefined) {
        let myHTML = `<li class="link-li-container">
              <div class="ind-link-text">
                <a class="ind-link" id="test" data-docid="" href="booking.html${userID}">${element}</a>
              </div>
              <div class="link-edit-container>
                <div class="meeting-link-buttons">
                  <button class="edit-meeting-link meeting-buttons">Edit</button>
                  <button class="copy-meeting-link meeting-buttons" data-clipboard-text="https://calendar-c07dd.firebaseapp.com/booking.html${userID}">Copy</button>
                  <button class="visit-meeting-link meeting-buttons">Visit</button>
                  <button class="delete-meeting-link meeting-buttons delete-meeting" data-userid="${userID}" data-element="${element}">Delete</button>
                </div>
              </div>
            </li>`;
        document.getElementById("meetings-div").innerHTML += myHTML;
      }
    });

    let clipboard = new ClipboardJS(".copy-meeting-link");
    clipboard.on("success", function(e) {
      alert("Link Copied");
      e.clearSelection();
    });
    clipboard.on("error", function(e) {});

    $(".visit-meeting-link").click(function() {
      window.location.href = `booking.html${userID}`;
    });

    $(".edit-meeting-link").click(function() {
      window.location.href = `calendar.html${userID}`;
    });

    $(".delete-meeting").click(function(event) {
      let clicked = $(this);
      $(this)
        .closest(".link-li-container")
        .hide();
      let linkUserId = clicked.attr("data-userid");
      let linkElement = clicked.attr("data-element");
      let eventTitleDelete = db
        .collection("events")
        .where("title", "==", linkElement)
        .where("holder", "==", holder);
      eventTitleDelete.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
    });
  });

db.collection("booked")
  .where("userID", "==", userID)
  .orderBy("date")
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      let data = (doc.id, " => ", doc.data());

      let myHTML1 = `<li class="scheduled-meetings-list">
                <a id="title" class="ind-meeting">${data.title}</a>
              <div class="link-edit-container booked-edit-container">
                <div class="meeting-link-buttons booked-links">
                  <div class="booked-email booked-title booked-extras">Name: <span id="email" class="booked-email-text" data-title="${
                    data.name
                  }">${data.name}</span></div>
                  <div class="booked-email booked-extras">Email: <span id="email" class="booked-email-text booked-modal-email" data-modalemail="${
                    data.modalEmail
                  }">${data.modalEmail}</span></div>
                  <div class="booked-at booked-extras">Meeeting Date: <span id="booked" class="booked-email-text booked-date" data-date="${
                    data.date
                  }" data-time="${data.time}">${data.date} at ${
        data.time
      }</span>
                  <div class="booked-at booked-interval booked-extras">Duration: <span id="booked" class="booked-email-text">${
                    data.interval
                  }</span></div><div class="booked-at booked-extras">Location: <span id="booked" class="booked-email-text">${
        data.location
      }</span></div>
                  <button class="cancel-booked" data-id="${
                    doc.id
                  }">Cancel Meeting</button>
                </div>
              </div>
            </li>`;
      document.getElementById("meetings2-div").innerHTML += myHTML1;
    });

    // Get meeting ID of element when user clicks cancel meeting
    $(".cancel-booked").click(function(event) {
      let clicked = $(this);
      // Hides the meeting when clicked cancel without DB refresh
      $(this)
        .closest(".scheduled-meetings-list")
        .hide();

      let titleDiv = $(this).closest(".booked-title");
      let bookedTitle = titleDiv.attr("data-title");

      let modalEmailDiv = $(this).closest(".booked-modal-email");
      let modalEmail = modalEmailDiv.attr("data-modalemail");

      let dateDiv = $(this).closest(".booked-date");
      let bookedDate = dateDiv.attr("data-date");

      let bookedAtDiv = $(this).closest(".booked-date");
      let bookedTime = bookedAtDiv.attr("data-time");

      let ownerEmail = dataArray[0].email;

      function sendCancelEmail() {
        let template_params = {
          ownerEmail: ownerEmail,
          bookedTitle: bookedTitle,
          modalEmail: modalEmail,
          bookedDate: bookedDate,
          bookedTime: bookedTime
        };
        let service_id = "default_service";
        let template_id = "template_7H4gRgo2";
        emailjs.send(service_id, template_id, template_params);
      }

      let bookedID = clicked.attr("data-id");
      db.collection("booked")
        .doc(bookedID)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    });
  });
