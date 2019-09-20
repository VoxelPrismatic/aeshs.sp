function sched(s) {
    if (s == "half") {
        if (document.getElementById("half").innerHTML == "True") {
            document.getElementById("half").innerHTML = "False";
            document.getElementById("toggle").innerHTML = "[HALF PERIODS]"
        } else {
            document.getElementById("half").innerHTML = "True";
            document.getElementById("toggle").innerHTML = "[FULL PERIODS]"
        }
        if (s.startsWith("custom")) {
            document.getElementById("customizer").className = "cc
            document.getElementById("customizer").value = document.getElementById(s).innerHTML;
            document.getElementById("customizer").onchange = function(){changer(s, this);};
            document.getElementById("verbose").innerHTML = "changes"
        } else {
            document.getElementById("customizer").className = "inv cc"
            document.getElementById("customizer").onchange = null;
            document.getElementById("customizer").value="";
        }
    } else {
        document.getElementById("typ").innerHTML = s;
        document.getElementById("sched").innerHTML = document.getElementById(s).innerHTML
    }
}
function color(s) {
    document.body.style.color = s;
    document.getElementById("color").innerHTML = s;
}
function theme(s) {
    document.body.backgroundColor = s;
    if (s == "#112222ff") {
        document.body.style.backgroundColor = "#112222ff";
        document.getElementById("change").style.color = "#ccddddff";
        document.getElementById("change").onclick = function(){theme('#ccddddff');};
        document.getElementById("change").innerHTML = "[LIGHT THEME]";
        document.getElementById("theme").innerHTML = "dark";
    } else {
        document.body.style.backgroundColor = "#ccddddff";
        document.getElementById("change").style.color = "#112222ff";
        document.getElementById("change").onclick = function(){theme('#112222ff');};
        document.getElementById("change").innerHTML = "[DARK THEME]";
        document.getElementById("theme").innerHTML = "light";
    }
}

function wheme() {
    if (document.getElementById("theme").innerHTML == "light") {
        document.body.style.backgroundColor = "#ccddddff";
        document.getElementById("change").style.color = "#112222ff";
        document.getElementById("change").onclick = function(){theme('#112222ff');};
        document.getElementById("change").innerHTML = "[DARK THEME]";
    } else {
        document.body.style.backgroundColor = "#112222ff";
        document.getElementById("change").style.color = "#ccddddff";
        document.getElementById("change").onclick = function(){theme('#ccddddff');};
        document.getElementById("change").innerHTML = "[LIGHT THEME]";
    }
}

function changer(str, itm) {
    document.getElementById(str).innerHTML = itm.value;
}
