function sched(s) {
    if (s == "half") {
        if (document.getElementById("half").innerHTML.contains("True")) {
            document.getElementById("half").innerHTML = "False";
        } else {
            document.getElementById("half").innerHTML = "True";
        }
    } else {
        document.getElementById("sched").innerHTML = document.getElementById(s).innerHTML;
    }
}
function color(s) {
    document.body.style.color = s;
}
function theme(s,v) {
    document.body.backgroundColor = s;
}
