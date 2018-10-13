const nav = document.querySelector('.nav-container-main');
const mobileNavIcon = document.querySelector('.mobile-nav-icon');
const mobileNavList = document.querySelector('#mobile-nav');
const closeMenu = document.querySelector('#close-menu');

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


$(".link-edit-container").click(function () {
  console.log("clicked");
  
  console.log(this);
  $(this).toggleClass("buttons-not-hidden");
})

//Create Meeting click
$('.create-link-button').click(function(){
   window.location.href='createMeeting.html';
})
