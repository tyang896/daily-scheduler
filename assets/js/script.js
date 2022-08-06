var $currentDate = $('#currentDay');
var $saveEvent = $('.saveBtn');
var $notification = $('.toast');

//An array of objects holding all events
var currentEvents = [];

//Display date in the following format: Monday, January 1st
$currentDate.text(moment().format('dddd, MMMM Do'));


function initalize(){
    //currentHour is set to military time
    var currentHour = moment().format('H');

    //Color code time blocks with past, present and future
    //modify the '18' if you want to add more timeblocks in the future
    for(var i = 9; i < 18; i++){
        if(i < currentHour){
            $('textarea.' + i).addClass('past');
        }else if(i == currentHour){
            $('textarea.' + i).addClass('present');
        } else{
            $('textarea.' + i).addClass('future');
        }
    }
    //Populate timeblocks with events from local storage
    if(localStorage.getItem('allEvents')){
        var eventSaved = JSON.parse(localStorage.getItem('allEvents'));
        currentEvents = eventSaved;
        for(var i = 0; i < eventSaved.length; i++){
            $('textarea.' + eventSaved[i].time).text(eventSaved[i].event);
        }
    }
}

//Checks the current hour every minute and updates the timeblocks
setInterval(function(){
     //currentHour is set to military time
    var currentHour = moment().format('H');
    //Color code time blocks with past, present and future
    //modify the '18' if you want to add more timeblocks in the future
    for(var i = 9; i < 18; i++){
        if(i < currentHour){
            $('textarea.' + i).attr('class', "description col mb-1 past " + i );
        }else if(i == currentHour){
            $('textarea.' + i).attr('class', "description col mb-1 present " + i );
        } else{
            $('textarea.' + i).attr('class', "description col mb-1 future " + i );
        }
    }
}, 60000);

//Saves the event to local storage and notifies the user
$saveEvent.on('click', function(event){
    event.preventDefault();
    var $element = $(event.currentTarget);
    var $eventInfo = $element.prev().val();
    var $timeInfo = $element.data('time');
    var newEvent = {
        event: $eventInfo,
        time: $timeInfo,
    }
    //Checks if a local storage already exists before creating one
    if(localStorage.getItem('allEvents')){
        var eventSaved = JSON.parse(localStorage.getItem('allEvents'));
        var eventExists = false;//Checks if there was alreay an event that exists for the same time

        //Checks if an event already exists in local storage and overwrites old event
        for(var i = 0; i < eventSaved.length; i++){
            if(newEvent.time === eventSaved[i].time){//Overwrite an old event
                var eventBefore = eventSaved[i].event;
                var eventAfter = newEvent.event;
                eventSaved[i] = newEvent;
                currentEvents = eventSaved;
                localStorage.setItem('allEvents', JSON.stringify(eventSaved));
                eventExists = true;

                //Display an event notification if the user removes their event description or they change their event description from the same timeblock
                if(eventBefore !== "" && eventAfter === "" || eventBefore !== eventAfter){
                    showNotification();
                }
            }
        }
        
        //If an event does not already exist in local storage, add event to local storage
        if(!eventExists){
            eventSaved.push(newEvent);
            currentEvents = eventSaved;
            localStorage.setItem('allEvents', JSON.stringify(eventSaved));
            //Display notification if the event description is not blank
            if(newEvent.event !== ""){
                showNotification();
            }
        }
    }else{//Creates a new localstorage
        currentEvents.push(newEvent);
        localStorage.setItem('allEvents', JSON.stringify(currentEvents));
        //Display notification if the event description is not blank
        if(newEvent.event !== ""){
            showNotification();
        }
    }
})//End of event listener code

//Shows a notification for 1.5 seconds
function showNotification(){
    var counter = 1;
    $notification.addClass('show');
    var timerInterval = setInterval(function(){
        if(counter === 0){
            clearInterval(timerInterval);
            $notification.attr('class', 'toast position-fixed fixed-top mx-auto');
        }else{
            counter--;
        }
    },1500 )   
}

initalize();