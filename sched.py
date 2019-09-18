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
            doc.write('sched')
        elif ck.startswith('color'):
            doc.body.style.color = ck.split('=')[1]
        elif ck.startswith('theme'):
            doc.body.style.backgroundColor = "#00ffffff" if ck.split('=')[1] == 'dark' else "#aaffffff"
else:
    doc.cookie="color=#00ffffff; theme=dark; sched=norm"
    doc.getElementById("sched").innerHTML = doc.getElementById("norm").innerHTML
