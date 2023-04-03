
const PastDate = 'Thu, 01 Jan 1970 00:00:00 UTC';

//var isLoggedIn = false;

const getCookiesAsList = () => {
  return document.cookie.split(';');
}

const getThisDate = () => {
  return new Date().toUTCString();
  
}

// @Returns the cookie with name (cName); 
// @Returns null if (cName) not found;
function getCookie(cName){
  const cookieList = getCookiesAsList();
  for (ci in cookieList)
      if(cookieList[ci].indexOf(cName)==0)
          return cookieList[ci];
  return null;
}

// @Returns value of cookie with name (cName); 
// @Returns null if (cName) not found;
function getCookieValue(cName){
  let c = getCookie(cName);
  return c!=null? c.split('=')[1]:null;
}

// Sets value of cookie (cName) to (cValue) with expiration date (expireDate);
function setCookie(cName, cValue, expireDate) {
  if(expireDate==null)
    expireDate = weeksToDate(1);
  if(findCookie(cName))
    document.cookie = cName + "=" + cValue + ";" + expireDate;
}

// Sets the value of cookie (cName) to (cValue)
function setCookieValue(cName, cValue) {
  if(cookieExists(cName))
    setCookie(cName,cValue,null);
}

// Sets the expiration date of the cookie (cName) to (expireDate)
function setCookieExpiration(cName, expireDate) {
  if(cookieExists(cName))
    setCookie(cName, getCookieValue(), expireDate);
}

// @Returns true if value of cookie (cName) is equal to (forValue), false if not;
// @Returns null if cookie (cName) does not exist;
function checkCookie(cName, forValue) {
  if(cookieExists(cName))
    return c == forValue;
  return null
}

// @Returns true if cookie with name (cName) exists
function cookieExists(cName) {
  return getCookie(cName)!=null;
}

// Adds a new cookie with name (cName) and with value (cValue), which expires on (expireDate);
// Note: function {daysToDate} can be used to convert any number of days to a date; daysToDate = current date + # of days;
function addCookie(cName, cValue, expireDate) {
  document.cookie = cName + '=' + cValue + 'expires=' + expireDate;
}

// Removes a cookie by setting it's expiration date to the earliest computer date (PastDate)
function removeCookie(cName) {
  if(cookieExists(cName))
    setCookie(cName, '', PastDate);
}

/*------------------------*\
|--Other Helper Functions--|
\*------------------------*/

// Converts a number of weeks to a date;
// @Returns this date + (weeks); can be used for expire date;
function weeksToDate(weeks) {
  const d = new Date();
  d.setTime(d.getTime() + (weeks*7*24*60*60*1000));
  return d.toUTCString();
}

// Converts a number of days to a date;
// @Returns this date + (days); can be used for expire date;
function daysToDate(days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  return d.toUTCString();
}

// Converts a number of hours to a date;
// @Returns this date + (hours); can be used for expire date;
function hoursToDate(hours) {
  const d = new Date();
  d.setTime(d.getTime() + (hours*60*60*1000));
  return d.toUTCString();
}

