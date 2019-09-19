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
    if (s == "#112222ff") {
        document.getElementById("change").style.color = "#ccddddff";
        document.getElementById("change").onclick = "theme('#ccddddff')";
        document.getElementById("change").innerHTML = "[LIGHT THEME]";
        document.getElementById("theme").innerHTML = "dark"
    } else {
        document.getElementById("change").style.color = "#112222ff"
        document.getElementById("change").onclick = "theme('#112222ff')"
        document.getElementById("change").innerHTML = "[DARK THEME]"
        document.getElementById("theme").innerHTML = "light"
    }
}
