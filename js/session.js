//Get the session id from the URL
var this_url = new URL(window.location.href);
var sess = this_url.searchParams.get("sessionid");
if (sess == null)
{
    //Hide the loading session pane
    document.getElementById("loading_cover").classList.add("hidden");
    
    //Remove the hidden class from the error
    document.getElementById("sessionidnullerr").classList.remove("hidden");

    
}

//Sent it to the API
var dest_url = "https://apexvisual2020.azurewebsites.net/api/GetSessionSummary?id=" + sess;
var req = new XMLHttpRequest();
req.open("GET", dest_url);
req.onreadystatechange = function()
{
    if (req.readyState == 4 && req.status == 200)
    {
        var as_json = JSON.parse(req.responseText);
        console.log(as_json.CircuitString);
    }
}
req.send();




////UTILITY FUNCTIONS
