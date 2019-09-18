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
def nextP():
    sched = eval(doc.getElementById("sched").innerHTML)
    for per, end in sched:
        if diff(end) >= 0:
            return per, dt.combine(dt.today(), end), dt.now()
def zf(itm):
    return str(itm).zfill(2)
def get():
    #stats(0)
    period, end, rn = nextP()
    #stats(1)
    elem().innerHTML = ':'.join(zf(x) for x in str(end-rn).split('.')[0].split(':'))
    #stats(2)
    perm().innerHTML = f"{period} // {zf(end.hour)}:{zf(end.minute)}:{zf(end.second)}"
    #stats(3)
win.setInterval(get, 500)
