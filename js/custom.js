let form = document.querySelector('.event-creator');
let daysHolder = document.querySelector('.days');
let hoursHolder = document.querySelector('.hours');
let minsHolder = document.querySelector('.mins');
let secsHolder = document.querySelector('.secs');
let titleHolder = document.querySelector('.title');

console.log(titleHolder);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let title = this['title'].value;
    let date = this['date'].value;
    let time = this['time'].value;

    console.log(title);
    daysHolder.innerText = "0";
    hoursHolder.innerText = "0";
    minsHolder.innerText = "0";
    secsHolder.innerText = "0";
    titleHolder.innerText = title;

    let datetime = new Date(date + ' ' + time);
    let now = new Date();
    let dateDiff = (datetime - now) / 1000;

    // Days
    let days = Math.floor(dateDiff / 86400);
    dateDiff -= days * 86400;

    // Hours
    let hours = Math.floor(dateDiff / 3600);
    dateDiff -= hours * 3600;

    // Mins
    let mins = Math.floor(dateDiff / 60);
    dateDiff -= mins * 60;

    // Secs
    let secs = Math.floor(dateDiff);

    // console.log(days, hours, mins, secs);

    let it = nextSec(days, hours, mins, secs);

    let sec = it.next();
    
    let intervalId = setInterval( function () { 
        console.log(sec);
        if (sec.done) {
            alert("Event is now!");
            clearInterval(intervalId);
            return;
        }
        
        daysHolder.innerText = sec.value.days;
        hoursHolder.innerText = sec.value.hours;
        minsHolder.innerText = sec.value.mins;
        secsHolder.innerText = sec.value.secs;

        sec = it.next();
    }, 1000, sec, it, days, hours, mins, secs);

    // while (!sec.done) {
        
    //     sec = it.next();
    // }
    
    // for (const second of it) {
    //     console.log(second);
    // }
});

function* nextSec (days, hours, mins, secs) {
    while (true) {
        if (secs == 0) {
            secs = 59;
            if (mins == 0) {
                mins = 59;
                if (hours == 0) {
                    hours = 23;
                    if (days == 0) {
                        break;
                    } else {
                        days--;
                    }
                } else {
                    hours--;
                }
            } else {
                mins--;
            }
        } else {
            secs--;
        }
        yield {days, hours, mins, secs};
    }
}