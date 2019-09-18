from browser import document as doc, window as win
from datetime import time
sched = eval(doc.getElementById("sched").innerHTML)
timer = doc.getElementById("time").innerHTML
def get():
    timer = str(timer.innerHTML)+1)

win.setInterval(get, 1000)
