from browser import document as doc
from datetime import time
def gID(st):
    return doc.getElementById(st)
def gHTML(st):
    return gID(st).innerHTML
def gSTYLE(st):
    return gID(st).style
def gEDIT(st, val):
    gID(st).innerHTML = val
gID("time").innerHTML = "•~•"
if len(doc.cookie):
    altered = "".join(f"'{pr}'{tm}" for pr, tm in eval(gHTML("norm")))
    gEDIT("time", ">~<")
    default = {
        "color=": "#00ffffff",
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
            gEDIT("sched", gHTML(ck.split('=')[1]))
            gEDIT("typ", ck.split('=')[1])
            if ck.split('=')[1].endswith("_half"):
                gEDIT("half", "True")
                gEDIT("toggle", "[FULL PERIODS]")
        elif ck.startswith('color'):
            doc.body.style.color = ck.split('=')[1]
            gEDIT("color", ck.split('=')[1])
        elif ck.startswith('theme'):
            if ck.split('=')[1] == 'dark':
                doc.body.style.backgroundColor = "#112222ff"
                gEDIT("theme", "dark")
                gEDIT("change", "[LIGHT THEME]")
                gSTYLE("change").color = "#ccddddff"
            else:
                doc.body.style.backgroundColor = "#ccddddff"
                gEDIT("theme", "light")
                gEDIT("change", "[DARK THEME]")
                gSTYLE("change").color = "#112222ff"
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
            gEDIT(ck.split('=')[0], f"[({itm})]")
          
else:
    doc.cookie="color=#00ffffff"
    doc.cookie="theme=dark"
    doc.cookie="sched=norm"
    altered = "".join(f"'{pr}'{tm}" for pr, tm in eval(gHTML("norm")))
    for x in range(10):
        doc.cookie = f"custom{x}={altered}"
        gEDIT(f"custom{x}", gHTML("norm"))
    gEDIT("sched", gHTML("norm"))

gEDIT("time", "•~•")
gEDIT("cookie", doc.cookie)
