var $main = $('.container');
var $currentDate = $('#currentDay');
var $saveEvent = $('.saveBtn');
var $saveIcon = $('i');

//An array of objects holding all events
var currentEvents = [];

$currentDate.text(moment().format('dddd, MMMM Do'));

function initalize(){
    var currentHour = moment().format('H');//military time
    for(var i = 9; i < 18; i++){//modify the '18' if you want to add more timeblocks in the future
        if(i < currentHour){
            $('textarea.' + i).addClass('past');
        }else if(i == currentHour){
            $('textarea.' + i).addClass('present');
        } else{
            $('textarea.' + i).addClass('future');
        }
    }
    if(localStorage.getItem('allEvents')){
        var eventSaved = JSON.parse(localStorage.getItem('allEvents'));
        currentEvents = eventSaved;
        for(var i = 0; i < eventSaved.length; i++){
            $('textarea.' + eventSaved[i].time).text(eventSaved[i].event);
        }
    }
}

setInterval(function(){//This function runs every minute
    var currentHour = moment().format('H');//military time
    for(var i = 9; i < 18; i++){//modify the '18' if you want to add more timeblocks in the future
        if(i < currentHour){
            $('textarea.' + i).attr('class', "description col mb-1 past " + i );
        }else if(i == currentHour){
            $('textarea.' + i).attr('class', "description col mb-1 present " + i );
        } else{
            $('textarea.' + i).attr('class', "description col mb-1 future " + i );
        }
    }
}, 60000);

$saveEvent.on('click', function(event){//This works for the button, but not for the tag that's  inside the button
    event.preventDefault();
    var $element = $(event.currentTarget);
    var $eventInfo = $element.prev().val();
    var $timeInfo = $element.data('time');
    var newEvent = {
        event: $eventInfo,
        time: $timeInfo,
    }

    if(localStorage.getItem('allEvents')){//if allEvents exists in local storage
        var eventSaved = JSON.parse(localStorage.getItem('allEvents'));
        var eventExists = false;
        for(var i = 0; i < eventSaved.length; i++){
            if(newEvent.time === eventSaved[i].time){//Overwrite an old event
                eventSaved[i] = newEvent;
                currentEvents = eventSaved;
                localStorage.setItem('allEvents', JSON.stringify(eventSaved));
                eventExists = true;
            }
        }
        if(!eventExists){//Adds a new event to local storage
            eventSaved.push(newEvent);
            currentEvents = eventSaved;
            localStorage.setItem('allEvents', JSON.stringify(eventSaved));
        }
    }else{
        currentEvents.push(newEvent);
        localStorage.setItem('allEvents', JSON.stringify(currentEvents));
    }

})

initalize();