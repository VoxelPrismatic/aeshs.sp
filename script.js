function $(a, e = document) {
    return e.querySelector(a);
} function $$(a, e = document) {
    return e.querySelectorAll(a);
}
$("#time").textContent = "-~-"

var offset_time = new Date();
var load_time = new Date();
var url = document.URL;
if(url.includes("?")) {
    if(url.includes("day="))
        offset_time.setDate(Number(url.split("day=")[1].split("&")[0]) || offset_time.getDate());
    if(url.includes("month="))
        offset_time.setMonth((Number(url.split("month=")[1].split("&")[0]) - 1) || offset_time.getMonth());
    if(url.includes("year="))
        offset_time.setFullYear(Number(url.split("year=")[1].split("&")[0]) || offset_time.getFullYear());
    if(url.includes("hour="))
        offset_time.setHours(Number(url.split("hour=")[1].split("&")[0]) || offset_time.getHours());
    if(url.includes("minute="))
        offset_time.setMinutes(Number(url.split("minute=")[1].split("&")[0]) || offset_time.getMinutes());
    if(url.includes("second="))
        offset_time.setSeconds(Number(url.split("second=")[1].split("&")[0]) || offset_time.getSeconds());
}
function offset_day(now = new Date()) {
    if(url.includes("?"))
        return new Date(Number(now) - Number(load_time) + Number(offset_time));
    return now
}

var just_now = offset_day();
var last_now = offset_day();

function time(hr = 0, mn = 0, sc = 0) {
    var now = new Date(last_now);
    now.setHours(hr);
    now.setMinutes(mn);
    now.setSeconds(sc);
    return now;
}

var custom_schedule = false;
var elearn_schedule = false;
var hybrid_schedule = false;
var finals_schedule = false;
var hr12 = false;
var half_period = false;
var light_theme = Number(localStorage.getItem("light_theme") || 0);
var last_time = 0;
var last_end = null;
var full_screen = false;

var schedule_names = {
    "normal": "NORMAL SCHEDULE",
    "late_arrival": "LATE ARRIVAL SCHEDULE",
    "activity": "ACTIVITY PERIOD SCHEDULE",
    "pm_assembly": "PM ASSEMBLY SCHEDULE",
    "early_dismissal": "EARLY DISMISSAL SCHEDULE",
    "odyssey": "ODYSSEY SCHEDULE",
    "summer": "SUMMER SCHEDULE - KINDA USELESS",
    "finals": {
        "1": "FINALS DAY 1 SCHEDULE",
        "2": "FINALS DAY 2 SCHEDULE",
        "3": "FINALS DAY 3 SCHEDULE"
    },
    "half": {
        "normal": "NORMAL SCHEDULE - HALF PERIODS",
        "activity": "ACTIVITY PERIOD SCHEDULE - HALF PERIODS",
        "pm_assembly": "PM ASSEMBLY SCHEDULE - HALF PERIODS",
        "early_dismissal": "EARLY DISMISSAL SCHEDULE - HALF PERIODS"
    },
    "hybrid": {
        "half": {
            "normal": "NORMAL SCHEDULE - HYBRID HALF PERIODS",
            "remote": "REMOTE SCHEDULE - HYBRID HALF PERIODS"
        },
        "normal": "NORMAL SCHEDULE - HYBRID LEARNING",
        "remote": "REMOTE SCHEDULE - HYBRID LEARNING",
        "late_arrival": "LATE ARRIVAL - HYBRID LEARNING"
    },
    "corona": {
        "half": {
            "normal": "NORMAL SCHEDULE - E-LEARNING HALF PERIODS",
            "early_dismissal": "EARLY DISMISSAL SCHEDULE - E-LEARNING HALF PERIODS",
        },
        "normal": "NORMAL SCHEDULE - E-LEARNING",
        "late_arrival": "LATE ARRIVAL SCHEDULE - E-LEARNING",
        "early_dismissal": "EARLY DISMISSAL SCHEDULE - E-LEARNING",
        "finals": {
            "1": "FINALS DAY 1 SCHEDULE - E-LEARNING",
            "2": "FINALS DAY 2 SCHEDULE - E-LEARNING",
            "3": "FINALS DAY 3 SCHEDULE - E-LEARNING"
        },
    },
    "custom": {
        "0": "CUSTOM SCHEDULE 0",
        "1": "CUSTOM SCHEDULE 1",
        "2": "CUSTOM SCHEDULE 2",
        "3": "CUSTOM SCHEDULE 3",
        "4": "CUSTOM SCHEDULE 4",
        "5": "CUSTOM SCHEDULE 5",
        "6": "CUSTOM SCHEDULE 6",
        "7": "CUSTOM SCHEDULE 7",
        "8": "CUSTOM SCHEDULE 8",
        "9": "CUSTOM SCHEDULE 9",
        "a": "CUSTOM SCHEDULE A",
        "b": "CUSTOM SCHEDULE B",
        "c": "CUSTOM SCHEDULE C",
        "d": "CUSTOM SCHEDULE D",
        "e": "CUSTOM SCHEDULE E",
        "f": "CUSTOM SCHEDULE F",
    },
    "free": {
        "winter": "WINTER BREAK",
        "spring": "SPRING BREAK",
        "thanks": "THANKSGIVING BREAK",
        "off": "NO SCHOOL TODAY",
        "end": "WEEKEND"
    }
}

var schedules = {
    "normal": {
        "SCHOOL STARTS": time( 7, 30),
        "EARLY BIRD":    time( 8, 25),
        "PASSING TO 1":  time( 8, 30),
        "PERIOD 1":      time( 9, 21),
        "PASSING TO 2":  time( 9, 26),
        "PERIOD 2":      time(10, 13),
        "PASSING TO 3":  time(10, 18),
        "PERIOD 3":      time(11,  5),
        "PASSING TO 4":  time(11, 10),
        "PERIOD 4":      time(11, 57),
        "PASSING TO 5":  time(12,  2),
        "PERIOD 5":      time(12, 49), 
        "PASSING TO 6":  time(12, 54),
        "PERIOD 6":      time(13, 41),
        "PASSING TO 7":  time(13, 46),
        "PERIOD 7":      time(14, 33),
        "PASSING TO 8":  time(14, 38),
        "PERIOD 8":      time(15, 25),
        "SCHOOL IS TOMORROW": time(23, 59, 59)
    },
    "late_arrival": {
        "SCHOOL STARTS": time( 9, 30),
        "EARLY BIRD":    time(10, 25),
        "PASSING TO 1":  time(10, 30),
        "PERIOD 1":      time(11,  5),
        "PASSING TO 2":  time(11, 10),
        "PERIOD 2":      time(11, 40),
        "PASSING TO 3":  time(11, 45),
        "PERIOD 3":      time(12, 15),
        "PASSING TO 4":  time(12, 20),
        "PERIOD 4":      time(12, 55),
        "PASSING TO 5":  time(13,  0),
        "PERIOD 5":      time(13, 35),
        "PASSING TO 6":  time(13, 40),
        "PERIOD 6":      time(14, 15),
        "PASSING TO 7":  time(14, 20),
        "PERIOD 7":      time(14, 50),
        "PASSING TO 8":  time(14, 44),
        "PERIOD 8":      time(15, 25),
        "SCHOOL IS TOMORROW": time(23, 59, 59),
    },
    "activity": {
        "SCHOOL STARTS": time( 7, 30),
        "EARLY BIRD":    time( 8, 25),
        "PASSING TO 1":  time( 8, 30),
        "PERIOD 1":      time( 9, 15),
        "PASSING TO 2":  time( 9, 20),
        "PERIOD 2":      time(10,  1),
        "GO TO ACTIVITY": time(10,  6),
        "ACTIVITY":      time(10, 49),
        "PASSING TO 3":  time(10, 54),
        "PERIOD 3":      time(11, 35),
        "PASSING TO 4":  time(11, 40),
        "PERIOD 4":      time(12, 21),
        "PASSING TO 5":  time(12, 26),
        "PERIOD 5":      time(13,  7),
        "PASSING TO 6":  time(13, 12),
        "PERIOD 6":      time(13, 53),
        "PASSING TO 7":  time(13, 58),
        "PERIOD 7":      time(14, 39),
        "PASSING TO 8":  time(14, 55),
        "PERIOD 8":      time(15, 25),
        "SCHOOL IS TOMORROW": time(23, 59, 59),
    },
    "pm_assembly": {
        "SCHOOL STARTS": time( 7, 30),
        "EARLY BIRD":    time( 8, 25),
        "PASSING TO 1":  time( 8, 30),
        "PERIOD 1":      time( 9, 15),
        "PASSING TO 2":  time( 9, 20),
        "PERIOD 2":      time(10,  1),
        "PASSING TO 3":  time(10,  6),
        "PERIOD 3":      time(10, 47),
        "PASSING TO 4":  time(10, 52),
        "PERIOD 4":      time(11, 33),
        "PASSING TO 5":  time(11, 38),
        "PERIOD 5":      time(12, 19),
        "PASSING TO 6":  time(12, 24),
        "PERIOD 6":      time(13,  5),
        "PASSING TO 7":  time(13, 10),
        "PERIOD 7":      time(13, 51),
        "PASSING TO 8":  time(13, 56),
        "PERIOD 8":      time(14, 37),
        "GO TO ASSEMBLY": time(14, 42),
        "ASSEMBLY":      time(15, 25),
        "SCHOOL IS TOMORROW": time(23, 59, 59),
    },
    "early_dismissal": {
        "SCHOOL STARTS": time( 7, 30),
        "EARLY BIRD":    time( 8, 25),
        "PASSING TO 1":  time( 8, 30),
        "PERIOD 1":      time( 9, 15),
        "PASSING TO 2":  time( 9, 20),
        "PERIOD 2":      time(10,  1),
        "PASSING TO 3":  time(10,  6),
        "PERIOD 3":      time(10, 47),
        "PASSING TO 4":  time(10, 52),
        "PERIOD 4":      time(11, 33),
        "PASSING TO 5":  time(11, 38),
        "PERIOD 5":      time(12, 19),
        "PASSING TO 6":  time(12, 24),
        "PERIOD 6":      time(13,  5),
        "PASSING TO 7":  time(13, 10),
        "PERIOD 7":      time(13, 51),
        "PASSING TO 8":  time(13, 56),
        "PERIOD 8":      time(15, 37),
        "SCHOOL IS TOMORROW": time(23, 59, 59),
    },
    "odyssey": {
        "ODYSSEY STARTS": time(10, 15),
        "HOMEROOM [P2]":  time(10, 25),
        "PASSING TO 1":   time(10, 35),
        "ODYSSEY 1":      time(11, 25),
        "PASSING TO 2":   time(11, 35),
        "ODYSSEY 2":      time(12, 25),
        "PASSING TO 3":   time(12, 35),
        "ODYSSEY 3":      time(13, 25),
        "PASSING TO 4":   time(13, 35),
        "ODYSSEY 4":      time(14, 25),
        "PASSING TO 5":   time(14, 35),
        "ODYSSEY 5":      time(15, 25),
        "SCHOOL IS TOMORROW": time(23, 59, 59),
    },
    "summer": {
        "SCHOOL STARTS": time( 7, 40),
        "GO TO CLASS":   time( 7, 45),
        "SUMMER SCHOOL": time(12, 59),
        "SCHOOL IS TOMORROW": time(23, 59, 59),
    },

    "finals": {
        "1": {
            "SCHOOL STARTS": time( 7, 30),
            "EARLY BIRD":    time( 8, 25),
            "PASSING TO 1":  time( 8, 30),
            "PERIOD 1":      time(10,  0),
            "PASSING TO 2":  time(10, 10),
            "PERIOD 2":      time(11, 40),
            "PASSING TO 4":  time(11, 50),
            "PERIOD 4":      time(13, 20),
            "SCHOOL IS TOMORROW": time(23, 59, 59),
        },
        "2": {
            "SCHOOL STARTS": time( 7, 30),
            "EARLY BIRD":    time( 8, 25),
            "PASSING TO 3":  time( 8, 30),
            "PERIOD 3":      time(10,  0),
            "PASSING TO 7":  time(10, 10),
            "PERIOD 7":      time(11, 40),
            "PASSING TO 5":  time(11, 50),
            "PERIOD 5":      time(13, 20),
            "SCHOOL IS TOMORROW": time(23, 59, 59),
        },
        "3": {
            "SCHOOL STARTS": time( 7, 30),
            "EARLY BIRD":    time( 8, 25),
            "PASSING TO 8":  time( 8, 30),
            "PERIOD 8":      time(10,  0),
            "PASSING TO 6":  time(10, 10),
            "PERIOD 6":      time(11, 40),
            "GO TO MAKEUPS": time(11, 50),
            "MAKEUPS":       time(13, 20),
            "SEMESTER IS OVER, GG M8": time(23, 59, 59),
        }
    },

    "half": {
        "normal": {
            "SCHOOL STARTS": time( 7, 30),
            "EARLY BIRD":    time( 8, 25),
            "PASSING TO 1A": time( 8, 30),
            "PERIOD 1A":     time( 8, 54),
            "PASSING TO 1B": time( 9,  1),
            "PERIOD 1B":     time( 9, 21),
            "PASSING TO 2A": time( 9, 26),
            "PERIOD 2A":     time( 9, 46),
            "PASSING TO 2B": time( 9, 53),
            "PERIOD 2B":     time(10, 13),
            "PASSING TO 3A": time(10, 18),
            "PERIOD 3A":     time(10, 38),
            "PASSING TO 3B": time(10, 45),
            "PERIOD 3B":     time(11,  5),
            "PASSING TO 4A": time(11, 10),
            "PERIOD 4A":     time(11, 30),
            "PASSING TO 4B": time(11, 37),
            "PERIOD 4B":     time(11, 57),
            "PASSING TO 5A": time(12,  2),
            "PERIOD 5A":     time(12, 22),
            "PASSING TO 5B": time(12, 29),
            "PERIOD 5B":     time(12, 49),
            "PASSING TO 6A": time(12, 54),
            "PERIOD 6A":     time(13, 14),
            "PASSING TO 6B": time(13, 21),
            "PERIOD 6B":     time(13, 41),
            "PASSING TO 7A": time(13, 46),
            "PERIOD 7A":     time(14,  6),
            "PASSING TO 7B": time(14, 13),
            "PERIOD 7B":     time(14, 33),
            "PASSING TO 8A": time(14, 38),
            "PERIOD 8A":     time(14, 58),
            "PASSING TO 8B": time(15,  5),
            "PERIOD 8B":     time(15, 25),
            "SCHOOL IS TOMORROW": time(23, 59, 59),
        },
        "activity": {
            "SCHOOL STARTS": time( 7, 30),
            "EARLY BIRD":    time( 8, 25),
            "PASSING TO 1A": time( 8, 30),
            "PERIOD 1A":     time( 8, 21),
            "PASSING TO 1B": time( 8, 58),
            "PERIOD 1B":     time( 9, 15),
            "PASSING TO 2A": time( 9, 20),
            "PERIOD 2A":     time( 9, 37),
            "PASSING TO 2B": time( 9, 44),
            "PERIOD 2B":     time(10,  1),
            "GO TO ACTIVITY": time(10,  6),
            "ACTIVITY":      time(10, 49),
            "PASSING TO 3A": time(10, 54),
            "PERIOD 3A":     time(11, 11),
            "PASSING TO 3B": time(11, 18),
            "PERIOD 3B":     time(11, 35),
            "PASSING TO 4A": time(11, 40),
            "PERIOD 4A":     time(11, 57),
            "PASSING TO 4B": time(12,  4),
            "PERIOD 4B":     time(12, 21),
            "PASSING TO 5A": time(12, 26),
            "PERIOD 5A":     time(12, 43),
            "PASSING TO 5B": time(12, 50),
            "PERIOD 5B":     time(13,  7),
            "PASSING TO 6A": time(13, 12),
            "PERIOD 6A":     time(13, 29),
            "PASSING TO 6B": time(13, 36),
            "PERIOD 6B":     time(13, 53),
            "PASSING TO 7A": time(13, 58),
            "PERIOD 7A":     time(14, 15),
            "PASSING TO 7B": time(14, 22),
            "PERIOD 7B":     time(14, 39),
            "PASSING TO 8A": time(14, 44),
            "PERIOD 8A":     time(15,  1),
            "PASSING TO 8B": time(15,  8),
            "PERIOD 8B":     time(15, 25),
            "SCHOOL IS TOMORROW": time(23, 59, 59),
        },
        "pm_assembly": {
            "SCHOOL STARTS": time( 7, 30),
            "EARLY BIRD":    time( 8, 25),
            "PASSING TO 1A": time( 8, 30),
            "PERIOD 1A":     time( 8, 51),
            "PASSING TO 1B": time( 9,  1),
            "PERIOD 1B":     time( 9, 15),
            "PASSING TO 2A": time( 9, 20),
            "PERIOD 2A":     time( 9, 37),
            "PASSING TO 2B": time( 9, 44),
            "PERIOD 2B":     time(10,  1),
            "PASSING TO 3A": time(10,  6),
            "PERIOD 3A":     time(10, 23),
            "PASSING TO 3B": time(10, 30),
            "PERIOD 3B":     time(10, 37),
            "PASSING TO 4A": time(10, 52),
            "PERIOD 4A":     time(11,  9),
            "PASSING TO 4B": time(11, 16),
            "PERIOD 4B":     time(11, 33),
            "PASSING TO 5A": time(11, 38),
            "PERIOD 5A":     time(11, 55),
            "PASSING TO 5B": time(12,  2),
            "PERIOD 5B":     time(12, 19),
            "PASSING TO 6A": time(12, 24),
            "PERIOD 6A":     time(12, 41),
            "PASSING TO 6B": time(12, 48),
            "PERIOD 6B":     time(13,  5),
            "PASSING TO 7A": time(13, 10),
            "PERIOD 7A":     time(13, 27),
            "PASSING TO 7B": time(13, 34),
            "PERIOD 7B":     time(13, 51),
            "PASSING TO 8A": time(13, 56),
            "PERIOD 8A":     time(14, 13),
            "PASSING TO 8B": time(14, 20),
            "PERIOD 8B":     time(14, 37),
            "GO TO ASSEMBLY": time(14, 42),
            "ASSEMBLY":      time(15, 25),
            "SCHOOL IS TOMORROW": time(23, 59, 59),
        },
        "early_dismissal": {
            "SCHOOL STARTS": time( 7, 30),
            "EARLY BIRD":    time( 8, 25),
            "PASSING TO 1A": time( 8, 30),
            "PERIOD 1A":     time( 8, 51),
            "PASSING TO 1B": time( 8, 58),
            "PERIOD 1B":     time( 9, 15),
            "PASSING TO 2A": time( 9, 20),
            "PERIOD 2A":     time( 9, 37),
            "PASSING TO 2B": time( 9, 44),
            "PERIOD 2B":     time(10,  1),
            "PASSING TO 3A": time(10,  6),
            "PERIOD 3A":     time(10, 23),
            "PASSING TO 3B": time(10, 30),
            "PERIOD 3B":     time(10, 47),
            "PASSING TO 4A": time(10, 42),
            "PERIOD 4A":     time(11,  9),
            "PASSING TO 4B": time(11, 16),
            "PERIOD 4B":     time(11, 33),
            "PASSING TO 5A": time(11, 38),
            "PERIOD 5A":     time(11, 55),
            "PASSING TO 5B": time(12,  2),
            "PERIOD 5B":     time(12, 19),
            "PASSING TO 6A": time(12, 24),
            "PERIOD 6A":     time(12, 41),
            "PASSING TO 6B": time(12, 48),
            "PERIOD 6B":     time(13,  5),
            "PASSING TO 7A": time(13, 10),
            "PERIOD 7A":     time(13, 27),
            "PASSING TO 7B": time(13, 34),
            "PERIOD 7B":     time(13, 51),
            "PASSING TO 8A": time(13, 56),
            "PERIOD 8A":     time(14, 13),
            "PASSING TO 8B": time(14, 20),
            "PERIOD 8B":     time(14, 37),
            "SCHOOL IS TOMORROW": time(23, 59, 59),
        }
    },
    
    "hybrid": {
        "half": {
            "normal": {
                "SCHOOL STARTS": time( 7, 45),
                "PASSING TO SCI-SEMINAR":  time( 8,  5),
                "SCIENCE SEMINAR":         time( 8, 25),
                "PASSING TO 2":  time( 8, 35),
                "PERIOD 2":      time( 9, 15),
                "PASSING TO 3":  time( 9, 25),
                "PERIOD 3":      time(10,  5),
                "PASSING TO 4":  time(10, 15),
                "PERIOD 4":      time(10, 55),
                "BREAK & BUS":   time(12,  5),
                "PASSING TO 5":  time(12, 15),
                "PERIOD 5":      time(12, 55),
                "PASSING TO 6":  time(13,  5),
                "PERIOD 6":      time(13, 45),
                "PASSING TO 7":  time(13, 55),
                "PERIOD 7":      time(14, 35),
                "PASSING TO 8":  time(14, 45),
                "PERIOD 8":      time(15, 25),
                "SCHOOL IS TOMORROW": time(23, 59, 59)
            },
            "remote": {
                "SCHOOL STARTS": time( 8, 35),
                "PASSING TO SCI-SEMINAR":  time( 8, 55),
                "SCIENCE SEMINAR":         time( 9, 15),
                "PASSING TO 2":  time( 9, 25),
                "PERIOD 2":      time(10,  5),
                "PASSING TO 3":  time(10, 15),
                "PERIOD 3":      time(10, 55),
                "PASSING TO 4":  time(11,  5),
                "PERIOD 4":      time(11, 45),
                "BREAK & BUS":   time(12,  5),
                "PASSING TO 5":  time(12, 15),
                "PERIOD 5":      time(12, 55),
                "PASSING TO 6":  time(13,  5),
                "PERIOD 6":      time(13, 45),
                "PASSING TO 7":  time(13, 55),
                "PERIOD 7":      time(14, 35),
                "PASSING TO 8":  time(14, 45),
                "PERIOD 8":      time(15, 25),
                "SCHOOL IS TOMORROW": time(23, 59, 59)
            }
        },

        "normal": {
            "SCHOOL STARTS": time( 7, 30),
            "PASSING TO 1":  time( 7, 45),
            "PERIOD 1":      time( 8, 25),
            "PASSING TO 2":  time( 8, 35),
            "PERIOD 2":      time( 9, 15),
            "PASSING TO 3":  time( 9, 25),
            "PERIOD 3":      time(10,  5),
            "PASSING TO 4":  time(10, 15),
            "PERIOD 4":      time(10, 55),
            "BREAK & BUS":   time(12,  5),
            "PASSING TO 5":  time(12, 15),
            "PERIOD 5":      time(12, 55),
            "PASSING TO 6":  time(13,  5),
            "PERIOD 6":      time(13, 45),
            "PASSING TO 7":  time(13, 55),
            "PERIOD 7":      time(14, 35),
            "PASSING TO 8":  time(14, 45),
            "PERIOD 8":      time(15, 25),
            "SCHOOL IS TOMORROW": time(23, 59, 59)
        },
        "remote": {
            "SCHOOL STARTS": time( 8, 25),
            "PASSING TO 1":  time( 8, 35),
            "PERIOD 1":      time( 9, 15),
            "PASSING TO 2":  time( 9, 25),
            "PERIOD 2":      time(10,  5),
            "PASSING TO 3":  time(10, 15),
            "PERIOD 3":      time(10, 55),
            "PASSING TO 4":  time(11,  5),
            "PERIOD 4":      time(11, 45),
            "BREAK & BUS":   time(12,  5),
            "PASSING TO 5":  time(12, 15),
            "PERIOD 5":      time(12, 55),
            "PASSING TO 6":  time(13,  5),
            "PERIOD 6":      time(13, 45),
            "PASSING TO 7":  time(13, 55),
            "PERIOD 7":      time(14, 35),
            "PASSING TO 8":  time(14, 45),
            "PERIOD 8":      time(15, 25),
            "SCHOOL IS TOMORROW": time(23, 59, 59)
        },
        "late_arrival": {
            "SCHOOL STARTS": time(10, 20),
            "PASSING TO 1":  time(10, 30),
            "PERIOD 1":      time(11,  5),
            "PASSING TO 2":  time(11, 10),
            "PERIOD 2":      time(11, 40),
            "PASSING TO 3":  time(11, 45),
            "PERIOD 3":      time(12, 15),
            "PASSING TO 4":  time(12, 20),
            "PERIOD 4":      time(12, 55),
            "PASSING TO 5":  time(13,  0),
            "PERIOD 5":      time(13, 35),
            "PASSING TO 6":  time(13, 40),
            "PERIOD 6":      time(14, 15),
            "PASSING TO 7":  time(14, 20),
            "PERIOD 7":      time(14, 50),
            "PASSING TO 8":  time(14, 55),
            "PERIOD 8":      time(15, 25),
            "SCHOOL IS TOMORROW": time(23, 59, 59)
        }
    },

    "corona": {
        "half": {
            "normal": {
                "SCHOOL STARTS": time( 7, 30),
                "EARLY BIRD":    time( 8, 30),
                "PASSING TO 1A": time( 8, 35),
                "PERIOD 1A":     time( 8, 50),
                "PASSING TO 1B": time( 9,  0),
                "PERIOD 1B":     time( 9, 15),
                "PASSING TO 2A": time( 9, 25),
                "PERIOD 2A":     time( 9, 38),
                "PASSING TO 2B": time( 9, 48),
                "PERIOD 2B":     time(10,  1),
                "PASSING TO 3A": time(10, 11),
                "PERIOD 3A":     time(10, 24),
                "PASSING TO 3B": time(10, 34),
                "PERIOD 3B":     time(10, 47),
                "PASSING TO 4A": time(10, 57),
                "PERIOD 4A":     time(11, 10),
                "PASSING TO 4B": time(11, 20),
                "PERIOD 4B":     time(11, 33),
                "PASSING TO 5A": time(11, 43),
                "PERIOD 5A":     time(11, 56),
                "PASSING TO 5B": time(12,  9),
                "PERIOD 5B":     time(12, 19),
                "PASSING TO 6A": time(12, 29),
                "PERIOD 6A":     time(12, 42),
                "PASSING TO 6B": time(12, 52),
                "PERIOD 6B":     time(13,  5),
                "PASSING TO 7A": time(13, 15),
                "PERIOD 7A":     time(13, 28),
                "PASSING TO 7B": time(13, 38),
                "PERIOD 7B":     time(13, 51),
                "PASSING TO 8A": time(14,  1),
                "PERIOD 8A":     time(14, 14),
                "PASSING TO 8B": time(14, 24),
                "PERIOD 8B":     time(14, 37),
                "SCHOOL IS TOMORROW": time(23, 59, 59),
            },
            "early_dismissal": {
                "SCHOOL STARTS": time( 7, 30),
                "EARLY BIRD":    time( 8, 20),
                "PASSING TO 1A": time( 8, 35),
                "PERIOD 1A":     time( 8, 51),
                "PASSING TO 1B": time( 8, 58),
                "PERIOD 1B":     time( 9, 15),
                "PASSING TO 2A": time( 9, 20),
                "PERIOD 2A":     time( 9, 37),
                "PASSING TO 2B": time( 9, 44),
                "PERIOD 2B":     time(10,  1),
                "PASSING TO 3A": time(10,  6),
                "PERIOD 3A":     time(10, 23),
                "PASSING TO 3B": time(10, 30),
                "PERIOD 3B":     time(10, 47),
                "PASSING TO 4A": time(10, 42),
                "PERIOD 4A":     time(11,  9),
                "PASSING TO 4B": time(11, 16),
                "PERIOD 4B":     time(11, 33),
                "PASSING TO 5A": time(11, 38),
                "PERIOD 5A":     time(11, 55),
                "PASSING TO 5B": time(12,  2),
                "PERIOD 5B":     time(12, 19),
                "PASSING TO 6A": time(12, 24),
                "PERIOD 6A":     time(12, 41),
                "PASSING TO 6B": time(12, 48),
                "PERIOD 6B":     time(13,  5),
                "PASSING TO 7A": time(13, 10),
                "PERIOD 7A":     time(13, 27),
                "PASSING TO 7B": time(13, 34),
                "PERIOD 7B":     time(13, 51),
                "PASSING TO 8A": time(13, 56),
                "PERIOD 8A":     time(14, 13),
                "PASSING TO 8B": time(14, 20),
                "PERIOD 8B":     time(14, 37),
                "SCHOOL IS TOMORROW": time(23, 59, 59),
            }
        },
        "normal": {
            "SCHOOL STARTS": time( 7, 30),
            "EARLY BIRD":    time( 8, 20),
            "PASSING TO 1":  time( 8, 35),
            "PERIOD 1":      time( 9, 16),
            "PASSING TO 2":  time( 9, 31),
            "PERIOD 2":      time(10,  8),
            "PASSING TO 3":  time(10, 23),
            "PERIOD 3":      time(11,  0),
            "PASSING TO 4":  time(11, 15),
            "PERIOD 4":      time(11, 52),
            "PASSING TO 5":  time(12,  7),
            "PERIOD 5":      time(12, 44),
            "PASSING TO 6":  time(12, 59),
            "PERIOD 6":      time(13, 36),
            "PASSING TO 7":  time(13, 51),
            "PERIOD 7":      time(14, 28),
            "PASSING TO 8":  time(14, 43),
            "PERIOD 8":      time(15, 20),
            "SCHOOL IS TOMORROW": time(23, 59, 59)
        },
        "late_arrival": {
            "SCHOOL STARTS": time( 9, 30),
            "EARLY BIRD":    time(10, 25),
            "PASSING TO 1":  time(10, 30),
            "PERIOD 1":      time(11,  5),
            "PASSING TO 2":  time(11, 10),
            "PERIOD 2":      time(11, 40),
            "PASSING TO 3":  time(11, 45),
            "PERIOD 3":      time(12, 15),
            "PASSING TO 4":  time(12, 20),
            "PERIOD 4":      time(12, 55),
            "PASSING TO 5":  time(13,  0),
            "PERIOD 5":      time(13, 35),
            "PASSING TO 6":  time(13, 40),
            "PERIOD 6":      time(14, 15),
            "PASSING TO 7":  time(14, 20),
            "PERIOD 7":      time(14, 50),
            "PASSING TO 8":  time(14, 44),
            "PERIOD 8":      time(15, 25),
            "SCHOOL IS TOMORROW": time(23, 59, 59),
        },
        "early_dismissal": {
            "SCHOOL STARTS": time( 7, 30),
            "EARLY BIRD":    time( 8, 20),
            "PASSING TO 1":  time( 8, 35),
            "PERIOD 1":      time( 9, 15),
            "PASSING TO 2":  time( 9, 25),
            "PERIOD 2":      time(10,  1),
            "PASSING TO 3":  time(10, 11),
            "PERIOD 3":      time(10, 47),
            "PASSING TO 4":  time(10, 57),
            "PERIOD 4":      time(11, 33),
            "PASSING TO 5":  time(11, 43),
            "PERIOD 5":      time(12, 19),
            "PASSING TO 6":  time(12, 29),
            "PERIOD 6":      time(13,  5),
            "PASSING TO 7":  time(13, 15),
            "PERIOD 7":      time(13, 51),
            "PASSING TO 8":  time(14,  1),
            "PERIOD 8":      time(14, 37),
            "SCHOOL IS TOMORROW": time(23, 59, 59),
        },
        "finals": {
            "1": {
                "SCHOOL STARTS": time( 7, 30),
                "EARLY BIRD":    time( 8, 25),
                "PASSING TO 1":  time( 8, 35),
                "PERIOD 1":      time(10,  5),
                "PASSING TO 2":  time(10, 15),
                "PERIOD 2":      time(11, 45),
                "PASSING TO 4":  time(11, 55),
                "PERIOD 4":      time(13, 25),
                "SCHOOL IS TOMORROW": time(23, 59, 59),
            },
            "2": {
                "SCHOOL STARTS": time( 7, 30),
                "EARLY BIRD":    time( 8, 25),
                "PASSING TO 3":  time( 8, 35),
                "PERIOD 3":      time(10,  5),
                "PASSING TO 7":  time(10, 15),
                "PERIOD 7":      time(11, 45),
                "PASSING TO 5":  time(11, 55),
                "PERIOD 5":      time(13, 25),
                "SCHOOL IS TOMORROW": time(23, 59, 59),
            },
            "3": {
                "SCHOOL STARTS": time( 7, 30),
                "EARLY BIRD":    time( 8, 25),
                "PASSING TO 8":  time( 8, 35),
                "PERIOD 8":      time(10,  5),
                "PASSING TO 6":  time(10, 15),
                "PERIOD 6":      time(11, 45),
                "GO TO MAKEUPS": time(11, 55),
                "MAKEUPS":       time(13, 25),
                "SEMESTER IS OVER, GG M8": time(23, 59, 59),
            }
        }
    },

    "custom": {
        "0": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "1": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "2": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "3": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "4": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "5": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "6": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "7": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "8": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "9": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "a": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "b": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "c": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "d": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "e": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
        "f": {
            "START": time(0, 0, 0),
            "END": time(23, 59, 59)
        },
    },
    "free": {
        "winter": {
            "HAPPY HOLIDAYS": time(23, 59, 59)
        },
        "spring": {
            "ENJOY THE OUTSIDE": time(23, 59, 59)
        },
        "thanks": {
            "BE THANKFUL": time(23, 59, 59)
        },
        "off": {
            "ENJOY YOUR DAY OFF": time(23, 59, 59)
        },
        "end": {
            "ENJOY THE WEEKEND": time(23, 59, 59)
        }
    }
}

var buttons = {
    "full_schedules": {
        "Normal": "normal",
        "Late Arrival": "late_arrival",
        "Activity Period": "activity",
        "PM Assembly": "pm_assembly",
        "Early Dismissal": "early_dismissal",
        "Summer School": "summer",
        "Odyssey": "odyssey"
    },
    "half_schedules": {
        "Normal": "half,normal",
        "Activity Period": "half,activity",
        "PM Assembly": "half,pm_assembly",
        "Early Dismissal": "half,early_dismissal"
    },
    "c19_full_schedules": {
        "Normal": "corona,normal",
        "Late Arrival": "corona,late_arrival",
        "Early Dismissal": "corona,early_dismissal"
    },
    "c19_half_schedules": {
        "Normal": "corona,half,normal",
        "Early Dismissal": "corona,half,early_dismissal"
    },
    "custom_schedules": {
        "Custom 0": "custom,0",
        "Custom 1": "custom,1",
        "Custom 2": "custom,2",
        "Custom 3": "custom,3",
        "Custom 4": "custom,4",
        "Custom 5": "custom,5",
        "Custom 6": "custom,6",
        "Custom 7": "custom,7",
        "Custom 8": "custom,8",
        "Custom 9": "custom,9",
        "Custom A": "custom,a",
        "Custom B": "custom,b",
        "Custom C": "custom,c",
        "Custom D": "custom,d",
        "Custom E": "custom,e",
        "Custom F": "custom,f"
    },
    "finals_schedules": {
        "Finals Day 1": "finals,1",
        "Finals Day 2": "finals,2",
        "Finals Day 3": "finals,3"
    },
    "c19_finals_schedules": {
        "Finals Day 1": "corona,finals,1",
        "Finals Day 2": "corona,finals,2",
        "Finals Day 3": "corona,finals,3",
    },
    "hybrid_full_schedules": {
        "Normal": "hybrid,normal",
        "Remote": "hybrid,remote",
        "Late Arrival": "hybrid,late_arrival"
    },
    "hybrid_half_schedules": {
        "Normal": "hybrid,half,normal",
        "Remote": "hybrid,half,remote",
    }
}
        

function get() {
    var d = offset_day()
    var scs = diffTime(d, last_end);
    if(last_time && scs % 10) {
        last_time = scs
        scs %= 60
        if(Number($("#seconds").textContent) > scs) {
            $("#seconds").textContent = zf(scs);
            return;
        }
    }
    if(d.toDateString() != just_now.toDateString())
        window.location.reload()
    var x_i = -1;
    var p_l = 28;
    var now = Number(d);
    for(var x of Object.keys(current_schedule)) {
        x_i += 1;
        if(x.length + 3 > p_l)
            p_l = x.length + 3
        if(current_schedule[x] - now >= 0) {
            period = x;
            var rn = offset_day();
            break;
        }
    }
    var end = current_schedule[period]
    last_end = end
    var scs = diffTime(rn, end);
    var refresh = last_time < scs || scs % 60 == 0
    last_time = scs
    var mns = Math.floor(scs / 60);
    scs %= 60;
    var hrs = Math.floor(mns / 60);
    mns %= 60;
    $("#time").innerHTML = `${(hrs || !full_screen) ? zf(hrs) + ":" : ""}${zf(mns)}:<span id='seconds'>${zf(scs)}</span>`;
    if(full_screen) {
        if(hrs)
            $("#time").style.fontSize = "20vw";
        else
            $("#time").style.fontSize = "26vw";
    }
    if(!refresh)
        return
    
    var endhr = end.getHours();
    var ampm;
    [endhr, ampm] = hr24(endhr)
    if(period == "SCHOOL IS TOMORROW" && !current_schedule_name.startsWith("CUSTOM") && d.getDay() == 5)
        period = "ENJOY THE WEEKEND";
    $("#per").textContent = `${period} // ENDS AT ${endhr}:${zf(end.getMinutes())}${ampm}`;
    var ls = `<b>PERIOD NAME ${"-".repeat(p_l - 9)} START</b><br><div>`;
    var ogls = ls;
    var p_q = p_l + 3 * !ampm;
    for(var x = 0; x < Object.keys(current_schedule).length - 1; x += 1) {
        var per = Object.keys(current_schedule)[x + 1];
        if(per == "SCHOOL IS TOMORROW" && !current_schedule_name.startsWith("CUSTOM") && d.getDay() == 5)
            per = "ENJOY THE WEEKEND";
        var end2 = Object.values(current_schedule)[x];
        var hr = end2.getHours();
        var ampm;
        [hr, ampm] = hr24(hr)
        var line = (per + " ").padEnd(p_q, "-") + " " + `${zf(hr)}:${zf(end2.getMinutes())}${ampm}`;
        if(per == period)
            line = "<b class='glow'><i>" + line + "</i></b>";
        else if(x < x_i)
            line = "<s>" + line + "</s>";
        ls += line + "<br>";
    }
    if(ogls == ls)
        $("#list").innerHTML = (Object.keys(current_schedule)[0] + " ").padEnd(p_l - 5, "-") + " ALL DAY"
    else
        $("#list").innerHTML = ls + "</div>";
}

for(var x = 0; x < 10; x += 1) {
    try {
        thing = undefined;
        eval("thing = " + localStorage.getItem("custom_" + x))
        if(thing && Object.keys(thing).length > 0)
            schedules["custom"][x] = thing;
    } catch(err) {
        console.error(err);
    }
}

function setSchedule(...args) {
    if(!args.length)
        args = eval(localStorage.getItem("current_schedule") + "") || ["normal"]
    console.log(args)
    var thing = schedules;
    var thing2 = schedule_names;
    for(var arg of args) {
        thing = thing[arg];
        thing2 = thing2[arg];
    }
    if(thing == undefined)
        return
    current_args = args;
    current_schedule = thing;
    current_schedule_name = thing2;
    localStorage.setItem("current_schedule", `["${args.join('", "')}"]`)
    /*for(var e of $$(".selected"))
        e.classList.remove("selected")*/
    if(args[0] == "custom") {
        $("#customizer").className = "cc";
        $("#customizer").value = "period name                 | ending time - 24hr or add AM/PM\n"
        for(var key of Object.keys(current_schedule)) {
            val = current_schedule[key];
            sec = val.getSeconds();
            sec = sec ? ":" + zf(sec) : "";
            min = zf(val.getMinutes());
            hr = val.getHours();
            var ampm;
            [hr, ampm] = hr24(hr)
            $("#customizer").value += `${key.padEnd(28)}| ${hr}:${min}${sec}${ampm}\n`;
        }
        $("#customizer").onchange = function() { changer(s); };
        $("#customizer").style.height = "30vw";
        $("#customizer").style.width = "90vw";
        $("#hider").textContent = "Toggle editor";
        $("#hider").style.display = ""
    } else {
        $("#customizer").className = "inv cc";
        $("#customizer").onchange = function(){};
        $("#customizer").value = "";
        $("#customizer").style.height = "0px";
        $("#customizer").style.width = "0px";
        $("#hider").textContent = "";
        $("#hider").style.display = "none"
    }
    //$(`span[onclick="setSchedule('${args.join("', '")}')"]`).classList.add("selected")
    $("#prt").textContent = current_schedule_name;
    last_time = 0;
    get();
    
    $("#sched_chooser").value = args.join(",").replace("half,", "");
    e_ = $("#toggle-half");
    d = schedules;
    for(var thh of args.slice(0, -1).filter(v => v != "half").concat("half").concat(args.slice(-1)[0])) {
        try {
            d = d[thh]
        } catch(err) {
            break;
        }
    }
    if(d) {
        e_.classList.remove("disabled");
        e_.onclick = function() { toggleHalf() }
    } else {
        e_.classList.add("disabled");
        e_.onclick = null;
    }
}

setSchedule();

function toTheSecond() {
    if(Date() == date)
        return window.setTimeout(toTheSecond, 10)
    console.log(window.setInterval(get, 1000));
    get()
}

var date = Date();
toTheSecond();

function color(s) {
    $("#colorswap").value = s;
    document.body.style.color = s;
    var colors = [
        Math.floor(Number.parseInt(s.slice(1, 3), 16) / 7),
        Math.floor(Number.parseInt(s.slice(3, 5), 16) / 7),
        Math.floor(Number.parseInt(s.slice(5, 7), 16) / 7)
    ];
    var c = [
        colors[0] || Math.floor((colors[1] + colors[2]) / 4),
        colors[1] || Math.floor((colors[0] + colors[2]) / 4),
        colors[2] || Math.floor((colors[1] + colors[0]) / 4)
    ]
    var bg_dark = `rgb(${c[0]}, ${c[1]}, ${c[2]}`;
    var bg_light = `rgb(${200 + c[0]}, ${200 + c[1]}, ${200 + c[2]}`;
    var bg = bg_dark;
    var bg_inv = bg_light;
    var bg_des = `rgb(${c[0] + 10}, ${c[1] + 10}, ${c[2] + 10}`;
    if(light_theme) {
        bg = bg_light;
        bg_inv = bg_dark;
        bg_des = `rgb(${190 + c[0]}, ${190 + c[1]}, ${190 + c[2]}`;
        $("#change").innerHTML = "Dark";
    } else {
        $("#change").innerHTML = "Light";
    }
    document.body.style.backgroundColor = bg;
    $("#change").style.color = bg;
    $("#change").style.backgroundColor = bg_inv;
    
    var l = [
        $("#toggle-half").style,
        $("#sched_chooser").style,
        $("#cat_chooser").style,
        $("#hider").style,
        $("#toggle-hour").style,
        $("#fuller").style
    ]
    for(var style of l) {
        style.backgroundColor = bg_des;
        style.color = s;
    }
    
    $("#customizer").style.backgroundColor = bg_des;
    
    $("#colorswap").style.backgroundColor = bg_des;
    $("#colorswap").style.borderColor = bg_des;
    
    $("hr").style.borderColor = s;
    localStorage.setItem("current_color", s);
}

function toggleTheme() {
    light_theme = !light_theme
    localStorage.setItem("light_theme", Number(light_theme))
    color(localStorage.getItem("current_color"));
}

color(localStorage.getItem("current_color") || "#00ffff");

function hideScheds(except) {
    /*var elements = [
        "full_schedules",
        "half_schedules",
        "c19_full_schedules",
        "c19_half_schedules",
        "custom_schedules",
        "finals_schedules",
        "c19_finals_schedules"
    ]*/
    $("#cat_chooser").value = except.replace("half_", "full_");
    /*for(var e of elements)
        $("#" + e).classList.add("inv");
    if(except)
        $("#" + except).classList.remove("inv");*/
}

function changeThing(elem) {
    var l = $("#sched_chooser").options;
    try {
        var h = l[l.selectedIndex].innerHTML;
    } catch(err) {
        var h = "";
    }
    for(var e of $$("option", $("#sched_chooser")))
        e.remove();
    var s = "";
    for(var e of Object.keys(buttons[elem.value])) {
        var opt = document.createElement("option");
        opt.value = buttons[elem.value][e];
        opt.innerHTML = e
        if(e == h)
            s = opt.value
        $("#sched_chooser").add(opt);
    }
    $("#sched_chooser").value = s;
    if(s)
        setSchedule(...s.split(","));
    custom_schedule = elem.value.includes("custom");
    finals_schedule = elem.value.includes("final");
    hybrid_schedule = elem.value.startsWith("hybrid");
    elearn_schedule = elem.value.startsWith("c19");
    localStorage.setItem("corona_enabled", Number(elearn_schedule));
    localStorage.setItem("finals_enabled", Number(finals_schedule));
    localStorage.setItem("custom_enabled", Number(custom_schedule));
    localStorage.setItem("hybrid_enabled", Number(hybrid_schedule));
    e_ = $("#toggle-half");
    if(elem.value.includes("full_schedules") || elem.value.includes("half_schedules")) {
        e_.classList.remove("disabled");
        e_.onclick = function() { toggleHalf() }
        toggleHalf();
        toggleHalf();
    } else {
        e_.classList.add("disabled");
        e_.onclick = null;
    }
}

function toggleHalf() {
    half_period = !half_period
    if(finals_schedule || custom_schedule)
        return
    sched_ls = [];
    if(half_period) {
        sched = "half_schedules";
        sched_ls.push("half");
        $("#toggle-half").textContent = "Full periods"
    } else {
        sched = "full_schedules";
        $("#toggle-half").textContent = "Half periods"
    }
    if(elearn_schedule) {
        sched = "c19_" + sched
        sched_ls = ["corona", ...sched_ls];
    } else if(hybrid_schedule) {
        sched = "hybrid_" + sched
        sched_ls = ["hybrid", ...sched_ls];
    }
    sched_ls.push(current_args.slice(-1)[0])
    setSchedule(...sched_ls);
    localStorage.setItem("half_enabled", Number(half_period));
    hideScheds(sched);
}

/*function toggleELearning() {
    elearn_schedule = !elearn_schedule
    if(custom_schedule)
        return
    sched_ls = [];
    if(finals_schedule) {
        sched = "finals_schedules";
        sched_ls.push("finals");
    } else if(half_period) {
        sched = "half_schedules";
        sched_ls.push("half");
    } else {
        sched = "full_schedules";
    }
    if(elearn_schedule) {
        sched = "c19_" + sched
        sched_ls = ["corona", ...sched_ls];
        $("#toggle-corona").textContent = "[IRL LEARNING]"
    } else {
        $("#toggle-corona").textContent = "[E-LEARNING]"
    }
    sched_ls.push(current_args.slice(-1)[0])
    setSchedule(...sched_ls)
    localStorage.setItem("corona_enabled", Number(elearn_schedule));
    hideScheds(sched);
}

function toggleFinals() {
    finals_schedule = !finals_schedule
    hideScheds();
    $("#toggle-half").classList.toggle("inv", finals_schedule);
    if(finals_schedule) {
        $("#toggle-final").textContent = "[NON-FINALS]"
        $(elearn_schedule ? "#c19_finals_schedules" : "#finals_schedules").classList.remove("inv");
    } else {
        $("#toggle-final").textContent = "[FINALS]"
        toggleHalf();
        toggleHalf();
    }
    localStorage.setItem("finals_enabled", Number(finals_schedule));
}

function toggleCustom() {
    custom_schedule = !custom_schedule
    hideScheds();
    $("#toggle-half").classList.toggle("inv", custom_schedule);
    $("#toggle-final").classList.toggle("inv", custom_schedule);
    $("#toggle-corona").classList.toggle("inv", custom_schedule);
    if(custom_schedule) {
        $("#toggle-custom").textContent = "[PRESET]"
        $("#custom_schedules").classList.remove("inv");
    } else {
        $("#toggle-custom").textContent = "[CUSTOM]"
        toggleHalf();
        toggleHalf();
    }
    localStorage.setItem("custom_enabled", Number(custom_schedule));
}*/

function toggleHour() {
    hr12 = !hr12
    localStorage.setItem("12hour", Number(hr12))
    $("#toggle-hour").textContent = `${hr12 ? 24 : 12}hr`
    setSchedule();
    last_time = 0;
    get();
}

function fullScreen() {
    full_screen = $("#main").classList.toggle("fullscreen");
    $("#prt").classList.toggle("inv");
    $("#buttons").classList.toggle("inv");
    $("#options").classList.toggle("inv");
    $("#list").classList.toggle("inv");
    $("#bar").classList.toggle("bottom");
    $("#customizer").classList.toggle("mustinv");
    localStorage.setItem("full_screen", Number(full_screen));
    $("#time").style.fontSize = full_screen ? "20vw" : "18vw";
    last_time = 0;
    get();
}

function customSchedule(text) {
    var dic = {}
    var st = "{"
    var lines = [];
    for(var line of text.split("\n"))
        lines.push(...line.split(";;;"));
    for(var line of lines) {
        if(line.search(/.+(\||\\\\) *\d{1,2}:\d{2}(:\d{2})?( *(am|pm))?/) > -1) {
            var sp = line.includes("|") ? "|" : "\\\\"
            var per = line.split(sp)[0].trim()
            console.log(line.split(sp))
            var tm = line.split(sp)[1].trim()
            var hr = Number(tm.split(":")[0])
            var min = Number(tm.split(":")[1].slice(0, 2))
            try {
                if(Number(tm.split(":")[2].slice(0, 2)))
                    var sec = Number(tm.split(":")[2].slice(0, 2));
                else
                    var sec = 0
            } catch(err) {
                var sec = 0
            }
            if(line.trim().toLowerCase().endsWith("pm") && hr < 12)
                hr += 12
            st += `"${per}": time(${hr}, ${min}, ${sec}),`
            dic[per] = time(hr, min, sec)
        }
    }
    st += "}"
    if(st != "{}") {
        console.log(st)
        localStorage.setItem("custom_" + current_schedule_name.split(" ").slice(-1)[0], st)
        current_schedule = dic;
        last_time = 0;
        get();
    }
}
            
function scrollMaxY_() {
    if(window.scrollMaxY != undefined)
        return window.scrollMaxY;
    return document.documentElement.scrollHeight - document.documentElement.clientHeight;
}

function drawerThing(evt, elem) {
    if(evt.target != $("#drawer summary"))
        return;
    elem.classList.remove("drawer_bottom")
    localStorage.setItem('drawer_open', Number(!elem.open))
    window.setTimeout(() => {
        if(!scrollMaxY_())
            elem.classList.add("drawer_bottom");
    }, 50 * /safari/i.test(navigator.userAgent) || 1);
}

function diffTime(a, b = new Date(0)) {
    return Math.round((Math.abs(a - b) / 1000), 0);
}

function zf(itm) {
    return String(itm).padStart(2, "0");
}

function hr24(hr) {
    if(hr12) {
        if(hr >= 12) {
            if(hr > 12)
                hr -= 12;
            var ampm = " PM"
        } else {
            var ampm = " AM"
        }
    } else {
        var ampm = ""
    }
    return [hr, ampm]
}

if(Number(localStorage.getItem("half_enabled")))
    toggleHalf();

if(Number(localStorage.getItem("custom_enabled"))) {
    var st = "custom_schedules"
} else {
    var st = "full_schedules"
    if(Number(localStorage.getItem("finals_enabled")))
        st = "finals_schedules"
    if(Number(localStorage.getItem("corona_enabled")))
        st = "c19_" + st
    else if(Number(localStorage.getItem("hybrid_enabled")))
        st = "hybrid_" + st
}

$("#cat_chooser").value = st;
changeThing($("#cat_chooser"));

if(Number(localStorage.getItem("full_screen")))
    fullScreen();
if(Number(localStorage.getItem("12hour")))
    toggleHour();
n = Number(localStorage.getItem('drawer_open'))
if(!isNaN(n))
    $("#drawer").open = n;

$("#drawer").classList.toggle("drawer_bottom", !scrollMaxY_())

window.onresize = () => {
    $("#drawer").classList.remove("drawer_bottom")
    if(!scrollMaxY_())
        $("#drawer").classList.add("drawer_bottom")
}

function calendar(text) {
    // console.log(text)
    //console.log(tt)
    var scheded = [];
    if(elearn_schedule)
        scheded.push("corona");
    if(hybrid_schedule)
        scheded.push("hybrid");
    if(half_period)
        scheded.push("half");
    scheded.push("normal")
    var changed = false;
    var in_summer = false;
    //console.log(text.split(/BEGIN\:VEVENT\n/g))
    for(var evt of text.split(/BEGIN\:VEVENT\r?\n/g).slice(1)) {
        //console.log(evt)
        var day = evt.split("DTSTART")[1].split("\n")[0].split(":").slice(-1)[0].split("T")[0].trim();
        var summary = evt.split("SUMMARY:")[1].split("\n")[0].trim();
        if(/Summer School (Session \d )?Begins/i.test(summary))
            in_summer = true;
        else if(/Summer School (Session \d )?Ends/i.test(summary))
            in_summer = false;
        //console.log(day, tt, day == tt)//, "\n", evt)
        if(day != tt)
            continue;
        //console.log(evt)
        //console.log(summary)
        var thing = [];
        var one = [];
        var skip = false;
        if(elearn_schedule) {
            one.push("corona");
            thing.push("corona");
        } else if(hybrid_schedule) {
            one.push("hybrid");
            thing.push("hybrid");
        }
        if(half_period)
            thing.push("half");
        switch(summary.toLowerCase()) {
            case "spring break":
                thing = ["free", "spring"];
                break;
            case "activity period":
                thing.push("activity");
                break;
            case "early dismissal":
                thing.push("early_dismissal");
                break;
            case "no school - thanksgiving break":
                thing = ["free", "thanks"];
                break;
            case "late arrival":
                one.push("late_arrival");
                thing = one;
                break;
            case "winter break":
                thing = ["free", "winter"];
                break;
            case "non-attendance day":
            case "non attendance day":
                thing = ["free", "off"];
                break;
            default:
                if(/exams - day \d$/i.test(summary)) {
                    one.push("finals", summary.slice(-1)[0]);
                    thing = one;
                } else if(/(no school|non[- ]attendance)/i.test(summary)) {
                    thing = ["free", "off"];
                } else if(/late arrival/i.test(summary)) {
                    one.push("late_arrival");
                    thing = one;
                } else if(in_summer) {
                    thing = ["summer"];
                } else {
                    skip = true
                }
        }
        if(!skip) {
            if(thing[0] == "free") {
                var c = schedules
                var n = schedule_names
                for(var t of thing) {
                    c = c[t]
                    n = n[t]
                }
                current_schedule = c
                current_schedule_name = n
                $("#prt").textContent = current_schedule_name;
                get();
            } else {
                setSchedule(...thing)
            }
            changed = true
        }
    }
    if(!changed && !current_args.includes("custom"))
        setSchedule(...scheded)
    $("#prt2").style.display = "none"
}

var tt = just_now.getFullYear() + "" + zf(just_now.getMonth() + 1) + zf(just_now.getDate())
if(just_now.getDay() == 6 || just_now.getDay() == 0) {
    current_schedule = schedules["free"]["end"]
    current_schedule_name = schedule_names["free"]["end"]
    $("#prt").textContent = current_schedule_name;
    get();
    $("#prt2").style.display = "none"
} else if(localStorage.getItem("calendar_load") == tt) {
    calendar(localStorage.getItem("calendar_text"))
} else {
    fetch("https://cors-container.herokuapp.com/https://www.d125.org/cf_calendar/feed.cfm?type=ical&feedID=AF5167036E214C99B84D252995DB9199").then((resp) => {
        console.log("found calendar")
        resp.text().then((text) => {
            localStorage.setItem("calendar_load", tt)
            localStorage.setItem("calendar_text", text)
            calendar(text)
        });
    });
}

window.onfocus = () => { last_time = 0; get(); }
window.onclick = () => { last_time = 0; get(); }
