function sched(s) {
    document.getElementById("sched").innerHTML = document.getElementById(s).innerHTML;
    document.cookie = "sched="+s;
}
function color(s) {
    document.body.style.color = s;
    document.cookie = "color="+s;
}
function theme(s,v) {
    document.body.backgroundColor = s;
    document.cookie = "color="+v;
}
