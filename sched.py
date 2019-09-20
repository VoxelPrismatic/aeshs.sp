from browser import document as doc
if len(doc.cookie):
    if "color=" not in doc.cookie:
        doc.cookie = "color=#00ffffff"
    if "theme=" not in doc.cookie:
        doc.cookie = "theme=dark"
    if "sched=" not in doc.cookie:
        doc.cookie = "sched=norm"
    if "custom0=" not in doc.cookie:
        doc.cookie = "custom0="+doc.getElementById("norm").innerHTML
    if "custom1=" not in doc.cookie:
        doc.cookie = "custom1="+doc.getElementById("norm").innerHTML
    if "custom2=" not in doc.cookie:
        doc.cookie = "custom2="+doc.getElementById("norm").innerHTML
    if "custom3=" not in doc.cookie:
        doc.cookie = "custom3="+doc.getElementById("norm").innerHTML
    if "custom4=" not in doc.cookie:
        doc.cookie = "custom4="+doc.getElementById("norm").innerHTML
    if "custom5=" not in doc.cookie:
        doc.cookie = "custom5="+doc.getElementById("norm").innerHTML
    if "custom6=" not in doc.cookie:
        doc.cookie = "custom6="+doc.getElementById("norm").innerHTML
    if "custom7=" not in doc.cookie:
        doc.cookie = "custom7="+doc.getElementById("norm").innerHTML
    if "custom8=" not in doc.cookie:
        doc.cookie = "custom8="+doc.getElementById("norm").innerHTML
    if "custom9=" not in doc.cookie:
        doc.cookie = "custom9="+doc.getElementById("norm").innerHTML
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
        elif ck.startswith('custom0'):
            doc.getElementById("custom0").innerHTML = ck[7:]
        elif ck.startswith('custom1'):
            doc.getElementById("custom1").innerHTML = ck[7:]
        elif ck.startswith('custom2'):
            doc.getElementById("custom2").innerHTML = ck[7:]
        elif ck.startswith('custom3'):
            doc.getElementById("custom3").innerHTML = ck[7:]
        elif ck.startswith('custom4'):
            doc.getElementById("custom4").innerHTML = ck[7:]
        elif ck.startswith('custom5'):
            doc.getElementById("custom5").innerHTML = ck[7:]
        elif ck.startswith('custom6'):
            doc.getElementById("custom6").innerHTML = ck[7:]
        elif ck.startswith('custom7'):
            doc.getElementById("custom7").innerHTML = ck[7:]
        elif ck.startswith('custom8'):
            doc.getElementById("custom8").innerHTML = ck[7:]
        elif ck.startswith('custom9'):
            doc.getElementById("custom9").innerHTML = ck[7:]
          
else:
    doc.cookie="color=#00ffffff"
    doc.cookie="theme=dark"
    doc.cookie="sched=norm"
    doc.cookie = "custom0="+doc.getElementById("norm").innerHTML
    doc.cookie = "custom1="+doc.getElementById("norm").innerHTML
    doc.cookie = "custom2="+doc.getElementById("norm").innerHTML
    doc.cookie = "custom3="+doc.getElementById("norm").innerHTML
    doc.cookie = "custom4="+doc.getElementById("norm").innerHTML
    doc.cookie = "custom5="+doc.getElementById("norm").innerHTML
    doc.cookie = "custom6="+doc.getElementById("norm").innerHTML
    doc.cookie = "custom7="+doc.getElementById("norm").innerHTML
    doc.cookie = "custom8="+doc.getElementById("norm").innerHTML
    doc.cookie = "custom9="+doc.getElementById("norm").innerHTML
    doc.getElementById("sched").innerHTML = doc.getElementById("norm").innerHTML
doc.getElementById("time").innerHTML = "-~-"
doc.getElementById("cookie").innerHTML = doc.cookie
