from browser import document as doc
if len(doc.cookie):
    if "color=" not in doc.cookie:
        doc.cookie="color=#00ffffff"
    if "theme=" not in doc.cookie:
        doc.cookie="theme=dark"
    if "sched=" not in doc.cookie:
        doc.cookie="sched=norm"
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
else:
    doc.cookie="color=#00ffffff; theme=dark; sched=norm"
    doc.getElementById("sched").innerHTML = doc.getElementById("norm").innerHTML
doc.getElementById("time").innerHTML = "-~-"
doc.getElementById("cookie").innerHTML = doc.cookie
