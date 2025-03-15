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

  let errorMessage = "";

  if (!validateUsername(userName)) {
    e.preventDefault();
    displayMessage(errorMessage);
    return false;
  } else if (!validateEmail(userEmail)) {
    e.preventDefault();
    displayMessage(errorMessage);
    return false;
  } else if (!validatePassword(userPassword)) {
    e.preventDefault();
    displayMessage(errorMessage);
    return false;
  } else if (!validatePasswordMatch(userPassword, passwordCheck)) {
    e.preventDefault();
    displayMessage("Passwords do not match.");
    return false;
  } else if (!validateTerms(terms)) {
    e.preventDefault();
    displayMessage("You must agree to terms");
    return false;
  }

  return true;

  function validateUsername(name) {
    // ^ pattern enforced from beginning of string
    // [a-zA-Z0-9] any one of these characters
    // {4,} at least 4 character long
    // $ pattern enforced until the end of the string
    if (name === "") {
      errorMessage = "You must have a username.";
      return false;
    } else if (name.length < 4) {
      errorMessage = "Your username must be at least 4 characters long.";
      return false;
    } else if (!/^[a-zA-Z0-9]{4,}$/.test(name)) {
      errorMessage = "Your username must consist of letters and digits only.";
      return false;
    }

    return true;
  }

  function validateEmail(email) {
    // ^ pattern enforced from beginning of string
    // [a-zA-Z0-9._%+-] means a-z A-Z 0-9 . _ % + - characters
    // + at least 1 or more, same as {1,}
    // @ for @
    // [a-zA-Z0-9.-] means a-z A-Z 0-9 . - characters
    // + at least 1 or more, same as {1,}
    // \. for .
    // [a-zA-Z]{2,4} for 2-4 characters like 'com' or 'net' or 'io'
    // $ pattern enforced until the end of the string
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const domainName = email.split("@")[1];

    if (email === "") {
      errorMessage = "You must enter an email address.";
      return false;
    } else if (!regex.test(email)) {
      errorMessage = "Email must be a valid email address.";
      return false;
    } else if (domainName.toLowerCase() === "example.com") {
      errorMessage = "The domain 'example.com' is not a valid.";
      return false;
    }

    return true;
  }

  function validatePassword(password) {
    if (password.length < 12) {
      errorMessage = "Password must be at least 12 characters long.";
      return false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])[a-zA-z0-9.!@#\$%\^&*]{12,}$/.test(password)
    ) {
      errorMessage =
        "Password must contain at least one uppercase and one lowercase letter.";
      return false;
    } else if (!/^(?=.*\d)[a-zA-z0-9.!@#\$%\^&*]{12,}$/.test(password)) {
      errorMessage = "Password must contain one digit.";
      return false;
    } else if (
      !/^(?=.*[.!@#\$%\^&*])[a-zA-z0-9.!@#\$%\^&*]{12,}$/.test(password)
    ) {
      errorMessage =
        "Password must contain at least one special character (.!@#$%^&*).";
      return false;
    } else if (/password/i.test(password)) {
      errorMessage =
        "Password must not contain the word 'password' upper or lowercase.";
      return false;
    } else if (new RegExp(userName, "i").test(password)) {
      errorMessage = "Password must not contain your chosen username";
      return false;
    }

    return true;
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
  container.innerHTML = "";
}
