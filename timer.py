from browser import document as doc, window as win
import datetime
from datetime import time, timedelta as td, datetime as dt
 
global sched
sched = eval(doc.getElementById("sched").innerHTML)
def elem():
    return doc.getElementById("time")
def perm():
    return doc.getElementById("per")
def stats(st):
    doc.getElementById("status").innerHTML = str(st)
elem().innerHTML = "--~--"
def diff(t1):
    t2 = dt.now()
    t1 = dt.combine(dt.today(), t1)
    return (t1-t2).total_seconds()
def zf(itm):
    return str(itm).zfill(2)
    
cat = {"norm": "NORMAL SCHEDULE",
       "norm_half": "NORMAL SCHEDULE - HALF PERIODS",
       "act": "ACTIVITY PERIOD SCHEDULE",
       "act_half": "ACTIVITY PERIOD SCHEDULE - HALF PERIODS",
       "pm": "PM ASSEMBLY SCHEDULE",
       "pm_half": "PM ASSEMBLY SCHEDULE - HALF PERIODS",
       "late": "LATE ARRIVAL SCHEDULE",
       "final": "FINALS SCHEDULE",
       "early": "EARLY DISMISSAL SCHEDULE",
       "early_half": "EARLY DISMISSAL SCHEDULE - HALF PERIODS",
       "summer": "SUMMER SCHEDULE - KINDA USELESS"}
def get():
    theme = "dark" if doc.body.style.backgroundColor=='#112222ff' else "light"
    color = doc.body.style.color
    cur = doc.getElementById("typ").innerHTML
    typ = cur + ("_half" if eval(doc.getElementById("half").innerHTML) and cur not in ["late","summer"] else "")
    doc.getElementById("typ").innerHTML = typ
    doc.getElementById("sched").innerHTML = doc.getElementById(typ).innerHTML
    doc.getElementById("prt").innerHTML = cat[typ]
    for per, end in eval(doc.getElementById("sched").innerHTML):
        if diff(end) >= 0:
            period = per
            end = dt.combine(dt.today(), end)
            rn = dt.now()
            break
    elem().innerHTML = ':'.join(zf(x) for x in str(end-rn).split('.')[0].split(':'))
    perm().innerHTML = f"{period} // ENDS AT {zf(end.hour)}:{zf(end.minute)}:{zf(end.second)}"
    doc.cookie = f"color={color}; theme={theme}; sched={typ};"
    try:
        itm = eval(doc.getElementById("sched").innerHTML)
        prs, tms = [x[0] for x in itm], [x[1] for x in itm]
        doc.getElementById("list").innerHTML = '<br>'.join(
            f"{prs[x]} {'-'*(18-len(prs[x]))} {str(tms[x-1])}" for x in range(1,len(prs))
        )
    except Exception as ex:
        doc.write(str(ex))
elem().innerHTML = "---~---"
win.setInterval(get, 1000)
