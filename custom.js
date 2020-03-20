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
function nextYear() {
    var inAYear = new Date();
    inAYear.setFullYear(inAYear.getFullYear() + 1);
    return inAYear.toDateString();
}
function time(hr = 0, mn = 0, sc = 0) {
    var now = new Date();
    now.setHours(hr);
    now.setMinutes(mn);
    now.setSeconds(sc);
    return now;
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
    gID("colorswap").value = s;
    document.body.style.color = s;
    gEDIT("color", s);
    document.cookie = `color=${s}`;
    document.cookie = `expires=${nextYear()}`;
}
function theme(s) {
    if (s == "#112222ff") {
        document.body.style.backgroundColor = "#112222ff";
        gSTYLE("change").color = "#ccddddff";
        gID("change").onclick = function(){theme('#ccddddff');};
        gEDIT("change", "[LIGHT THEME]");
        gEDIT("theme", "dark");
        document.cookie = 'theme=dark;'
        document.cookie = `expires=${nextYear()}`;
        gSTYLE("customizer").backgroundColor = "#223333ff";
        gSTYLE("colorswap").backgroundColor = "#223333ff";
        gSTYLE("colorswap").borderColor = "#223333ff";
    } else {
        document.body.style.backgroundColor = "#ccddddff";
        gSTYLE("change").color = "#112222ff";
        gID("change").onclick = function(){theme('#112222ff');};
        gEDIT("change", "[DARK THEME]");
        gEDIT("theme", "light");
        document.cookie = 'theme=light;'
        document.cookie = `expires=${nextYear()}`;
        gSTYLE("customizer").backgroundColor = "#bbccccff";
        gSTYLE("colorswap").backgroundColor = "#bbccccff";
        gSTYLE("colorswap").borderColor = "#bbccccff";
    }
}

function wheme() {
    var bg = "#ccddddff";
    var onclick = function(){theme("#112222ff");};
    var cookie = "theme=light";
    var text = "[DARK THEME]";
    var color = "#112222ff";
    if (gHTML("theme") != "light") {
        bg = "#112222ff";
        color = "#ccddddff";
        onclick = function(){theme('#ccddddff');};
        text = "[LIGHT THEME]
        cookie = "theme=dark";
    }
    document.body.style.backgroundColor = bg;
    gSTYLE("change").color = color;
    gID("change").onclick = onclick;
    gEDIT("change", text);
    document.cookie = cookie
    document.cookie = `expires=${nextYear()}`;
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
    document.cookie="expires="+nextYear();
    document.cookie="path=/";
}
