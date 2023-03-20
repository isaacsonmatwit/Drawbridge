
// used this link for sidebar https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("header").style.marginLeft = "250px";
    document.getElementById("mySidebar").style.visibility = "visible";   
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("header").style.marginLeft = "0";
    document.getElementById("mySidebar").style.visibility = "hidden";   
  } 