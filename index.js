// Include the chrome driver
require("chromedriver");
  
// Include selenium webdriver
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();
  
// Get the credentials from the JSON file
let { email, pass,url } = require("./credentials.json");
  
// Step 1 - Opening the geeksforgeeks sign in page
let tabToOpen =
    tab.get("https://rlp.dev-tuv.de/login/");
tabToOpen
    .then(function () {
  
        // Timeout to wait if connection is slow
        let findTimeOutP =
            tab.manage().setTimeouts({
                implicit: 10000, // 10 seconds
            });
        return findTimeOutP;
    })
    .then(function () {
  
        // Step 2 - Finding the username input
        let promiseUsernameBox =
            tab.findElement(swd.By.id("inputEmail"));
        return promiseUsernameBox;
    })
    .then(function (usernameBox) {
  
        // Step 3 - Entering the username
        let promiseFillUsername =
            usernameBox.sendKeys(email);
        return promiseFillUsername;
    })
    .then(function () {
        console.log(
            "Username entered successfully in" +
            "'login demonstration' for geodv"
        );
  
        // Step 4 - Finding the password input
        let promisePasswordBox =
            tab.findElement(swd.By.id("inputPassword"));
        return promisePasswordBox;
    })
    .then(function (passwordBox) {
  
        // Step 5 - Entering the password
        let promiseFillPassword =
            passwordBox.sendKeys(pass);
        return promiseFillPassword;
    })
    .then(function () {
        console.log(
            "Password entered successfully in" +
            " 'login demonstration' for geodv"
        );
  
        // Step 6 - Finding the Sign In button
        let promiseSignInBtn = tab.findElement(
            swd.By.xpath("/html/body/div/div/div/div/div/div/div[2]/div/form/input[1]")
        );
        return promiseSignInBtn;
    })
    .then(function (signInBtn) {
  
        // Step 7 - Clicking the Sign In button
        let promiseClickSignIn = signInBtn.click();
        return promiseClickSignIn;
    })
    .then(function () {
        console.log("Successfully signed in geodv!");
    })
    .catch(function (err) {
        console.log("Error ", err, " occurred!");
    });