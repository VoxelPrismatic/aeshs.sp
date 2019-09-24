from browser import document as doc, window as win
import datetime
from datetime import time, timedelta as td, datetime as dt
 
global sched
def gID(st):
    return doc.getElementById(st)
def gHTML(st):
    return gID(st).innerHTML
def gSTYLE(st):
    return gID(st).style
def gEDIT(st, val):
    gID(st).innerHTML = val
try:
    sched = eval(gHTML("sched"))
except:
    sched = eval(gHTML("norm"))
def stats(st):
    gEDIT("status", str(st))
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
def cookies():
    for x in range(10):
        doc.cookie = f"custom{x}=" + "".join(
            f"'{pr}'time({str(tm).replace(':',',')})" for pr, tm in eval(str(gHTML(f"custom{x}")))
        )
    doc.cookie = f"sched={typ}"
    d = dt.now()
    doc.cookie = dt(d.year+4,d.month,d.day,d.hour,d.minute,d.second).strftime("%a, %d %b %Y %H:%M:%S UTC")
    gEDIT("cookie", doc.cookie)
def get():
    cur = gHTML("typ").split("_")[0]
    typ = cur + ("_half" if eval(gHTML("half")) and gID(cur+"_half") else "")
    gEDIT("typ", typ)
    gEDIT("sched", gHTML(typ))
    gEDIT("prt", cat[typ])
    currentsched = eval(gHTML("sched"))
    for per, end in currentsched:
        if diff(end) >= 0:
            period = per
            end = dt.combine(dt.today(), end)
            rn = dt.now()
            break
    gEDIT("time", ':'.join(zf(x) for x in str(end-rn).split('.')[0].split(':')))
    gEDIT("per", f"{period} // ENDS AT {zf(end.hour)}:{zf(end.minute)}")
    prs, tms = [x[0] for x in currentsched], [x[1] for x in currentsched]
    gEDIT("list", '<br>'.join(f"{prs[x]} {'-'*(18-len(prs[x]))} {str(tms[x-1])[:-3]}" for x in range(1,len(prs))))
    win.setTimeout(cookies(),10)
gEDIT("time", "-~-")
if not gHTML("sched"):
    gEDIT("sched", gHTML("norm"))
win.setInterval(get, 1000)
