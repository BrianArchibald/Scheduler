const txtEmail = document.getElementById("signup-email");
const txtPassword = document.getElementById("signup-password");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const signUpButton = document.getElementById("sign-up-button");
const signUpForm = document.getElementById("signup-form");
const demoButtom = document.getElementById("demo-button");

// Add login event
signUpButton.addEventListener("click", e => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

// Demo button
demoButtom.addEventListener("click", e => {
  console.log("demo clicked");
  // Get email and password
  const email = "demo@email.com";
  const pass = "password";
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => alert(e.message));
});

//Hit Enter for sign up instead of clicking button
signUpForm.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    signUpButton.click();
  }
});

//Add a realtime listener for auth state changes
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    localStorage.setItem("userID", user.uid);
    window.location = "main.html";
  } else {
    console.log("not logged in");
  }
});
