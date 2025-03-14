const newEl = (element) => document.createElement(element);
const errorDisplay = document.getElementById("errorDisplay");
const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");

function validateForm(target) {
  const userName = target.username;
  const userEmail = target.email;
  const userPassword = target.password;
  const passwordCheck = target.passwordCheck;
  const terms = target.terms;

  if (!validateUsername(userName)) {
    displayMessage("Username is invalid.");
    return false;
  } else if (!validateEmail(userEmail)) {
    displayMessage("Email is invalid.");
    return false;
  } else if (!validatePassword(userPassword)) {
    displayMessage("Password is invalid.");
    return false;
  } else if (!validatePasswordMatch(userPassword, passwordCheck)) {
    displayMessage("Passwords do not match.");
    return false;
  } else if (!validateTerms(terms)) {
    displayMessage("You must agree to terms.");
    return false;
  }

  return true;

  function validateUsername(name) {}

  function validateEmail(email) {}

  function validatePassword(password) {}

  function validatePasswordMatch(p1, p2) {}

  function validateTerms(terms) {}

  function displayMessage(text) {
    clearContainer(errorDisplay);
    const message = newEl("p");
    message.textContent = text;
    message.style.color = "red";
    errorDisplay.appendChild(message);
  }
}

function clearContainer(container) {
  while (container.firstChild) {
    container.remove(container.firstChild);
  }
}
