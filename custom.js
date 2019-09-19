function sched(s) {
    if (s == "half") {
        if (document.getElementById("half").innerHTML == "True") {
            document.getElementById("half").innerHTML = "False";
        } else {
            document.getElementById("half").innerHTML = "True";
        }
    } else {
        document.getElementById("typ").innerHTML = s;
    }
}
function color(s) {
    document.body.style.color = s;
}
function theme(s) {
    document.body.backgroundColor = s;
}
