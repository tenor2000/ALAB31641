const newEl = (element) => document.createElement(element);
const errorDisplay = document.getElementById("errorDisplay");
const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");

registrationForm.addEventListener("submit", validateForm);
loginForm.addEventListener("submit", validateForm);

function validateForm(e) {
  const userName = e.target.username.value;
  const userEmail = e.target.email.value;
  const userPassword = e.target.password.value;
  const passwordCheck = e.target.passwordCheck.value;
  const terms = e.target.terms.checked;

  // console.log(e.target);

  if (!validateUsername(userName)) {
    e.preventDefault();
    displayMessage("Username is invalid.");
    return false;
  } else if (!validateEmail(userEmail)) {
    e.preventDefault();
    displayMessage("Email is invalid.");
    return false;
  } else if (!validatePassword(userPassword)) {
    e.preventDefault();
    displayMessage("Password is invalid.");
    return false;
  } else if (!validatePasswordMatch(userPassword, passwordCheck)) {
    e.preventDefault();
    displayMessage("Passwords do not match.");
    return false;
  } else if (!validateTerms(terms)) {
    e.preventDefault();
    displayMessage("You must agree to terms.");
    return false;
  }

  return true;

  function validateUsername(name) {
    // ^ pattern enforced from beginning of string
    // [a-zA-Z0-9] any one of these characters are valid
    // {4,} at least 4 character long
    // $ pattern enforced until the end of the string
    const regex = /^[a-zA-Z0-9]{4,}$/;
    if (name === "") return false;

    return regex.test(name);
  }

  function validateEmail(email) {
    // ^ pattern enforced from beginning of string
    // [a-zA-Z0-9._%+-] at least 1 a-z but may be more
    // + at least 1 or more, same as {1,}
    // $ pattern enforced until the end of the string
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email === "") return false;

    return regex.test(email);
  }

  function validatePassword(password) {
    // ^ pattern enforced from beginning of string
    // (?=.*[a-z]) at least 1 a-z but may be more
    // (?=.*[A-Z]) at least 1 A-Z but may be more
    // (?=.*\d) at least 1 digit but may be more
    // [a-zA-Z0-9] any one of these chars
    // {12,} at least 12 character long but may be longer
    // $ pattern is enforced until the end of the string
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-z0-9]{12,}$/;

    return regex.test(password);
  }

  function validatePasswordMatch(p1, p2) {
    return p1 === p2;
  }

  function validateTerms(terms) {
    return terms;
  }

  function displayMessage(text) {
    clearContainer(errorDisplay);
    errorDisplay.style.display = "block";
    const message = newEl("p");
    message.textContent = text;
    message.style.color = "red";
    errorDisplay.appendChild(message);
  }
}

function clearContainer(container) {
  console.log("clear");
  container.innerHTML = "";
}
