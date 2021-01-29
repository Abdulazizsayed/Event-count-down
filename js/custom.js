let form = document.querySelector('.event-creator');
let eventsList = document.querySelector('.events-list');
let eventsCounter = 0;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let title = this['title'].value;
    let date = this['date'].value;
    let time = this['time'].value;

    if (!title || !date || !time) {
        alert("Enter data to begin coutdown");
    } else {
        eventsCounter++;
        eventsList.innerHTML += `
        <li>
            <span class="title${eventsCounter}"></span>: <span class="days${eventsCounter}"></span>:<span class="hours${eventsCounter}"></span>:<span class="mins${eventsCounter}"></span>:<span class="secs${eventsCounter}"></span>
        </li>
        `;

        let daysHolder  = document.querySelector('.days' + eventsCounter);
        let hoursHolder = document.querySelector('.hours' + eventsCounter);
        let minsHolder  = document.querySelector('.mins' + eventsCounter);
        let secsHolder  = document.querySelector('.secs' + eventsCounter);
        let titleHolder = document.querySelector('.title' + eventsCounter);

        console.log(daysHolder);

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
    }
    
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