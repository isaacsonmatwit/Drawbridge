function check() {
  let pwd = document.getElementById('password');
  let pwdConfirm = document.getElementById('passwordConfirm');
  let checker = document.getElementById('checker');
  if (pwd.value == '') {
  } else if (pwd.value == pwdConfirm.value) {
    checker.style.color = 'green';
    checker.innerHTML = 'matching';
    return true;
  } else {
    checker.style.color = 'red';
    checker.innerHTML = 'not matching';

  }
  return false;
}

function togglePW() {
  let passwordField = document.getElementById("password");
  let confirmPasswordField = document.getElementById("passwordConfirm");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    confirmPasswordField.type = "text";
  }
  else {
    passwordField.type = "password";
    confirmPasswordField.type = "password";
  }
}

function checkPWComplexity() {
  let passwordField = document.getElementById('password').value;

  if (passwordField.length >= 8) {
    document.getElementById('pwLength').style.color = 'green';
  } else {
    document.getElementById('pwLength').style.color = '#AF0C0C';
  }

  if (passwordField.match(/[a-z]/)) {
    document.getElementById('pwLowerCase').style.color = 'green';
  } else {
    document.getElementById('pwLowerCase').style.color = '#AF0C0C';
  }

  if (passwordField.match(/[A-Z]/)) {
    document.getElementById('pwUpperCase').style.color = 'green';
  } else {
    document.getElementById('pwUpperCase').style.color = '#AF0C0C';
  }

  if (passwordField.match(/\d/)) {
    document.getElementById('pwNumbers').style.color = 'green';
  } else {
    document.getElementById('pwNumbers').style.color = '#AF0C0C';
  }

  if (passwordField.match(/[^a-zA-Z\d]/)) {
    document.getElementById('pwSpecialChar').style.color = 'green';
  } else {
    document.getElementById('pwSpecialChar').style.color = '#AF0C0C';
  }
}