function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(ck in ca){
    let c = ck
    while(c.charAt(0)==''){
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0)
      return c.substring(name.length, c.length);
  }
  return "";
}

function checkCookie(cname) {
  let cookie = getCookie(cname);
  if (cookie != ""){
   // alert("Welcome again " + username);
  } else {
    // username = prompt("Please enter your name:", "");
    // if (username != "" && username != null)
    //   setCookie("username", username, 365);
  }
}