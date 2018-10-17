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

//Add login event
signUpButton.addEventListener('click', e => {  

  // Get email and password
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

}());