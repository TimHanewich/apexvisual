function enter_login()
{
    var rb = document.getElementById("loginbutton");
    rb.classList.remove("rb-off");
    rb.classList.add("rb-on");
}

function exit_login()
{
    var rb = document.getElementById("loginbutton");
    rb.classList.remove("rb-on");
    rb.classList.add("rb-off");
}

function login()
{
    //Hide the login button, show the logging in status
    StartLogin();

    //Get the contents from the page
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var loginreq = new XMLHttpRequest();
    loginreq.onreadystatechange = function()
    {
        if (loginreq.readyState == 4 && loginreq.status == 200)
        {
            console.log("Login successful");
            var obj = JSON.parse(loginreq.responseText);
            delete obj.Password; //Delete the password from the response
            document.cookie = "useraccount=" + JSON.stringify(obj) + ";path=/";
            window.location.href = "myaccount.html";
        }
        else if (loginreq.readyState == 4 && loginreq.status != 200)
        {
            console.log("There was a problem with that request.");
            console.log(loginreq.responseText);
        }
    }
    
    loginreq.open("GET", "https://apexvisual2020.azurewebsites.net/api/Login?username=" + username + "&password=" + password);
    loginreq.send();
}

function StartLogin()
{
    //Hide the login button
    document.getElementById("loginbutton").classList.remove("shown");
    document.getElementById("loginbutton").classList.add("hidden");
    
    //Show the logging in indicator
    document.getElementById("logginginindicator").classList.remove("hidden");
    document.getElementById("logginginindicator").classList.add("shown");
}

function StopLogin()
{
    //Show the login button
    document.getElementById("loginbutton").classList.remove("hidden");
    document.getElementById("loginbutton").classList.add("shown");

    //Hide the logging in text
    document.getElementById("logginginindicator").classList.remove("shown");
    document.getElementById("logginginindicator").classList.add("hidden");
}