from browser import document as doc, window as win
from time import sleep
x = 0
doc.getElementById("time").innerHTML = "0"
def i():
    x = int(doc.getElementById("time").innerHTML)
    doc.getElementById("time").innerHTML = str(x+1)

win.setInterval(i, 1000)
