function $(...a) {
    return document.querySelector(...a);
} function $$(...a) {
    return document.querySelectorAll(...a);
}
$("#time").textContent = "-~-"

function time(hr = 0, mn = 0, sc = 0) {
    var now = new Date();
    now.setHours(hr);
    now.setMinutes(mn);
    now.setSeconds(sc);
    return now;
}

var custom_schedule = false;
var elearn_schedule = false;
var finals_schedule = false;
var hr12 = false;
var half_period = false;
var light_theme = Number(localStorage.getItem("light_theme") || 0);
var last_time = 0;
var just_now = new Date()

var schedule_names = {
    "normal": "NORMAL SCHEDULE",
    "late_arrival": "LATE ARRIVAL SCHEDULE",
    "activity": "ACTIVITY PERIOD SCHEDULE",
    "pm_assembly": "PM ASSEMBLY SCHEDULE",
    "early_dismissal": "EARLY DISMISSAL SCHEDULE",
    "odyssey": "ODYSSEY SCHEDULE",
    "summer_school": "SUMMER SCHEDULE - KINDA USELESS",
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
        "9": "CUSTOM SCHEDULE 9"
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
        "ODYSSEY/SCHOOL IS TOMORROW": time(23, 59, 59),
    },
    "summer": {
        "SCHOOL STARTS": time( 7, 40),
        "GO TO CLASS":   time( 7, 45),
        "SUMMER SCHOOL": time(12, 59),
        "SCHOOL IS TMO": time(23, 59, 59),
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
        }
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

function get() {
    if($("#seconds")) {
        n = $("#seconds").textContent
        n -= 1
        $("#seconds").textContent = n
        if(n % 5)
            return
    }
    var now = Date.now()
    var d = new Date()
    if(d.getMonth() != just_now.getMonth() || d.getDate() != just_now.getDate() ||
       d.getYear() != just_now.getYear() || d.getDay() != just_now.getDay())
        window.location.reload()
    for(var x of Object.keys(current_schedule)) {
        var per = x;
        var end = current_schedule[x];
        if(end - now >= 0) {
            var period = per;
            var rn = new Date();
            break;
        }
    }
    var scs = diffTime(rn, end);
    var refresh = last_time < scs
    last_time = scs
    var mns = Math.floor(scs / 60);
    scs %= 60;
    var hrs = Math.floor(mns / 60);
    mns %= 60;
    $("#time").innerHTML = `${zf(hrs)}:${zf(mns)}:<span id='seconds'>${zf(scs)}</span>`;

    if(refresh) {
        var endhr = end.getHours();
        if(hr12) {
            if(endhr > 12) {
                endhr -= 12;
                var ampm = " PM"
            } else if(endhr == 12) {
                var ampm = " PM"
            } else {
                var ampm = " AM"
            }
        } else {
            var ampm = ""
        }
        $("#per").textContent = `${period} // ENDS AT ${endhr}:${zf(end.getMinutes())}${ampm}`;
        if(period == "SCHOOL IS TOMORROW" && !current_schedule_name.startsWith("CUSTOM") && d.getDay() == 5)
            period = "ENJOY THE WEEKEND";
        if(hr12)
            var ls = "<b><u>PERIOD NAME ------------------- START</u></b><br><div>";
        else
            var ls = "<b><u>PERIOD NAME ---------------- START</u></b><br>";
        var ogls = ls;
        for(var x = 0; x < Object.keys(current_schedule).length - 1; x += 1) {
            var per = Object.keys(current_schedule)[x + 1];
            if(per == "SCHOOL IS TOMORROW" && !current_schedule_name.startsWith("CUSTOM") && d.getDay() == 5)
                per = "ENJOY THE WEEKEND";
            var end2 = Object.values(current_schedule)[x];
            var line = per + " ";
            line = line.padEnd(28, "-") + " ";
            var hr = end2.getHours()
            if(hr12) {
                if(hr > 12) {
                    hr -= 12
                    ampm = " PM"
                } else if(endhr == 12) {
                    var ampm = " PM"
                } else {
                    ampm = " AM"
                }
            } else {
                ampm = ""
            }

            line += `${zf(hr)}:${zf(end2.getMinutes())}${ampm}`;
            if(per == period)
                line = "<b class='glow'><i>" + line + "</i></b>"
            else if(end2 - now < 0)
                line = "<s>" + line + "</s>";
            ls += line + "<br>";
        }
        if(ogls == ls)
            $("#list").innerHTML = (Object.keys(current_schedule)[0] + " ").padEnd(28, "-") + " ALL DAY"
        else
            $("#list").innerHTML = ls + "</div>";
    }
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
    console.log(args)
    thing = schedules;
    thing2 = schedule_names;
    for(var arg of args) {
        thing = thing[arg]
        thing2 = thing2[arg];
    }
    if(thing == undefined)
        return
    current_schedule = thing;
    current_schedule_name = thing2;
    localStorage.setItem("current_schedule", `["${args.join('", "')}"]`)
     while($(".selected"))
        $(".selected").classList.remove("selected")
    if(args[0] == "custom") {
        $("#customizer").className = "cc";
        $("#customizer").value = "period name                 | ending time - 24hr or add AM/PM\n"
        for(var key of Object.keys(current_schedule)) {
            val = current_schedule[key];
            sec = val.getSeconds();
            if(sec)
                sec = ":" + (sec + "").padStart(2, "0")
            else
                sec = ""
            min = (val.getMinutes() + "").padStart(2, "0");
            hr = val.getHours();
            if(hr12) {
                if(hr > 12) {
                    hr -= 12;
                    ampm = " pm"
                } else {
                    ampm = " am"
                }
            } else {
                ampm = ""
            }
            $("#customizer").value +=
                `${key.padEnd(28)}| ${hr}:${min}${sec}${ampm}\n`;
        }
        $("#customizer").onchange = function() { changer(s); };
        $("#customizer").style.height = "30vw";
        $("#customizer").style.width = "90vw";
        $("#hider").textContent = "[TOGGLE CUSTOM SCHEDULE EDITOR]";
    } else {
        $("#customizer").className = "inv cc";
        $("#customizer").onchange = function(){};
        $("#customizer").value = "";
        $("#customizer").style.height = "0px";
        $("#customizer").style.width = "0px";
        $("#hider").textContent = " ";
    }
    $(`span[onclick="setSchedule('${args.join("', '")}')"]`).classList.add("selected")
    $("#prt").textContent = current_schedule_name;
    last_time = 0;
    get();
}

setSchedule(...eval(localStorage.getItem("current_schedule") + "") || ["normal"])

var date = Date()

function toTheSecond() {
    if(Date() == date)
        return window.setTimeout(toTheSecond, 10)
    console.log(window.setInterval(get, 1000));
    get()
}

toTheSecond();

function color(s) {
    $("#colorswap").value = s;
    document.body.style.color = s;
    var colors = [
        Math.floor(Number.parseInt(s.slice(1, 3), 16) / 7),
        Math.floor(Number.parseInt(s.slice(3, 5), 16) / 7),
        Math.floor(Number.parseInt(s.slice(5, 7), 16) / 7)
    ];
    var c = [0, 0, 0]
    if(colors[0] == 0)
        c[0] = Math.floor((colors[1] + colors[2]) / 4);
    else
        c[0] = colors[0];
    if(colors[1] == 0)
        c[1] = Math.floor((colors[0] + colors[2]) / 4);
    else
        c[1] = colors[1];
    if(colors[2] == 0)
        c[2] = Math.floor((colors[1] + colors[0]) / 4);
    else
        c[2] = colors[2];
    var bg_dark = `rgb(${c[0]}, ${c[1]}, ${c[2]}`;
    var bg_light = `rgb(${200 + c[0]}, ${200 + c[1]}, ${200 + c[2]}`;
    var bg = bg_dark;
    var bg_inv = bg_light;
    var bg_des = `rgb(${c[0] + 10}, ${c[1] + 10}, ${c[2] + 10}`;
    if(light_theme) {
        bg = bg_light;
        bg_inv = bg_dark;
        bg_des = `rgb(${190 + c[0]}, ${190 + c[1]}, ${190 + c[2]}`;
        $("#change").innerHTML = "[DARK THEME]"
    } else {
        $("#change").innerHTML = "[LIGHT THEME]"
    }
    document.body.style.backgroundColor = bg;
    $("#change").style.color = bg_inv;
    $("#customizer").style.backgroundColor = bg_des
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
    var elements = [
        "full_schedules",
        "half_schedules",
        "c19_full_schedules",
        "c19_half_schedules",
        "custom_schedules",
        "finals_schedules",
        "c19_finals_schedules"
    ]
    for(var e of elements)
        $("#" + e).classList.add("inv")
    if(except)
        $("#" + except).classList.remove("inv");
}

function toggleHalf() {
    half_period = !half_period
    if(finals_schedule || custom_schedule)
        return
    sched_ls = [];
    if(half_period) {
        sched = "half_schedules";
        sched_ls.push("half");
        $("#toggle-half").textContent = "[FULL PERIODS]"
    } else {
        sched = "full_schedules";
        $("#toggle-half").textContent = "[HALF PERIODS]"
    }
    if(elearn_schedule) {
        sched = "c19_" + sched
        sched_ls = ["corona", ...sched_ls];
    }
    sched_ls.push(eval(localStorage.getItem("current_schedule") + "").slice(-1)[0])
    setSchedule(...sched_ls)
    localStorage.setItem("half_enabled", Number(half_period));
    hideScheds(sched);
}

function toggleELearning() {
    elearn_schedule = !elearn_schedule
    if(custom_schedule)
        return
    sched_ls = [];
    if(half_period && !finals_schedule) {
        sched = "half_schedules";
        sched_ls.push("half");
    } else if(finals_schedule) {
        sched = "finals_schedules";
        sched_ls.push("finals");
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
    sched_ls.push(eval(localStorage.getItem("current_schedule") + "").slice(-1)[0])
    setSchedule(...sched_ls)
    localStorage.setItem("corona_enabled", Number(elearn_schedule));
    hideScheds(sched);
}

function toggleFinals() {
    finals_schedule = !finals_schedule
    hideScheds();
    if(finals_schedule) {
        $("#toggle-final").textContent = "[NON-FINALS]"
        if(elearn_schedule)
            $("#c19_finals_schedules").classList.remove("inv");
        else
            $("#finals_schedules").classList.remove("inv");
        $("#toggle-half").classList.add("inv");
    } else {
        $("#toggle-final").textContent = "[FINALS]"
        $("#toggle-half").classList.remove("inv");
        toggleHalf();
        toggleHalf();
    }
    localStorage.setItem("finals_enabled", Number(finals_schedule));
}

function toggleCustom() {
    custom_schedule = !custom_schedule
    hideScheds();
    if(custom_schedule) {
        $("#toggle-custom").textContent = "[PRESET]"
        $("#custom_schedules").classList.remove("inv");
        $("#toggle-half").classList.add("inv");
        $("#toggle-final").classList.add("inv");
        $("#toggle-corona").classList.add("inv");
    } else {
        $("#toggle-custom").textContent = "[CUSTOM]"
        $("#toggle-half").classList.remove("inv");
        $("#toggle-final").classList.remove("inv");
        $("#toggle-corona").classList.remove("inv");
        toggleHalf();
        toggleHalf();
    }
    localStorage.setItem("custom_enabled", Number(custom_schedule));
}

function toggleHour() {
    hr12 = !hr12
    localStorage.setItem("12hour", Number(hr12))
    if(hr12)
        $("#toggle-hour").textContent = "[24 HOUR]"
    else
        $("#toggle-hour").textContent = "[12 HOUR]"
    setSchedule(...eval(localStorage.getItem("current_schedule") + ""))
    last_time = 0;
    get();
}

full_screen = false

function fullScreen() {
    full_screen = $("#main").classList.toggle("fullscreen");
    $("#prt").classList.toggle("inv");
    $("#buttons").classList.toggle("inv");
    $("#options").classList.toggle("inv");
    $("#list").classList.toggle("inv");
    $("#bar").classList.toggle("bottom");
    $("#customizer").classList.toggle("mustinv");
    localStorage.setItem("full_screen", Number(full_screen));
    if(full_screen)
        $("#time").style.fontSize = "20vw";
    else
        $("#time").style.fontSize = "18vw";
}

window.onresize = () => {
    $("#drawer").classList.remove("drawer_bottom")
    if(!window.scrollMaxY) {
        $("#drawer").classList.add("drawer_bottom")
    }
}

function customSchedule(text) {
    var dic = {}
    var st = "{"
    for(var line of text.split("\n")) {
        if(line.search(/.+\| *\d{1,2}:\d{2}(:\d{2})?( *(am|pm))?/) > -1) {
            var per = line.split("|")[0].trim()
            console.log(line.split("|"))
            var tm = line.split("|")[1].trim()
            var hr = Number(tm.split(":")[0])
            var min = Number(tm.split(":")[1].slice(0, 2))
            try {
                if(Number(tm.split(":")[2].slice(0, 2)))
                    var sec = Number(tm.split(":")[2])
                else
                    var sec = 0
            } catch(err) {
                var sec = 0
            }
            if(line.trim().toLowerCase().endsWith("pm"))
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

function drawerThing(elem) {
    localStorage.setItem('drawer_open', Number(!elem.open))
    elem.classList.remove("drawer_bottom")
    window.setTimeout(() => {
        if(!window.scrollMaxY)
            elem.classList.add("drawer_bottom");
    }, 1);
}


function diff(t1) {
    return new Date(Date.now() - t1);
}

function diffTime(a, b = new Date(0)) {
    return Math.round((Math.abs(a - b) / 1000), 0);
}

function zf(itm) {
    return String(itm).padStart(2, "0");
}

function apply_storage() {
    if(Number(localStorage.getItem("half_enabled")))
        toggleHalf();
    if(Number(localStorage.getItem("corona_enabled")))
        toggleELearning();
    if(Number(localStorage.getItem("finals_enabled")))
        toggleFinals();
    if(Number(localStorage.getItem("custom_enabled")))
        toggleCustom();
    if(Number(localStorage.getItem("full_screen")))
        fullScreen();
    if(Number(localStorage.getItem("12hour")))
        toggleHour();
    n = Number(localStorage.getItem('drawer_open'))
    if(!isNaN(n))
        $("#drawer").open = n
}

apply_storage()


if(just_now.getDay() == 6 || just_now.getDay() == 0) {
    current_schedule = schedules["free"]["end"]
    current_schedule_name = schedule_names["free"]["end"]
    $("#prt").textContent = current_schedule_name;
    get();
} else {
    fetch("https://cors-anywhere.herokuapp.com/https://www.d125.org/cf_calendar/feed.cfm?type=ical&feedID=AF5167036E214C99B84D252995DB9199").then((resp) => {
        console.log("found calendar")
        resp.text().then((text) => {
            // console.log(text)
            var tt = just_now.getFullYear() + "" + (just_now.getMonth() + 1 + "").padStart(2, "0") + (just_now.getDate() + "").padStart(2, "0")
            //console.log(tt)
            //console.log(text.split(/BEGIN\:VEVENT\n/g))
            for(var evt of text.split(/BEGIN\:VEVENT\r?\n/g).slice(1)) {
                //console.log(evt)
                var day = evt.split("DTSTART")[1].split("\n")[0].split(":").slice(-1)[0].split("T")[0].trim();
                console.log(day, tt, day == tt)//, "\n", evt)
                if(day != tt)
                    continue
                console.log(evt)
                summary = evt.split("SUMMARY:")[1].split("\n")[0].trim();
                console.log(summary)
                thing = []
                one = []
                var skip = false
                if(elearn_schedule) {
                    one.push("corona")
                    thing.push("corona")
                }
                if(half_period)
                    thing.push("half")
                switch(summary) {
                    case "Spring Break":
                        thing = ["free", "spring"];
                        break;
                    case "Activity Period":
                        thing.push("activity");
                        break;
                    case "Early Dismissal":
                        thing.push("early_dismissal");
                        break;
                    case "No School - Thanksgiving Break":
                        thing = ["free", "thanks"];
                        break;
                    case "Late Arrival":
                        one.push("late_arrival")
                        thing = one
                        break;
                    case "Winter Break":
                        thing = ["free", "winter"]
                        break;
                    case "Non-Attendance Day":
                        thing = ["free", "off"]
                        break;
                    default:
                        if(/Exams - Day \d$/i.test(summary)) {
                            one.push("finals", summary.slice(-1)[0])
                            thing = one
                        } else if(summary.startsWith("No School")) {
                            thing = ["free", "off"]
                        } else if(summary.startsWith("Late Arrival")) {
                            one.push("late_arrival")
                            thing = one
                        } else {
                            skip = true
                        }
                }
                if(!skip) {
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
                }
            }
        });
    });
}

if(window.scrollMaxY) {
    $("#drawer").classList.remove("drawer_bottom")
} else {
    $("#drawer").classList.add("drawer_bottom")
}
