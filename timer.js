function time(hr = 0, mn = 0, sc = 0) {
    var now = new Date();
    now.setHours(hr);
    now.setMinutes(mn);
    now.setSeconds(sc);
    return now;
}

try {
    sched = eval(findHtml("sched"));
} catch(err) {
    console.log(err);
    sched = eval(findHtml("norm"));
}

function stats(st) {
    setHtml("status", st);
}

function diff(t1) {
    return new Date(Date.now() - t1);
}

function zf(itm) {
    return String(itm).padStart(2, "0");
}

cat = {
    "norm": "NORMAL SCHEDULE",
    "norm_half": "NORMAL SCHEDULE - HALF PERIODS",
    "act": "ACTIVITY PERIOD SCHEDULE",
    "act_half": "ACTIVITY PERIOD SCHEDULE - HALF PERIODS",  
    "pm": "PM ASSEMBLY SCHEDULE",
    "pm_half": "PM ASSEMBLY SCHEDULE - HALF PERIODS",
    "late": "LATE ARRIVAL SCHEDULE",
    "final1": "FINALS DAY 1 SCHEDULE",
    "final2": "FINALS DAY 2 SCHEDULE",
    "final3": "FINALS DAY 3 SCHEDULE",
    "custom0": "CUSTOM SCHEDULE 0",
    "custom1": "CUSTOM SCHEDULE 1",
    "custom2": "CUSTOM SCHEDULE 2",
    "custom3": "CUSTOM SCHEDULE 3",
    "custom4": "CUSTOM SCHEDULE 4",
    "custom5": "CUSTOM SCHEDULE 5",
    "custom6": "CUSTOM SCHEDULE 6",
    "custom7": "CUSTOM SCHEDULE 7",
    "custom8": "CUSTOM SCHEDULE 8",
    "custom9": "CUSTOM SCHEDULE 9",
    "early": "EARLY DISMISSAL SCHEDULE",
    "early_half": "EARLY DISMISSAL SCHEDULE - HALF PERIODS",
    "summer": "SUMMER SCHEDULE - KINDA USELESS"
}

function get() {
    var currentsched = eval(findHtml("sched"));
    var cur = findHtml("typ").split("_")[0];
    var typ = cur;
    if(findHtml("half") == "True" && find(cur + "_half") != null)
        typ += "_half";
    setHtml("typ", typ);
    setHtml("sched", findHtml(typ));
    setHtml("prt", cat[typ]);
    document.cookie = `sched=${typ}; path=/`;
    currentsched = eval(findHtml("sched"));

    var ls = "";
    var now = Date.now()
    for(var x of currentsched) {
        var per = x[0];
        var end = x[1];
        if(end - now >= 0) {
            var line = per + " ";
            while(line.length < 18)
                line += "-";
            line += " " + zf(end.getHours()) + ":" + zf(end.getMinutes());
            ls += line + "<br>";
        }
    }
    for(var x of currentsched) {
        var per = x[0];
        var end = x[1];
        if(end - now >= 0) {
            var period = per;
            var rn = new Date();
            break;
        }
    }
    setHtml("list", ls);
    var st = ""
    st += zf(end.getHours() - rn.getHours()) + ":";
    st += zf(end.getMinutes() - rn.getMinutes()) + ":";
    st += zf(60 - Math.abs(end.getSeconds() - rn.getSeconds()));
    setHtml("time", st)
    setHtml("per", `${period} // ENDS AT ${end.getHours()}:${end.getMinutes()}`);
    var d = new Date;
    setHtml("date", d.toDateString());
}
setHtml("time", "-~-");
if(!findHtml("sched"))
    setHtml("sched", findHtml("norm"));
window.setInterval(get, 1000);
get();
