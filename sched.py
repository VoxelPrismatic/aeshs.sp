from browser import document
from datetime import time
norm = {"START": time(7,30),
        "EB": time(8,25),
        "EB -> 1": time(8,30),
        "1": time(9,21),
        "1 -> 2": time(9,26),
        "2": time(10,13),
        "2 -> 3": time(10,18),
        "3": time(11,5),
        "3 -> 4": time(11,10),
        "4": time(11,57),
        "4 -> 5": time(12,2),
        "5": time(12,49),
        "5 -> 6": time(12,54),
        "6": time(13,41),
        "6 -> 7": time(13,46),
        "7": time(14,33),
        "7 -> 8": time(14,38),
        "8": time(15,25),
        "END": time(23,59)}
nrmH = {"EB": time(8,25),
        "EB -> 1A": time(8,30),
        "1A": time(8,54),
        "1A -> 1B": time(9,1),
        "1B": time(9,21),
        "1B -> 2A": time(9,26),
        "2A": time(9,46)}
document.getElementById("sched").innerHTML = str(norm)
