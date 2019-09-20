from browser import document as doc
from datetime import time
doc.getElementById("time").innerHTML = "•~•"
try:
  if len(doc.cookie):
    doc.getElementById("time").innerHTML = ".~."
    norm_sched = eval(doc.getElementById("norm").innerHTML)
    altered = "".join(f"'{pr}'{tm}" for pr, tm in norm_sched)
    doc.getElementById("time").innerHTML = ">~<"
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
            doc.getElementById("sched").innerHTML = doc.getElementById(ck.split('=')[1]).innerHTML
            doc.getElementById("typ").innerHTML = ck.split('=')[1]
            if ck.split('=')[1].endswith("_half"):
                doc.getElementById("half").innerHTML = "True"
                doc.getElementById("toggle").innerHTML = "[FULL PERIODS]"
        elif ck.startswith('color'):
            doc.body.style.color = ck.split('=')[1]
            doc.getElementById("color").innerHTML = ck.split('=')[1]
        elif ck.startswith('theme'):
            if ck.split('=')[1] == 'dark':
                doc.body.style.backgroundColor = "#112222ff"
                doc.getElementById("theme").innerHTML = "dark"
                doc.getElementById("change").innerHTML = "[LIGHT THEME]"
                doc.getElementById("change").style.color = "#ccddddff"
            else:
                doc.body.style.backgroundColor = "#ccddddff"
                doc.getElementById("theme").innerHTML = "light"
                doc.getElementById("change").innerHTML = "[DARK THEME]"
                doc.getElementById("change").style.color = "#112222ff"
        elif ck.startswith('custom') and not ck.startswith("custom="):
            st = ck.split("=")[0]+"<br>"
            doc.getElementById(ck.split('=')[0]).innerHTML = "[("+ck[8:].replace('"time(',', time(').replace(')"',')),("')+")]"
          
  else:
    doc.cookie="color=#00ffffff"
    doc.cookie="theme=dark"
    doc.cookie="sched=norm"
    norm_sched = doc.getElementById("norm").innerHTML
    doc.cookie = "custom0="+norm_sched
    doc.cookie = "custom1="+norm_sched
    doc.cookie = "custom2="+norm_sched
    doc.cookie = "custom3="+norm_sched
    doc.cookie = "custom4="+norm_sched
    doc.cookie = "custom5="+norm_sched
    doc.cookie = "custom6="+norm_sched
    doc.cookie = "custom7="+norm_sched
    doc.cookie = "custom8="+norm_sched
    doc.cookie = "custom9="+norm_sched
    doc.getElementById("sched").innerHTML = norm_sched
except Exception as ex: 
    doc.write(str(ex)+"<br>"+ck)
doc.getElementById("time").innerHTML = "-~-"
doc.getElementById("cookie").innerHTML = doc.cookie
