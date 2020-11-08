function HideAllContent()
{
    document.getElementById("content-black-vail").classList.add("hidden");
    document.getElementById("services-pane").classList.add("hidden");
    document.getElementById("api-pane").classList.add("hidden");
}

function ShowContentBlackVail()
{
    document.getElementById("content-black-vail").classList.remove("hidden");
}

function ShowServicesPane()
{
    HideAllContent();
    ShowContentBlackVail();
    document.getElementById("services-pane").classList.remove("hidden");
}

function ShowApiPane()
{
    HideAllContent();
    ShowContentBlackVail();
    document.getElementById("api-pane").classList.remove("hidden");
}

function ShowContactPane()
{
    HideAllContent();
    ShowContentBlackVail();
    document.getElementById("contact-pane").classList.remove("hidden");
}

//SETUP
HideAllContent();