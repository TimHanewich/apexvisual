function FriendlyLapTime(lap_time)
{
    if (lap_time < 60)
    {
        return lap_time.toString();
    }
    else
    {
        var div = lap_time / 60;
        var mins = Math.floor(div);
        var remainderpercentage = div - mins;
        var secs = remainderpercentage * 60;
        secs = (Math.round(secs * 1000) / 1000).toFixed(3);
        var str = mins.toString() + ":" + secs.toString();
        return str;
    }
}