const txtEmail = document.getElementById('signup-email');
const txtPassword = document.getElementById('signup-password');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const signUpButton = document.getElementById('sign-up-button');
const signUpForm = document.getElementById('signup-form');

// Add login event
signUpButton.addEventListener('click', e => {  
  // Get email and password
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
  //e.preventDefault();
});

//Hit Enter for sign up instead of clicking button
signUpForm.addEventListener('keyup', function(event) {
  event.preventDefault();
  if(event.keyCode === 13) {
    signUpButton.click();
  }
});

//Add a realtime listener for auth state changes
firebase.auth().onAuthStateChanged(user => {
  if(user) {
    localStorage.setItem('userID', user.uid);
    window.location = 'main.html';
  } else {
    console.log('not logged in');
  }
});