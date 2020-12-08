// Go to august of th

dic = {}
in_summer = false

function next_cal(x = 0) {
    for(var evt of document.querySelectorAll("a.fsCalendarEventTitle.fsCalendarEventLink")) {
        var t = evt.parentElement.parentElement.children[0].dataset;
        var d = t.year + "/" + t.month + "/" + t.day;
        elem = evt.previousElementSibling;
        if(elem) {
            switch(elem.title) {
                case "Late Arrival":
                    dic[d] = ["late_arrival"];
                    break;
                case "Early Dismissal":
                    dic[d] = ["early_dismissal"];
                    break;
                case "Summer School":
                    in_summer = evt.textContent.includes("Begins")
                    dic[d] = ["summer"];
                    break;
                case "Non-Attendance Days":
                    if(evt.textContent == "Spring Break")
                        dic[d] = ["free", "spring"];
                    else
                        dic[d] = ["free", "off"];
                    break;
                case "Testing Day":
                    if("123".includes(evt.textContent.slice(-1)))
                        dic[d] = ["finals", evt.textContent.slice(-1)[0]];
                    break;
                case "Clubs and Activities":
                    if(evt.textContent.includes("Activity Period"))
                        dic[d] = ["activity"];
                    break;
            }
            if(in_summer)
                dic[d] = ["summer"];
        } else {
            switch(evt.textContent) {
                case "Winter Break":
                    dic[d] = ["free", "winter"];
                    break;
                default:
                    if(in_summer)
                        dic[d] = ["summer"];
            }
        }
    }
    document.querySelector("button.fsCalendarNextMonth.fsRightArrow.ae-button").click();
    if(x < 12)
        window.setTimeout(next_cal, 5000, x + 1)
    else
        console.log(JSON.stringify(dic, null, 4));
}
next_cal()
