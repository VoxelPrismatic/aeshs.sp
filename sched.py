from browser import document
from datetime import time
norm = {"Early": time(8,25,0),
        "Early -> 1": time(8,30,0),
        "1": time(9,21,0),
        "1 -> 2": time(9,26,0),
        "2": time(10,13,0),
        "2 -> 3": time(10,18,0),
        "3": time(11,5,0),
        "3 -> 4": time(11,10,0),
        "4": time(11,57,0),
        "4 -> 5": time(12,2,0),
        "5": time(12,49,0),
        "5 -> 6": time(12,54,0),
        "6": time(13,41,0),
        "6 -> 7": time(13,46,0),
        "7": time(14,33,0),
        "7 -> 8": time(14,38,0),
        "8": time(3,25,0)}
nrmH = {"Early": time(8,25,0),
        "Early -> 1A": time(8,30,0),
        "1A": time(8,54,0),
        "1A -> 1B": time(9,1,0),
        "1B": time(9,21,0),
        "1B -> 2A": time(9,26,0),
        "2A": time(9,46,0)}
document.getElementById("sched").innerHTML = str(norm)
