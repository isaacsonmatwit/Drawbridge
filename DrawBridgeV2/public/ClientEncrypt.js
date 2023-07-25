function encryptClient() {
    //document.getElementById("welcomeText").innerHTML = "poop";
    console.log("started");
    var CryptoJS = require("crypto-js");

    var plainText = "Test";
    var secretKey = "Super Secret";
    var cipherText = CryptoJS.AES.encrypt(plainText, secretKey);

    document.getElementById("welcomeText").innerHTML = cipherText.toString;
}