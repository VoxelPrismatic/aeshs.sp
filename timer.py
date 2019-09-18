try:
 from browser import document as doc, window as win
 import datetime
 from datetime import time, timedelta as td, datetime as dt
 
 global sched
 sched = eval(doc.getElementById("sched").innerHTML)
 doc.getElementById("sched").innerHTML = ""
 def elem():
    return doc.getElementById("time")
 def perm():
    return doc.getElementById("per")
 elem().innerHTML = "~"
 def diff(t1):
    t2 = dt.now()
    t1 = dt.combine(dt.today(), t1)
    return (t1-t2).total_seconds()
 def nextP():
    for per in sched:
        if diff(sched[per]) >= 0:
            return per, dt.combine(dt.today(), sched[per]), dt.now()
 def zf(itm):
    return str(itm).zfill(2)
 def get():
    doc.write('0')
    period, end, rn = nextP()
    doc.write('1')
    elem().innerHTML = ':'.join(zf(x) for x in str(end-rn).split('.')[0].split(':'))
    doc.write('2')
    perm().innerHTML = f"PERIOD {period} // {zf(end.hour)}:{zf(end.minute)}:{zf(end.second)}"
    doc.write('3')
 win.setInterval(get, 900)
except Exception as ex:
    doc.write(str(ex))
