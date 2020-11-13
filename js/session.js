//     VARIABLES FOR LATER
var fastest_s1 = 99999;
var fastest_s2 = 99999;
var fastest_s3 = 99999;
var fastest_lap = 99999;

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
    document.getElementById("sessioninfodisplay").classList.add("hidden");
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

            //Added the session ID to the top header. Get the id from the parameters in the URl
            var header = document.getElementById("sessionheader");
            header.innerText = "Session " + sess;
            
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
            fntwreq.open("get", "assets/friendlynametrackwallpapers.json");
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
            dhsreq.open("get", "assets/driverheadshots.json");
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
            carreq.open("get", "assets/carimages.json");
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

            //Populate the session date time
            var dt = new Date(as_json.SessionSummaryCreatedAt);
            var datetimestr = dt.getMonth().toString() + "/" + dt.getDay().toString() + "/" + dt.getFullYear().toString();
            document.getElementById("sessiondatetime").innerText = datetimestr;

            //Attempt to bring in the session analysis (make a call)
            var sareq = new XMLHttpRequest();
            sareq.open("get", "https://apexvisual2020.azurewebsites.net/api/GetSessionAnalysis?id=" + sess + "&includecorners=false")
            sareq.onreadystatechange = function()
            {
                if (sareq.readyState == 4)
                {
                    if (sareq.status == 200) //OK (it worked as expected)
                    {
                        //Hide the loading message
                        document.getElementById("session_analysis_loading").classList.add("hidden");
                        
                        //Parse the object
                        var saobj = JSON.parse(sareq.responseText);

                        //Run it through a for each function that will find the fastest times for sectors and lap
                        saobj.Laps.forEach(FindFastestTimes);

                        //Post each lap to the table
                        saobj.Laps.forEach(PostLapToSessionAnalysisTable);

                        //Unhide the analysis section
                        document.getElementById("session_analysis").classList.remove("hidden");
                    }
                    else
                    {
                        //It failed, so show the not available message and HIDe the loading message
                        document.getElementById("session_analysis_loading").classList.add("hidden");
                        document.getElementById("session_analysis_not_av").classList.remove("hidden");
                    }
                }
            }
            sareq.send();



            //FINALLY.... Show it!
            document.getElementById("sessioninfodisplay").classList.remove("hidden");
        }
    }
    req.send();





}

function PostLapToSessionAnalysisTable(lap)
{
    if (lap.LapTime > 0)
    {
        //Create the new row
        var tr = document.createElement("tr");

        //Create the lap number
        var td1 = document.createElement("td");
        td1.innerText = lap.LapNumber;
        tr.appendChild(td1);

        //Create the s1 time
        var td2 = document.createElement("td");
        td2.innerText = (Math.round(lap.Sector1Time * 1000) / 1000).toFixed(3);
        tr.appendChild(td2);
        if (lap.Sector1Time == fastest_s1)
        {
            td2.classList.add("fastesttime");
        }

        //Create the s2 time
        var td3 = document.createElement("td");
        td3.innerText = (Math.round(lap.Sector2Time * 1000) / 1000).toFixed(3);
        tr.appendChild(td3);
        if (lap.Sector2Time == fastest_s2)
        {
            td3.classList.add("fastesttime");
        }

        //Create the s3 time
        var td4 = document.createElement("td");
        td4.innerText = (Math.round(lap.Sector3Time * 1000) / 1000).toFixed(3);
        tr.appendChild(td4);
        if (lap.Sector3Time == fastest_s3)
        {
            td4.classList.add("fastesttime");
        }

        //Create the lap time
        var td5 = document.createElement("td");
        td5.innerText = FriendlyLapTime(lap.LapTime);
        tr.appendChild(td5);
        if (lap.LapTime == fastest_lap)
        {
            td5.classList.add("fastesttime");
        }

        //Add the row to the table
        document.getElementById("timing_body").appendChild(tr);
    } 
}

function FindFastestTimes(lap)
{
    var s1 = lap.Sector1Time;
    var s2 = lap.Sector2Time;
    var s3 = lap.Sector3Time;
    var lap = lap.LapTime;

    if (s1 > 0 && s1 < fastest_s1)
    {
        fastest_s1 = s1;
    }

    if (s2 > 0 && s2 < fastest_s2)
    {
        fastest_s2 = s2;
    }

    if (s3 > 0 && s3 < fastest_s3)
    {
        fastest_s3 = s3;
    }

    if (lap > 0 && lap < fastest_lap)
    {
        fastest_lap = lap;
    }
}

