function gID(st) {
    return document.getElementById(st);
}
function gHTML(st) {
    return gID(st).innerHTML;
}
function gSTYLE(st) {
    return gID(st).style;
}
function sched(s) {
    if (s == "half") {
        if (gID("half").innerHTML == "True") {
            gID("half").innerHTML = "False";
            gID("toggle").innerHTML = "[HALF PERIODS]";
        } else {
            gID("half").innerHTML = "True";
            gID("toggle").innerHTML = "[FULL PERIODS]";
        }
    } else {
        gID("typ").innerHTML = s;
        gID("sched").innerHTML = gHTML(s);
        if (s.startsWith("custom")) {
            gID("customizer").className = "cc";
            gID("customizer").value = document.getElementById(s).innerHTML;
            gID("customizer").onchange = function(){changer(s);};
            gSTYLE("customizer").height = "30vw";
            gSTYLE("customizer").width = "90vw";
        } else {
            gID("customizer").className = "inv cc";
            gID("customizer").onchange = function(){};
            gID("customizer").value="";
            gSTYLE("customizer").height = "0px";
            gSTYLE("customizer").width = "0px";
        }
    }
}
function color(s) {
    document.body.style.color = s;
    gID("color").innerHTML = s;
    document.cookie="color="+s;
    gSTYLE("customizer").color = s;
}
function theme(s) {
    document.body.backgroundColor = s;
    if (s == "#112222ff") {
        document.body.style.backgroundColor = "#112222ff";
        gSTYLE("change").color = "#ccddddff";
        gID("change").onclick = function(){theme('#ccddddff');};
        gID("change").innerHTML = "[LIGHT THEME]";
        gID("theme").innerHTML = "dark";
        document.cookie = "theme=dark";
        gSTYLE("customizer").backgroundColor = "#223333ff";
    } else {
        document.body.style.backgroundColor = "#ccddddff";
        gSTYLE("change").color = "#112222ff";
        gID("change").onclick = function(){theme('#112222ff');};
        gID("change").innerHTML = "[DARK THEME]";
        gID("theme").innerHTML = "light";
        document.cookie = "theme=light";
        gSTYLE("customizer").backgroundColor = "#bbccccff";
    }
}

function wheme() {
    if (gHTML("theme") == "light") {
        document.body.style.backgroundColor = "#ccddddff";
        gSTYLE("change").color = "#112222ff";
        gID("change").onclick = function(){theme('#112222ff');};
        gID("change").innerHTML = "[DARK THEME]";
    } else {
        document.body.style.backgroundColor = "#112222ff";
        gSTYLE("change").color = "#ccddddff";
        gID("change").onclick = function(){theme('#ccddddff');};
        gID("change").innerHTML = "[LIGHT THEME]";
    }
}

function textareaTheme() {
    gSTYLE("customizer").color = gHTML("color");
    if (gHTML("theme") == "light") {
        gSTYLE("customizer").backgroundColor = "#bbccccff";
    } else {
        gSTYLE("customizer").backgroundColor = "#223333ff";
    }
    if (gHTML("typ").startsWith("custom")) {
        gID("customizer").className = "cc";
        gID("customizer").value = document.getElementById(s).innerHTML;
        gID("customizer").onchange = function(){changer(s);};
        gSTYLE("customizer").height = "30vw";
        gSTYLE("customizer").width = "90vw";
    } else {
        gID("customizer").className = "inv cc";
        gID("customizer").onchange = function(){};
        gID("customizer").value="";
        gSTYLE("customizer").height = "0px";
        gSTYLE("customizer").width = "0px";
    }
}
function changer(str, itm) {
    gID(str).innerHTML = gID("customizer").value;
    gID("sched").innerHTML = gID("customizer").value;
}
