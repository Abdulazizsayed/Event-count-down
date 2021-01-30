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
        // eventsList.innerHTML += `
        // <li>
        //     <span class="title${eventsCounter}"></span>: <span class="days${eventsCounter}"></span>:<span class="hours${eventsCounter}"></span>:<span class="mins${eventsCounter}"></span>:<span class="secs${eventsCounter}"></span>
        // </li>
        // `;
        eventsList.insertAdjacentHTML('beforeend', `<li><span class="title${eventsCounter}"></span>: <span class="days${eventsCounter}"></span>:<span class="hours${eventsCounter}"></span>:<span class="mins${eventsCounter}"></span>:<span class="secs${eventsCounter}"></span></li>`);

        let daysHolder  = document.querySelector('.days' + eventsCounter);
        let hoursHolder = document.querySelector('.hours' + eventsCounter);
        let minsHolder  = document.querySelector('.mins' + eventsCounter);
        let secsHolder  = document.querySelector('.secs' + eventsCounter);
        let titleHolder = document.querySelector('.title' + eventsCounter);

        
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
        
        daysHolder.innerText = days;
        hoursHolder.innerText = hours;
        minsHolder.innerText = mins;
        secsHolder.innerText = secs;
        titleHolder.innerText = title;
    
        let it = nextSec(days, hours, mins, secs);
    
        let sec = it.next();
        
        let intervalId = setInterval( function () { 
            if (sec.done) {
                alert(title + " event is now!");
                clearInterval(intervalId);
                return;
            }
            
            daysHolder.innerText = sec.value.days;
            hoursHolder.innerText = sec.value.hours;
            minsHolder.innerText = sec.value.mins;
            secsHolder.innerText = sec.value.secs;
    
            sec = it.next();
        }, 1000, sec, it, days, hours, mins, secs, title);
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