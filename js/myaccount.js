//If there is the "useraccount" cookie, load it. If not, redirect to the login
var cook = document.cookie;
var loc1 = cook.indexOf("useraccount");
if (loc1 == -1)
{
    window.location.href = "index.html";
}
loc1 = cook.indexOf("=", loc1 + 1);
var useraccountstr = "";
var loc2 = cook.indexOf(";", loc1 + 1);
if (loc2 == -1)
{
    useraccountstr = cook.substring(loc1 + 1, cook.length);
}
else
{
    useraccountstr = cook.substring(loc1 + 1, loc2);
}
var account = JSON.parse(useraccountstr);

//Populate the page with the properties
document.getElementById("username").innerHTML = account.Username;
document.getElementById("email").innerHTML = account.Email;

//Set the profile picture
var imgsrclink = "https://apexvisual2020.azurewebsites.net/api/GetUserPhoto?id=" + account.PhotoBlobId;
var img = document.getElementById("profilepic");
img.setAttribute("src", imgsrclink);
