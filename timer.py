from browser import document as doc, window as win
from datetime import time, timedelta as td, datetime as dt, combine as cb, now
global sched
sched = eval(doc.getElementById("sched").innerHTML)
doc.getElementById("sched").innerHTML = ""
def elem():
    return doc.getElementById("time")
elem().innerHTML = "0"
def diff(t1, t2):
    return (t1-dt(1970,1,1)).total_seconds()-(t2-dt(1970,1,1)).total_seconds()
def nextP():
    for per in sched:
        if diff(sched[per],now()) >= 0:
def get():
    elem().innerHTML = str(int(elem().innerHTML)+1)

win.setInterval(get, 1000)
