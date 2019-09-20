from browser import document as doc
try:
  if len(doc.cookie):
    norm_sched = doc.getElementById("norm").innerHTML
    doc.write("hi")
    default = {"color=": "#00ffffff",
               "theme=": "dark",
               "sched=": "norm",
               "custom0=": norm_sched,
               "custom1=": norm_sched,
               "custom2=": norm_sched,
               "custom3=": norm_sched,
               "custom4=": norm_sched,
               "custom5=": norm_sched,
               "custom6=": norm_sched,
               "custom7=": norm_sched,
               "custom8=": norm_sched,
               "custom9=": norm_sched
              }
    for key in default:
        if key not in doc.cookie:
            doc.cookie = key+default[key]
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
        elif ck.startswith('custom') and ck != "custom":
            doc.getElementById(ck.split('=')[0]).innerHTML = ck[8:]
          
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
    doc.getElementById("sched").innerHTML = doc.getElementById("norm").innerHTML
except Exception as ex: doc.write(str(ex))
doc.getElementById("time").innerHTML = "-~-"
doc.getElementById("cookie").innerHTML = doc.cookie
