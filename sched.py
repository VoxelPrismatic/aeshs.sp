from browser import document as doc
from datetime import time
def gID(st):
    return doc.getElementById(st)
def gHTML(st):
    return gID(st).innerHTML
gID("time").innerHTML = "•~•"
if len(doc.cookie):
    altered = "".join(f"'{pr}'{tm}" for pr, tm in eval(gHTML("norm")))
    gID("time").innerHTML = ">~<"
    default = {"color=": "#00ffffff",
               "theme=": "dark",
               "sched=": "norm",
               "custom0=": altered,
               "custom1=": altered,
               "custom2=": altered,
               "custom3=": altered,
               "custom4=": altered,
               "custom5=": altered,
               "custom6=": altered,
               "custom7=": altered,
               "custom8=": altered,
               "custom9=": altered
              }
    for ck in doc.cookie.split(';'):
        ck = ck.strip()
        if ck.startswith('sched'):
            gID("sched").innerHTML = gHTML(ck.split('=')[1])
            gID("typ").innerHTML = ck.split('=')[1]
            if ck.split('=')[1].endswith("_half"):
                gID("half").innerHTML = "True"
                gID("toggle").innerHTML = "[FULL PERIODS]"
        elif ck.startswith('color'):
            doc.body.style.color = ck.split('=')[1]
            gID("color").innerHTML = ck.split('=')[1]
        elif ck.startswith('theme'):
            if ck.split('=')[1] == 'dark':
                doc.body.style.backgroundColor = "#112222ff"
                gID("theme").innerHTML = "dark"
                gID("change").innerHTML = "[LIGHT THEME]"
                gID("change").style.color = "#ccddddff"
            else:
                doc.body.style.backgroundColor = "#ccddddff"
                gID("theme").innerHTML = "light"
                gID("change").innerHTML = "[DARK THEME]"
                gID("change").style.color = "#112222ff"
        elif ck.startswith('custom') and not ck.startswith("custom="):
            st = ck.split("=")[0]+"<br>"
            rep = {"'time(": "', time(",
                   ")'": ")), ('",
                   "00": "0",
                   "01": "1",
                   "02": "2",
                   "03": "3",
                   "04": "4",
                   "05": "5",
                   "06": "6",
                   "07": "7",
                   "08": "8",
                   "09": "9"}
            itm = ck[8:]
            for r in rep:
                itm = itm.replace(r,rep[r])
            gID(ck.split('=')[0]).innerHTML = f"[({itm})]"
          
else:
    doc.cookie="color=#00ffffff"
    doc.cookie="theme=dark"
    doc.cookie="sched=norm"
    altered = "".join(f"'{pr}'{tm}" for pr, tm in eval(gHTML("norm")))
    for x in range(10):
        doc.cookie = f"custom{x}={altered}"
        gID(f"custom{x}").innerHTML = gHTML("norm")
    doc.getElementById("sched").innerHTML = gHTML("norm")

gID("time").innerHTML = "•~•"
gID("cookie").innerHTML = doc.cookie
