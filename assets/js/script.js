var $main = $('.container');
var $currentDate = $('#currentDay');

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
}

setInterval(function(){//This function runs every minute
    var currentHour = moment().format('H');//military time
    for(var i = 9; i < 18; i++){//modify the '9' if you want to add more timeblocks in the future
        if(i == currentHour){
            $main.children('time-block').children('.row').children('textarea' + '.' + i).addClass('present');
        }else if(i < currentHour){
            $main.children('time-block').children('.row').children('textarea' + '.' + i).addClass('past');
        } else{
            $main.children('time-block').children('.row').children('textarea' + '.' + i).addClass('future');
        }
    }
}, 60000);

initalize();