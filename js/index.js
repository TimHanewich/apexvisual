function BoldTab(tab_name)
{
    document.getElementById(tab_name).classList.add("bolded");
}

function UnBoldTab(tab_name)
{
    document.getElementById(tab_name).classList.remove("bolded");
}

function Nav(loc)
{
    window.location.href = loc;
}