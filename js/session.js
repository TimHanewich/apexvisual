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
else // The session Id IS provided (expected normal behavior)
{
    

    //Send it to the API
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

            //Get the local friendlynametrackwallpapers file to get the URL that should be used for the background image.
            var fntwreq = new XMLHttpRequest();
            fntwreq.open("get", "/assets/friendlynametrackwallpapers.json");
            fntwreq.onreadystatechange = function()
            {
                if (fntwreq.readyState == 4)
                {
                    var trackwallpaperjson = JSON.parse(fntwreq.responseText);
                    document.getElementById("trackbackgroundimg").setAttribute("src", trackwallpaperjson[as_json.CircuitString]);
                }
            }
            fntwreq.send();

            //Get the local driverheadshots json file and plug in the right headshot for that driver
            var dhsreq = new XMLHttpRequest();
            dhsreq.open("get", "/assets/driverheadshots.json");
            dhsreq.onreadystatechange = function()
            {
                if (dhsreq.readyState == 4)
                {
                    var headshotjson = JSON.parse(dhsreq.responseText);
                    var headshoturl = headshotjson[as_json.SelectedDriverString];
                    document.getElementById("headshot").setAttribute("src", headshoturl);
                }
            }
            dhsreq.send();

            //Get the image of the team (car) that was used
            var carreq = new XMLHttpRequest();
            carreq.open("get", "/assets/carimages.json");
            carreq.onreadystatechange = function()
            {
                if (carreq.readyState == 4)
                {
                    var carjson = JSON.parse(carreq.responseText);
                    document.getElementById("car").setAttribute("src", carjson[as_json.SelectedTeamString]);
                }
            }
            carreq.send();

            //Get the track map
            var mapreq = new XMLHttpRequest();
            mapreq.open("get", "assets/trackmaps.json");
            mapreq.onreadystatechange = function()
            {
                if (mapreq.readyState == 4)
                {
                    var trackmapjson = JSON.parse(mapreq.responseText);
                    document.getElementById("trackmap").setAttribute("src", trackmapjson[as_json.CircuitString]);
                }
            }
            mapreq.send();



            //FINALLY.... Show it!
            document.getElementById("display").classList.remove("hidden");
        }
    }
    req.send();





}


