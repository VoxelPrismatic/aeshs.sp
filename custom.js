function gID(st) {
    return document.getElementById(st);
}
function gHTML(st) {
    return gID(st).innerHTML;
}
function gSTYLE(st) {
    return gID(st).style;
}
function gEDIT(st, val) {
    gID(st).innerHTML = val;
}
function sched(s) {
    if (s == "half") {
        if (gHTML("half") == "True") {
            gEDIT("half", "False");
            gEDIT("toggle", "[HALF PERIODS]");
        } else {
            gEDIT("half", "True");
            gEDIT("toggle", "[FULL PERIODS]");
        }
    } else {
        gEDIT("typ", s);
        gEDIT("sched", gHTML(s));
        if (s.startsWith("custom")) {
            gID("customizer").className = "cc";
            gID("customizer").value = gHTML(s);
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
    get();
}
function color(s) {
    s = s.strip();
    gEDIT("colorswap", s);
    var re = [
        /^#[A-Fa-f0-9]{3}$/gm,
        /^#[A-Fa-f0-9]{4}$/gm,
        /^#[A-Fa-f0-9]{6}$/gm,
        /^#[A-Fa-f0-9]{8}$/gm
    ];
    if(s == "")
        return;
    for(var r of re) {
        if(s.replace(r, "") == "") {
            document.body.style.color = s;
            gEDIT("color", s);
            document.cookie=`color=${s}; expires=${gHTML("date")}`;
            gSTYLE("customizer").color = s;
        }
    }
}
function theme(s) {
    document.body.backgroundColor = s;
    if (s == "#112222ff") {
        document.body.style.backgroundColor = "#112222ff";
        gSTYLE("change").color = "#ccddddff";
        gID("change").onclick = function(){theme('#ccddddff');};
        gEDIT("change", "[LIGHT THEME]");
        gEDIT("theme", "dark");
        document.cookie = `theme=dark; expires=${gHTML("date")}`;
        gSTYLE("customizer").backgroundColor = "#223333ff";
    } else {
        document.body.style.backgroundColor = "#ccddddff";
        gSTYLE("change").color = "#112222ff";
        gID("change").onclick = function(){theme('#112222ff');};
        gEDIT("change", "[DARK THEME]");
        gEDIT("theme", "light");
        document.cookie = `theme=light; expires=${gHTML("date")}`;
        gSTYLE("customizer").backgroundColor = "#bbccccff";
    }
}

function wheme() {
    if (gHTML("theme") == "light") {
        document.body.style.backgroundColor = "#ccddddff";
        gSTYLE("change").color = "#112222ff";
        gID("change").onclick = function(){theme('#112222ff');};
        gEDIT("change", "[DARK THEME]");
    } else {
        document.body.style.backgroundColor = "#112222ff";
        gSTYLE("change").color = "#ccddddff";
        gID("change").onclick = function(){theme('#ccddddff');};
        gEDIT("change","[LIGHT THEME]");
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
        gID("customizer").value = gHTML(s);
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
    gEDIT(str, gID("customizer").value);
    gEDIT("sched", gID("customizer").value);
    document.cookie="expires="+gHTML("date");
    document.cookie="path=/";
}
