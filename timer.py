try:
 from browser import document as doc, window as win
 from datetime import time, timedelta as td, datetime as dt
 """
 global sched
 sched = eval(doc.getElementById("sched").innerHTML)
 doc.getElementById("sched").innerHTML = "LOL"
 def elem():
    return doc.getElementById("time")
 def perm():
    return doc.getElementById("per")
 elem().innerHTML = "0"
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
    period, end, rn = nextP()
    elem().innerHTML = ':'.join(zf(x) for x in str(end-now).split('.')[0].split(':'))
    perm().innerHTML = f"PERIOD {period} // {zf(end.hour)}:{zf(end.minute)}:{zf(end.second)}"
 win.setInterval(get, 500)
 """
except Exception as ex:
    doc.write(str(ex))
    doc.write("hi")
