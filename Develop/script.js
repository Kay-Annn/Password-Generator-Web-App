// Assignment code here


// Get references to the #generate element in order to apply functions to generate password button
var generateBtn = document.querySelector("#generate");

var submitbtn = document.querySelector("#submit");

//Created global variable for passwordLength to make it accessible to all functions
var passwordLength = ""

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Add event listener to the submit button 
submitbtn.addEventListener("click", validatePasswordCriteria);


//Prevents the form from reloading so that the password will remain on screen
var form = document.getElementById("myForm");

form.addEventListener('submit', preventFormReload);

//Executed on event listener applied to generateBtn
function writePassword() {
  //global variable called passwordLength and its value is the user's input
  passwordLength = prompt("Please input a length for your password between 8-128 characters")
  // function used to validate password length is used to declare the value of checkIfPasswordLength 
  let checkIfPasswordLength = validatePasswordLength()
  //if the value of checkIfPasswordLength is false then the user is not allowed to proceed
  if (checkIfPasswordLength != true) return
  //if the value of checkIfPasswordLength is true then user is allowed to select password criteria
  var modal = document.querySelector("#myModal");
  modal.style.display = "block";
}

//Validate if that number is between the range 8-128
function validatePasswordLength() {
  // by default program is assuming user input is incorrect
  var isValid = false
  if (passwordLength >= 8 && passwordLength <= 128) {
    // if user inputs correct information, variable value is reassigned to true
    isValid = true
  }
  else {
    alert("Please enter and number between 8 and 128")
  }
  // 
  return isValid
}

//Validate password criteria
function validatePasswordCriteria() {

  //Get reference to uppercase checked box value
  let upperCaseChecked = document.getElementById("uppercase").checked
  //Get reference to lowercase checked box value
  let lowerCaseChecked = document.getElementById("lowercase").checked
  //Get reference to numeric checked box value
  let numericChecked = document.getElementById("numeric").checked
  //Get reference to specialCharacter checked box value
  let specialCharactersChecked = document.getElementById("specialCharacter").checked
  //Statement used to verify if at least one of the criteria are checked. 
  if (upperCaseChecked || lowerCaseChecked || numericChecked || specialCharactersChecked) {
    //if at least one of the criteria is checked we call the generate password function, we place each criteria in an argument since it is in another scope
    generatePassword(upperCaseChecked, lowerCaseChecked, numericChecked, specialCharactersChecked)
  }
  else {
    alert("Please check one of the following boxes")
  }
}

//Function used to generate the password - argument passed in function to access variable in another scope
function generatePassword(upperCaseChecked, lowerCaseChecked, numericChecked, specialCharactersChecked) {
  //variables with allowed character sets
  var charsetSpecialCharacters = "&%$*^@+_("
  var charsetUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var charsetLowerCase = "abcdefghijklmnopqrstuvwxyz"
  var charsetNumeric = "0123456789"
  //Array to include selected character sets 
  var finalCharset = []
  //If statements used to include user's selected character set and .push allows for them to be pushed in the array 
  if (upperCaseChecked) finalCharset.push(charsetUpperCase)
  if (lowerCaseChecked) finalCharset.push(charsetLowerCase)
  if (numericChecked) finalCharset.push(charsetNumeric)
  if (specialCharactersChecked) finalCharset.push(charsetSpecialCharacters)
  console.log(finalCharset)

  var fullCharset = ""
  for (let i = 0; i < finalCharset.length; i++) {
    fullCharset += finalCharset[i];
  }
  console.log(fullCharset)
  var secretPassword = generatePasswordSecret(fullCharset)
  console.log("Your password length is", passwordLength)
  //Targeting password text area to add secret password to text area
  document.getElementById("password").textContent = secretPassword
  //create reference to modal in order to remove from view by displaying none
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function preventFormReload(event) { event.preventDefault(); }

function generatePasswordSecret(charSet) {
  return '-'.repeat(passwordLength).replace(/./g, b => charSet[~~(Math.random() * charSet.length)])
}

