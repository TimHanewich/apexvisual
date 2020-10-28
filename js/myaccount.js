///////// TESTING MODE (halts API consumption for testing) /////////
var TESTING_MODE = true;
////////////////////////////////////////////////////////////


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
if (TESTING_MODE == false)
{
    img.setAttribute("src", imgsrclink);
}


//Display the sessions
function AddSessionToTable(session_id)
{
    var url_link = "https://apexvisual2020.azurewebsites.net/api/GetSessionSummary?id=" + session_id;
    var req = new XMLHttpRequest();
    req.open("GET", url_link);
    req.onreadystatechange = function()
    {
        if (req.readyState == 4 && req.status == 200)
        {
            var as_json = JSON.parse(req.responseText);
            AddRowToTable(as_json.SessionId, as_json.CircuitString, as_json.SessionModeString);
        }
    }
    if (TESTING_MODE == false)
    {
        req.send();
    }
}
function AddRowToTable(id, track, type)
{
    var tbl = document.getElementById("mysessions");
    var nr = tbl.insertRow();

    //ID
    var nc1 = nr.insertCell();
    var nt1 = document.createTextNode(id);
    nc1.appendChild(nt1);

    //track
    var nc2 = nr.insertCell();
    var nt2 = document.createTextNode(track);
    nc2.appendChild(nt2);

    //type
    var nc3 = nr.insertCell();
    var nt3 = document.createTextNode(type);
    nc3.appendChild(nt3);
}
account.OwnedSessionIds.forEach(AddSessionToTable);

