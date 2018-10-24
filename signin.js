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
const signInButton = document.getElementById('sign-in-button');
const signInForm = document.getElementById('signin-form');

//Add login event
signInButton.addEventListener('click', e => {  
  //Get email and password
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
}); 

//Hit Enter for sign up instead of clicking button
signInForm.addEventListener('keyup', function(event) {
  event.preventDefault();
  if(event.keyCode === 13) {
    signInButton.click();
  }
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

}());
