var UI = require('ui');
var Vibe = require('ui/vibe');
// var Vector2 = require('vector2');

var timeToCountDown; // seconds
var countdownStarted = false;
var counter;
var f;
var demoFlag = true;
var HOUR = 3600; // seconds

var main = new UI.Card({
  title: 'Study Hour',
  icon: 'images/cc_bw.png',
});

var time = new UI.Card({
      title: 'Study Hour',
      icon: 'images/cc_bw.png',
      subtitle: 'Time Left:',
    });

var menu = new UI.Menu({
    sections: [{
      items: [{
        title: '30 Minutes' // 0
      }, {
        title: '1 Hour' // 1
      }, {
        title: '1.5 Hours' // 2
      }, {
        title: '2 Hours' // 3
      }, {
        title: '3 Hours' // 4
      }, {
        title: '4 Hours' // 5
      }, {
        title: '5 Hours' // 6
      },{
        title: '1 Minute', // 7
        subtitle: 'for demo'
      }]
    }]
  });

var leaving = new UI.Card({
  title: 'Study Hour',
  icon: 'images/cc_bw.png',
  body: 'Ugh, you left the Library early. Try to study harder next time.'
});

menu.on('select', function(e) {
  if (!countdownStarted){
    countdownStarted = true;
    main.subtitle('Studying...');
    main.body('Press UP to add one more hour.\nPress DOWN to interrupt studying and start wasting your life.');
    switch(e.itemIndex) {
      case 0:
        timeToCountDown = HOUR/2;
        break;
      case 1:
        timeToCountDown = HOUR;
        break;
      case 2:
        timeToCountDown = HOUR + HOUR/2;
        break;
      case 3:
        timeToCountDown = HOUR*2;
        break;
      case 4:
        timeToCountDown = HOUR*3;
        break;
      case 5:
        timeToCountDown = HOUR*4;
        break;
      case 6:
        timeToCountDown = HOUR*5;
        break;
      case 7:
        timeToCountDown = 60;
        break;
      default:
        timeToCountDown = HOUR;
    }
    countdownDisplay();
    f = setInterval(function(){
      countdownDisplay();
      
      // Goal failed
      if (!inZone() && timeToCountDown > 0){
        time.hide();
        Vibe.vibrate('long');
        leaving.show();
        init();
      }
      
      // Goal reached
      if (timeToCountDown < -1){
        clearInterval(f);
        countdownStarted = false;
        time.subtitle('Congrats!');
        time.body('You Made It!');
        Vibe.vibrate('long');
        init();
      }
    }, 1000);
  }
  menu.hide();
  time.show(); 
});

main.on('click', 'select', function(e) {
  if (countdownStarted){
    time.show();
  } else {
    menu.show();
  }
});

main.on('click', 'up', function(e){
  timeToCountDown += 3600;
  time.show();
});

main.on('click', 'down', function(e){
  init();
});

time.on('click', 'up', function(e){
  demoFlag = false;
});

time.on('click', 'down', function(e){
  clearInterval(f);
  countdownStarted = false;
  time.subtitle('Congrats!');
  time.body('You Made It!');
  Vibe.vibrate('long');
  init();
});

function countdownDisplay(){
  counter = countdown(timeToCountDown);
  time.subtitle('Time Left:\n     ' + 
                counter.hours + ':'+ 
                counter.minutes + ':'+
                counter.seconds + '\n\nKEEP GOING!');
  time.body('  ');
  timeToCountDown -= 1;
}

function init(){
  main.subtitle('You are at the Library.');
  main.body('Press SELECT to start your study hour.');
  countdownStarted = false;
  demoFlag = true;
  clearInterval(f);
}

function countdown(timeToCountDown){
  var t = timeToCountDown*1000;
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': ('0' + days).slice(-2),
    'hours': ('0' + hours).slice(-2),
    'minutes': ('0' + minutes).slice(-2),
    'seconds': ('0' + seconds).slice(-2)
  };
}

function inZone(){
  if (!demoFlag){
    demoFlag = true;
    return false;
  }
  return true;
}

init();
main.show();
