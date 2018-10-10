// let email = document.getElementById('signup-email').value;
// let password = document.getElementById('signup-password').value;


// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
  
//   if (errorCode === 'auth/wrong-password') {
//             alert('Wrong password.');
//           } else {
//             alert(errorMessage);
//           }
//           console.log(error);
// });


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
// const firstName = document.getElementById('first-name');
// const lastName = document.getElementById('last-name');
const signInButton = document.getElementById('sign-in-button');

// function completeSignUp () {
// 	// let email = document.getElementById('signup-email').value;
// 	// let password = document.getElementById('signup-password').value;
// 	consol.log("ran", email, password);

// 	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
// 	  // Handle Errors here.
// 	  var errorCode = error.code;
// 	  var errorMessage = error.message;
// 	  // ...
// 	});
// }
//const submitButton = document.getElementById('signup-form');

//Add login event
signInButton.addEventListener('click', e => {  
   console.log("clicked");

  //Get email and password
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
}); 




}());
