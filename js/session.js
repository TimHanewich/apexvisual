//Get the session id from the URL
var this_url = new URL(window.location.href);
var sess = this_url.searchParams.get("sessionid");
if (sess == null)
{
    //Hide the loading session pane
    document.getElementById("loading_cover").classList.add("hidden");
    
    //Remove the hidden class from the error
    document.getElementById("sessionidnullerr").classList.remove("hidden");

    //Hide the display
    document.getElementById("display").classList.add("hidden");
}

//Sent it to the API
var dest_url = "https://apexvisual2020.azurewebsites.net/api/GetSessionSummary?id=" + sess;
var req = new XMLHttpRequest();
req.open("GET", dest_url);
req.onreadystatechange = function()
{
    if (req.readyState == 4 && req.status == 200)
    {
        //Parse the json
        var as_json = JSON.parse(req.responseText);

        //Make the loading screen hidden
        document.getElementById("loading_cover").classList.add("hidden");

        //Added the session ID to the top header
        var header = document.getElementById("sessionheader");
        header.innerText = "Session " + as_json.SessionId;
        
        //Populate the track
        document.getElementById("track").innerText = as_json.CircuitString;

        //Populate the session type
        document.getElementById("sessiontype").innerText = as_json.SessionModeString;

        //Populate the track for the map
        document.getElementById("trackpiclabel").innerText = as_json.CircuitString;

        //Populate the selected driver string
        document.getElementById("drivername").innerText = as_json.SelectedDriverString;

        //Populate the Team name
        document.getElementById("teamname").innerText = as_json.SelectedTeamString;

        //FINALLY.... Show it!
        document.getElementById("display").classList.remove("hidden");
    }
}
req.send();




////UTILITY FUNCTIONS
