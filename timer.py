from browser import document as doc
from time import sleep
x = 0
while True:
    doc.getElementById("time").innerHTML = str(x)
    x += 1
    sleep(1)
