from browser import document as doc, window as win
import datetime
from datetime import time, timedelta as td, datetime as dt
 
global sched
try:
    sched = eval(doc.getElementById("sched").innerHTML)
except:
    sched = eval(doc.getElementById("norm").innerHTML)
def elem():
    return doc.getElementById("time")
def perm():
    return doc.getElementById("per")
def stats(st):
    doc.getElementById("status").innerHTML = str(st)
def diff(t1):
    t2 = dt.now()
    t1 = dt.combine(dt.today(), t1)
    return (t1-t2).total_seconds()
def zf(itm):
    return str(itm).zfill(2)
def rgb2hex(itm):
    return "#"+"".join(zf(hex(int(x))[2:]) for x in itm[4:-1].split(','))+"ff"
cat = {"norm": "NORMAL SCHEDULE",
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
       "summer": "SUMMER SCHEDULE - KINDA USELESS"}
def custom(label):
    try:
        return "".join(f"'{pr}'time({tm.replace(':',',')})" for pr, tm in eval(doc.getElementById(label).innerHTML))
    except:
        return '"END"time(23,59,59)'
def load(period, end):
    theme = doc.getElementById("theme").innerHTML
    color = doc.getElementById("color").innerHTML
    cur = doc.getElementById("typ").innerHTML.split("_")[0]
    typ = cur + ("_half" if eval(doc.getElementById("half").innerHTML) and doc.getElementById(cur+"_half") else "")
    doc.getElementById("typ").innerHTML = typ
    doc.getElementById("sched").innerHTML = doc.getElementById(typ).innerHTML
    doc.getElementById("prt").innerHTML = cat[typ]
    doc.cookie = f"color={color}"
    doc.cookie = f"theme={theme}"
    doc.cookie = f"sched={typ}"
    for x in range(10):
        doc.cookie = f"custom{x}={custom('custom'+str(x))}"
    doc.getElementById("cookie").innerHTML = doc.cookie
    perm().innerHTML = f"{period} // ENDS AT {zf(end.hour)}:{zf(end.minute)}"
    doc.cookie = f"color={color}; theme={theme}; sched={typ};"
    itm = eval(doc.getElementById("sched").innerHTML)
    prs, tms = [x[0] for x in itm], [x[1] for x in itm]
    doc.getElementById("list").innerHTML = '<br>'.join(
        f"{prs[x]} {'-'*(18-len(prs[x]))} {str(tms[x-1])[:-3]}" for x in range(1,len(prs))
    )
def get():
    for per, end in eval(doc.getElementById("sched").innerHTML):
        if diff(end) >= 0:
            period = per
            end = dt.combine(dt.today(), end)
            rn = dt.now()
            break
    elem().innerHTML = ':'.join(zf(x) for x in str(end-rn).split('.')[0].split(':'))
    win.setTimeout(load(period, end),1000)
elem().innerHTML = "--~--"
if not doc.getElementById("sched").innerHTML:
    doc.getElementById("sched").innerHTML = doc.getElementById("norm").innerHTML
win.setInterval(get, 1000)
