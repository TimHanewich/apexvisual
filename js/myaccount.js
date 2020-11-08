///////// TESTING MODE (halts API consumption for testing) /////////
var TESTING_MODE = false;
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
var Session_Count_ToSend = account.OwnedSessionIds.length;
var Session_Count_Received = 0;
function AddSessionToTable(session_id)
{
    var url_link = "https://apexvisual2020.azurewebsites.net/api/GetSessionSummary?id=" + session_id;
    var req = new XMLHttpRequest();
    req.open("GET", url_link);
    req.onreadystatechange = function()
    {
        if (req.readyState == 4 && req.status == 200)
        {
            //Retrieve the session id out of the response. We can't do this through a simple JSON deserialization because the json deserialization process will round the long number.
            var loc1 = req.responseText.indexOf("SessionId");
            loc1 = req.responseText.indexOf(":", loc1 + 1);
            var loc2 = req.responseText.indexOf(",", loc1 + 1);
            var sesid = req.responseText.substring(loc1 + 1, loc2).trim();
            
            //Still parse it for some other properties
            var as_json = JSON.parse(req.responseText);

            //Get the row string that we will pass to the AddRowToTable mfunction
            var dt = new Date(as_json.SessionSummaryCreatedAt);
            var datetimestr = dt.getMonth().toString() + "/" + dt.getDay().toString() + "/" + dt.getFullYear().toString();

            AddRowToTable(sesid, datetimestr, as_json.CircuitString, as_json.SessionModeString);
        }

        //If it is finished with this request, then mark it as received. And check if this is the last request to come in. If it is, hide the 'loading' msg.
        if (req.readyState == 4)
        {
            Session_Count_Received = Session_Count_Received + 1;
            if (Session_Count_Received == Session_Count_ToSend)
            {
                //hide the loading msg on the my sessions display
                document.getElementById("mysessiondisplayloadingmsg").setAttribute("class", "hidden");
            }
        }
    }
    if (TESTING_MODE == false)
    {
        req.send();
    }
}
function AddRowToTable(id, date, track, type)
{
    var tbl = document.getElementById("mysessions");
    var nr = tbl.insertRow();

    //ID
    var nc1 = nr.insertCell();
    var sessionlinkhref = document.createElement("a");
    sessionlinkhref.setAttribute("href", "session.html?sessionid=" + id);
    var nt1 = document.createTextNode(id);
    sessionlinkhref.appendChild(nt1);
    nc1.appendChild(sessionlinkhref);

    //Date
    var nc_d = nr.insertCell();
    var nt_d = document.createTextNode(date);
    nc_d.appendChild(nt_d);

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

