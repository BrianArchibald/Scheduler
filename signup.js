(function() {
  //initialize firebase
    var config = {
      apiKey: "AIzaSyDJFbbPR1n6if3yX1giV8KvW_Pyq88aBKk",
      authDomain: "calendar-c07dd.firebaseapp.com",
      databaseURL: "https://calendar-c07dd.firebaseio.com",
      projectId: "calendar-c07dd",
      storageBucket: "calendar-c07dd.appspot.com",
      messagingSenderId: "1041934999578"
    };
    firebase.initializeApp(config);

const txtEmail = document.getElementById('signup-email');
const txtPassword = document.getElementById('signup-password');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const signUpButton = document.getElementById('sign-up-button');

// function completeSignUp () {
//  // let email = document.getElementById('signup-email').value;
//  // let password = document.getElementById('signup-password').value;
//  consol.log("ran", email, password);

//  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//    // Handle Errors here.
//    var errorCode = error.code;
//    var errorMessage = error.message;
//    // ...
//  });
// }
//const submitButton = document.getElementById('signup-form');

//Add login event
signUpButton.addEventListener('click', e => {  
   console.log("clicked");

  //Get email and password
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
}); 
//Add a realtime listener for auth state changes
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
  console.log(firebaseUser);
  //send user when logged in to main.html
  window.location = 'main.html';
  // can add css to show hide/show logged in etc...
  } else {
    console.log('not logged in');
  }
});






// sign out user
// btnLogout.addEventListener('click', e => {
//  firebase.auth().signOut();
// });


}());





// function sendEmailVerification() {
//     firebase.auth().currentUser.sendEmailVerification().then(function() {
//        alert('Email Verification Sent!');
//     });
// }

// function sendPasswordReset() {
//     let email = document.getElementById('signup-email').value;
//     firebase.auth().sendPasswordResetEmail(email).then(function() {
//        alert('Password Reset Email Sent!');
//     }).catch(function(error) {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       if (errorCode == 'auth/invalid-email') {
//          alert(errorMessage);
//        } else if (errorCode == 'auth/user-not-found') {
//           alert(errorMessage);
//        }
//         console.log(error);
//      });
// }

// /**
//      * initApp handles setting up UI event listeners and registering Firebase auth listeners:
//      *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
//      *    out, and that is where we update the UI.
//      */
//     function initApp() {
//       // Listening for auth state changes.
//       // [START authstatelistener]
//       firebase.auth().onAuthStateChanged(function(user) {
//         // [START_EXCLUDE silent]
//         document.getElementById('quickstart-verify-email').disabled = true;
//         // [END_EXCLUDE]
//         if (user) {
//           // User is signed in.
//           var displayName = user.displayName;
//           var email = user.email;
//           var emailVerified = user.emailVerified;
//           var photoURL = user.photoURL;
//           var isAnonymous = user.isAnonymous;
//           var uid = user.uid;
//           var providerData = user.providerData;
//           // [START_EXCLUDE]
//           document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
//           document.getElementById('quickstart-sign-in').textContent = 'Sign out';
//           document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
//           if (!emailVerified) {
//             document.getElementById('quickstart-verify-email').disabled = false;
//           }
//           // [END_EXCLUDE]
//         } else {
//           // User is signed out.
//           // [START_EXCLUDE]
//           document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
//           document.getElementById('quickstart-sign-in').textContent = 'Sign in';
//           document.getElementById('quickstart-account-details').textContent = 'null';
//           // [END_EXCLUDE]
//         }
//         // [START_EXCLUDE silent]
//         document.getElementById('quickstart-sign-in').disabled = false;
//         // [END_EXCLUDE]
//       });
//       // [END authstatelistener]
//       document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
//       document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
//       document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
//       document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
//     }
//     window.onload = function() {
//       initApp();
//     };

