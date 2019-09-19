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
    slist = []
    itm = ""
    for per, end in sched:
        if itm and itm != time(23,59,59):
            slist.append(per+" ")
            while len(slist[-1]) < 14:
                slist[-1] += '-'
            slist[-1] += f" {zf(end.hour)}:{zf(end.minute)}:{zf(end.second)}"
        doc.getElementById("list").innerHTML = '<br>'.join(slist)
        if diff(end) >= 0:
            return per, dt.combine(dt.today(), end), dt.now()
        itm = end
def get():
    #stats(0)
    period, end, rn = nextP()
    #stats(1)
    elem().innerHTML = ':'.join(zf(x) for x in str(end-rn).split('.')[0].split(':'))
    #stats(2)
    perm().innerHTML = f"{period} // ENDS AT {zf(end.hour)}:{zf(end.minute)}:{zf(end.second)}"
    #stats(3)
win.setInterval(get, 250)
