// Cookie API
// @Author Vlad. J. Caso
const PastDate = 'Thu, 01 Jan 1970 00:00:00 UTC';



// Adds a new cookie with name (cName) and value (cValue), and expiration date (expireDate);
// Note: function {daysToDate} can be used to convert any number of days to a date; daysToDate = current date + # of days;
function addCookie(cName='', cValue='', expireDate='') {
  if(!cookieExists(cName))
    return setCookie(cName,cValue,expireDate);
  return true;
}

// Removes a cookie by setting it's expiration date to the earliest computer date (PastDate)
function removeCookie(cName='') {
  if(cookieExists(cName))
    return setCookie(cName, '', PastDate);
  return false;
}

// @Returns the cookie with name (cName); 
// @Returns null if (cName) not found;
// Note: returns the cookie with the name: 'cName=cValue;'
function getCookie(cName=''){
  const cookieList = getCookiesAsList();
  for (ci in cookieList)
      if(cookieList[ci].indexOf(cName)==0)
          return cookieList[ci];
  return null;
}

const getCookiesAsList = () => {
  return document.cookie.split(';');
}

// @Returns value of cookie with name (cName); 
// @Returns null if (cName) not found;
function getCookieValue(cName=''){
  let c = getCookie(cName);
  return c!=null? c.split('=')[1]:null;
}

// Sets value of cookie (cName) to (cValue) with expiration date (expireDate);
function setCookie(cName='', cValue='', expireDate='') {
  if(expireDate==null)
    expireDate = weeksToDate(1);
  document.cookie = cName + '=' + cValue + ';' + 'expires=' + expireDate + ';';
  return true;
}

// Sets the value of cookie (cName) to (cValue)
// Note: Use this instead of {setCookie} to unsure that only the value is set
function setCookieValue(cName='', cValue='') {
  if(cookieExists(cName))
    return setCookie(cName,cValue,null);
  return false;
}

// Sets the expiration date of the cookie (cName) to (expireDate)
function setCookieExpiration(cName='', expireDate='') {
  if(cookieExists(cName))
    return setCookie(cName, getCookieValue(), expireDate);
  return false;
}

// @Returns true if value of cookie (cName) is equal to (forValue), false if not;
// @Returns null if cookie (cName) does not exist;
function checkCookie(cName='', forValue='') {
  if(cookieExists(cName))
    return c == forValue;
  return null
}

// @Returns true if cookie with name (cName) exists
function cookieExists(cName='') {
  return getCookie(cName)!=null;
}

/*------------------------*\
|--Other Helper Functions--|
\*------------------------*/

// @Returns current date as string;
const getCurrentDate = () => {
  return new Date().toUTCString();
}

// Converts a number of weeks to a date;
// @Returns this date + (weeks); can be used for expire date;
function weeksToDate(weeks=0) {
  const d = new Date();
  d.setTime(d.getTime() + (weeks*7*24*60*60*1000));
  return d.toUTCString();
}

// Converts a number of days to a date;
// @Returns this date + (days); can be used for expire date;
function daysToDate(days=0) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  return d.toUTCString();
}

// Converts a number of hours to a date;
// @Returns this date + (hours); can be used for expire date;
function hoursToDate(hours=0) {
  const d = new Date();
  d.setTime(d.getTime() + (hours*60*60*1000));
  return d.toUTCString();
}

export {
  addCookie,
  removeCookie,
  getCookie,
  getCookiesAsList,
  getCookieValue,
  setCookieValue,
  setCookieExpiration,
  checkCookie,
  cookieExists,
  getCurrentDate,
  weeksToDate,
  daysToDate,
  hoursToDate
};