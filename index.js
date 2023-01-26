// Include the chrome driver
require("chromedriver");
var fs = require('fs');
const {
    parse
} = require("csv-parse");

// Include selenium webdriver
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();

// Get the credentials from the JSON file
let {
    email,
    pass,
    url
} = require("./credentials.json");

// Step 1 - Opening the geeksforgeeks sign in page
let tabToOpen =
    tab.get(url);
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

        return tab.get('https://rlp.dev-tuv.de/gemeinde/071325003/data');

        //fs.writeFileSync('source.html', source);1`
    }).then(async () => {
        const source = await tab.getPageSource();
        fs.createReadStream("./migration_data.csv")
            .pipe(parse({
                delimiter: ",",
                from_line: 2
            }))
            .on("data", function (row) {
                console.log(row);
            })
            .on("end", function () {
                console.log("finished");
            })
            .on("error", function (error) {
                console.log(error.message);
            });
        fs.writeFileSync('source.geojson', source);
        return tab.getPageSource();

    }).then((data) => {
        fs.writeFileSync('data.geojson', data);
        console.log("Going to google" + data);
    })
    .catch(function (err) {
        console.log("Error ", err, " occurred!");
    });