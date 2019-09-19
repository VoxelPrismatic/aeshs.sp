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
        elif ck.startswith('color'):
            doc.body.style.color = ck.split('=')[1]
        elif ck.startswith('theme'):
            doc.body.style.backgroundColor = "#112222ff" if ck.split('=')[1] == 'dark' else "#ccddddff"
else:
    doc.cookie="color=#00ffffff; theme=dark; sched=norm"
    doc.getElementById("sched").innerHTML = doc.getElementById("norm").innerHTML
doc.getElementById("time").innerHTML = "-~-"
