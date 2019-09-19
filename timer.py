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
elem().innerHTML = "~"
def diff(t1):
    t2 = dt.now()
    t1 = dt.combine(dt.today(), t1)
    return (t1-t2).total_seconds()
def zf(itm):
    return str(itm).zfill(2)
def nextP():
    sched = eval(doc.getElementById("sched").innerHTML)
    for per, end in sched:
        if diff(end) >= 0:
            return per, dt.combine(dt.today(), end), dt.now()
def get():
    period, end, rn = nextP()
    elem().innerHTML = ':'.join(zf(x) for x in str(end-rn).split('.')[0].split(':'))
    perm().innerHTML = f"{period} // ENDS AT {zf(end.hour)}:{zf(end.minute)}:{zf(end.second)}"
win.setInterval(get, 1000)
