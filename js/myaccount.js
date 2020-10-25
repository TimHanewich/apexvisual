//If there is the "useraccount" cookie, load it. If not, redirect to the login
var cook = document.cookie;
var loc1 = cook.indexOf("useraccount");
if (loc1 == -1)
{
    window.location.href = "index.html";
}