function isUserAndPasswordValid(document) {
  if (inputUser.value.length > 1 && inputPass.value.length > 1) {
    btnToken.disabled = false;
  } else {
    btnToken.disabled = true;
  }
}

function createChild(executablePath, parameters) {
  var child = require('child_process').execFile;
  //var executablePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
  //var parameters = ["--incognito"];
  child(executablePath, parameters, function (err, data) {
    console.log(err)
    console.log(data.toString());
  });

}
var btnSearch = document.getElementById("submitsearch");
var btnToken = document.getElementById("submittoken");
var btnIsAuth = document.getElementById("btnIsAuth");

var inputUser = document.getElementById("user");
var inputPass = document.getElementById("pass");
var inputToken = document.getElementById("token");

var http = require('http');
new HttpRequest().getIndex();
new HttpRequest().getNews();
new HttpRequest().getGames();
new HttpRequest().getRSS();
// new HttpRequest().getTools();
new HttpRequest().getImprint();
//events
btnSearch.addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("searchresults").innerHTML = "Initializing...";
  var query = document.getElementById("query");
  if (query.value != "") {
    // alert(query.value);
    document.getElementById("searchresults").innerHTML = "Scanning...";
    new HttpRequest().getSearch(query.value);
    doDisplayIMDBResults();
    new HttpRequest().getWiki(query.value);
  } else {
    query.style.borderColor = "red";
  }
  return false;
});
btnToken.addEventListener("click", function (event) {
  event.preventDefault();
  var user = document.getElementById("user");
  var password = document.getElementById("pass");
  new HttpRequest().getToken(user.value, password.value);
  return true;
});
//is auth
inputToken.addEventListener("input", function (event) {
  event.preventDefault();
  var tokenValue = document.getElementById("token").value;
  // alert(tokenValue);
  if (tokenValue != "anonymous") {
    new HttpRequest().getIsAuth(token);
  }
  return true;
});
btnIsAuth.addEventListener("click", function (event) {
  event.preventDefault();
  var tokenValue = document.getElementById("token").value;
  if (tokenValue != "anonymous") {
    new HttpRequest().getIsAuth(tokenValue);
  }
  return true;
});
//validate
inputUser.addEventListener("input", function (event) {
  isUserAndPasswordValid(document);
});
inputPass.addEventListener("input", function (event) {
  isUserAndPasswordValid(document);
});
inputUser.addEventListener("change", function (event) {
  isUserAndPasswordValid(document);
});
inputPass.addEventListener("change", function (event) {
  isUserAndPasswordValid(document);
});