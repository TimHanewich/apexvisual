function HideAllContent()
{
    document.getElementById("content-black-vail").classList.add("hidden");
    document.getElementById("services-pane").classList.add("hidden");
}

function ShowContentBlackVail()
{
    document.getElementById("content-black-vail").classList.remove("hidden");
}

function ShowServicesPane()
{
    ShowContentBlackVail();
    document.getElementById("services-pane").classList.remove("hidden");
}

//SETUP
HideAllContent();