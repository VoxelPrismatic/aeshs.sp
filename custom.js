var type = document.getElementById("typ");
function sched(s) {
    if (s == "half") {
        if (document.getElementById("typ").innerHTML.contains("half")) {
            type.innerHTML = type.innerHTML.replace("_half","");
            document.getElementById("sched").innerHTML = document.getElementById(type.innerHTML).innerHTML;
            document.cookie = "sched="+type.innerHTML;
        } else if (document.getElementById("typ").innerHTML != "late") {
            type.innerHTML = type.innerHTML.replace("_half","");
            document.getElementById("sched").innerHTML = document.getElementById(type.innerHTML).innerHTML;
            document.cookie = "sched="+type.innerHTML;
        }
        
    } else {
        if (s == "late") {
            type.innerHTML = type.innerHTML.split("_")[0]
        }
        document.getElementById("sched").innerHTML = document.getElementById(s).innerHTML;
        document.cookie = "sched="+s;
    }
}
function color(s) {
    document.body.style.color = s;
    document.cookie = "color="+s;
}
function theme(s,v) {
    document.body.backgroundColor = s;
    document.cookie = "color="+v;
}
