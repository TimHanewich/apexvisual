var this_url = new URL(window.location.href);
var sess = this_url.searchParams.get("session");
console.log(sess);