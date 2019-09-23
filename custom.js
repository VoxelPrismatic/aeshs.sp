function gID(st) {
    return document.getElementById(st);
}
function gHTML(st) {
    return gID(st).innerHTML;
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
            gID("customizer").style.height = "30vw";
            gID("customizer").style.width = "90vw";
        } else {
            gID("customizer").className = "inv cc";
            gID("customizer").onchange = function(){};
            gID("customizer").value="";
            gID("customizer").style.height = "0px";
            gID("customizer").style.width = "0px";
        }
    }
}
function color(s) {
    document.body.style.color = s;
    gID("color").innerHTML = s;
    document.cookie="color="+s;
    gID("customizer").style.color = s;
}
function theme(s) {
    document.body.backgroundColor = s;
    if (s == "#112222ff") {
        document.body.style.backgroundColor = "#112222ff";
        gID("change").style.color = "#ccddddff";
        gID("change").onclick = function(){theme('#ccddddff');};
        gID("change").innerHTML = "[LIGHT THEME]";
        gID("theme").innerHTML = "dark";
        document.cookie = "theme=dark";
        gID("customizer").style.backgroundColor = "#223333ff";
    } else {
        document.body.style.backgroundColor = "#ccddddff";
        gID("change").style.color = "#112222ff";
        gID("change").onclick = function(){theme('#112222ff');};
        gID("change").innerHTML = "[DARK THEME]";
        gID("theme").innerHTML = "light";
        document.cookie = "theme=light";
        gID("customizer").style.backgroundColor = "#bbccccff";
    }
}

function wheme() {
    if (gHTML("theme") == "light") {
        document.body.style.backgroundColor = "#ccddddff";
        gID("change").style.color = "#112222ff";
        gID("change").onclick = function(){theme('#112222ff');};
        gID("change").innerHTML = "[DARK THEME]";
    } else {
        document.body.style.backgroundColor = "#112222ff";
        gID("change").style.color = "#ccddddff";
        gID("change").onclick = function(){theme('#ccddddff');};
        gID("change").innerHTML = "[LIGHT THEME]";
    }
}

function textareaTheme() {
    gID("customizer").style.color = gHTML("color");
    if (gHTML("theme") == "light") {
        gID("customizer").style.backgroundColor = "#bbccccff";
    } else {
        gID("customizer").style.backgroundColor = "#223333ff";
    }
    if (gHTML("typ").startsWith("custom")) {
        gID("customizer").className = "cc";
        gID("customizer").value = document.getElementById(s).innerHTML;
        gID("customizer").onchange = function(){changer(s);};
        gID("customizer").style.height = "30vw";
        gID("customizer").style.width = "90vw";
    } else {
        gID("customizer").className = "inv cc";
        gID("customizer").onchange = function(){};
        gID("customizer").value="";
        gID("customizer").style.height = "0px";
        gID("customizer").style.width = "0px";
    }
}
function changer(str, itm) {
    gID(str).innerHTML = gID("customizer").value;
}
