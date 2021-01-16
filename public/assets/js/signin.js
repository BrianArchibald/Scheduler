const txtEmail = document.getElementById("signup-email");
const txtPassword = document.getElementById("signup-password");
const signInButton = document.getElementById("sign-in-button");
const signInForm = document.getElementById("signin-form");

// Add login event
signInButton.addEventListener("click", e => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => alert(e.message));
});

// Hit Enter for sign up instead of clicking button
signInForm.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    signInButton.click();
  }
});

// Add a realtime listener for auth state changes
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    localStorage.setItem("userID", user.uid);
    window.location = "main.html";
  } else {
    console.log("not logged in");
  }
});
