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
    StartLogin();
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