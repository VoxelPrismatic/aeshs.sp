from browser import document
from datetime import time
norm = [("SCHOOL STARTS", time(7,30)),
        ("EARLY BIRD",    time(8,25)),
        ("PASSING TO 1",  time(8,30)),
        ("PERIOD 1",      time(9,21)),
        ("PASSING TO 2",  time(9,26)),
        ("PERIOD 2",      time(10,13),
        ("PASSING TO 3",  time(10,18),
        ("PERIOD 3",      time(11,5)),
        ("PASSING TO 4",  time(11,10)),
        ("PERIOD 4",      time(11,57)),
        ("PASSING TO 5",  time(12,2)),
        ("PERIOD 5",      time(12,49)),
        ("PASSING TO 6",  time(12,54)),
        ("PERIOD 6",      time(13,41)),
        ("PASSING TO 7",  time(13,46)),
        ("PERIOD 7",      time(14,33)),
        ("PASSING TO 8",  time(14,38)),
        ("PERIOD 8",      time(15,25)),
        ("SCHOOL IS TMO", time(23,59,59))]
nrmH = {"EB": time(8,25),
        "EB -> 1A": time(8,30),
        "1A": time(8,54),
        "1A -> 1B": time(9,1),
        "1B": time(9,21),
        "1B -> 2A": time(9,26),
        "2A": time(9,46)}
document.getElementById("sched").innerHTML = str(norm)
