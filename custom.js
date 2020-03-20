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
            gID("customizer").value = find_cookie(s).replace(/ /gm, "\n").replace(/\|/gm, " | ");
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
    var colors = [
        Math.floor(Number.parseInt(s.slice(1, 3), 16) / 10),
        Math.floor(Number.parseInt(s.slice(3, 5), 16) / 10),
        Math.floor(Number.parseInt(s.slice(5, 7), 16) / 10)
    ];
    var c = [0, 0, 0]
    if(colors[0] == 0)
        c[0] = Math.floor((colors[1] + colors[2]) / 4);
    else
        c[0] = colors[0];
    if(colors[1] == 0)
        c[1] = Math.floor((colors[0] + colors[2]) / 4);
    else
        c[1] = colors[1];
    if(colors[2] == 0)
        c[2] = Math.floor((colors[1] + colors[0]) / 4);
    else
        c[2] = colors[2];
    var bg_dark = `rgb(${c[0]}, ${c[1]}, ${c[2]}`;
    var bg_light = `rgb(${200 + c[0]}, ${200 + c[1]}, ${200 + c[2]}`;
    var bg = bg_dark;
    var bg_inv = bg_light;
    var bg_des = `rgb(${c[0] + 10}, ${c[1] + 10}, ${c[2] + 10}`;
    if(gHTML("theme") == "light") {
        bg = bg_light;
        bg_inv = bg_dark;
        bg_des = `rgb(${190 + c[0]}, ${190 + c[1]}, ${190 + c[2]}`;
    }
    gEDIT("color", s);
    document.body.style.backgroundColor = bg;
    gSTYLE("change").color = bg_inv;
    gSTYLE("customizer").backgroundColor = bg_des;
    gSTYLE("colorswap").backgroundColor = bg_des;
    gSTYLE("colorswap").borderColor = bg_des;
    document.cookie = `color=${s}`;
    document.cookie = `expires=${nextYear()}`;
}
function theme(s) {
    if (s == "#112222ff") {
        gID("change").onclick = function(){theme('#ccddddff');};
        gEDIT("change", "[LIGHT THEME]");
        gEDIT("theme", "dark");
        document.cookie = 'theme=dark;'
        document.cookie = `expires=${nextYear()}`;
    } else {
        gID("change").onclick = function(){theme('#112222ff');};
        gEDIT("change", "[DARK THEME]");
        gEDIT("theme", "light");
        document.cookie = 'theme=light;'
        document.cookie = `expires=${nextYear()}`;
    }
    color(gID("colorswap").value);
}

function wheme() {
    var onclick = function(){theme("#112222ff");};
    var cookie = "theme=light";
    var text = "[DARK THEME]";
    if (gHTML("theme") != "light") {
        onclick = function(){theme('#ccddddff');};
        text = "[LIGHT THEME]";
        cookie = "theme=dark";
    }
    gID("change").onclick = onclick;
    gEDIT("change", text);
    document.cookie = cookie
    document.cookie = `expires=${nextYear()}`;
    color(gID("colorswap").value);
}

function textareaTheme() {
    gSTYLE("customizer").color = gHTML("color");
    color(gID("colorswap").value);
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


function customSchedule(txt, typ = findHtml("sched")) {
    var custom = "[";
    for(var period of txt.split("\n")) {
        var p = "";
        if(period.includes("|")) {
            p += "[\"" + period.split("|")[0].trim() + "\",";
            var time = period.split("|")[1].split(":");
            p += `time(${time[0].trim()},`;
            p += `${time[1].trim()}`;
            if(time.length == 3)
                p += `,${time[2].trim()}`;
            p += ")],";
        }
        custom += p;
    }
    custom = custom.slice(0, -1) + "]";
    setHtml(typ, custom);
    document.cookie = `${typ}=${txt.replace(/ /gm,"").replace(/\n/gm," ")}`;
}
