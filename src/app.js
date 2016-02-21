var UI = require('ui');
var Vibe = require('ui/vibe');
// var Vector2 = require('vector2');

var timeToCountDown; // seconds
var countdownStarted = false;
var counter;
var f;

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

menu.on('select', function(e) {
  if (!countdownStarted){
    countdownStarted = true;
    main.subtitle('Studying...');
    main.body('Press UP to add one more hour. Press DOWN to interrupt studying and start wasting your life.');
    switch(e.itemIndex) {
      case 0:
        timeToCountDown = 1800;
        break;
      case 1:
        timeToCountDown *= 1;
        break;
      case 2:
        timeToCountDown += 1800;
        break;
      case 3:
        timeToCountDown *= 2;
        break;
      case 4:
        timeToCountDown *= 3;
        break;
      case 5:
        timeToCountDown *= 4;
        break;
      case 6:
        timeToCountDown *= 5;
        break;
      case 7:
        timeToCountDown = 60;
        break;
      default:
        timeToCountDown = 1800;
    }
    countdownDisplay();
    f = setInterval(function(){
      countdownDisplay();
      if (timeToCountDown < -1){
        clearInterval(f);
        countdownStarted = false;
        time.subtitle('Congrats!');
        time.body('You Made It!');
        Vibe.vibrate('long');
        setTimeout(init(), 3000);
      }
    }, 1000);
  }
  menu.hide();
  time.show(); 
});

// time.on('click', 'back', function(e){
//   if (countdownStarted) {
//     main.show();
//   } else {
//     menu.show();
//   }
// });

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

// main.on('click', 'back', function(e){
  
// });

function countdownDisplay(){
    counter = countdown(timeToCountDown);
    time.body(counter.hours + ':'+ 
              counter.minutes + ':'+
              counter.seconds + '\n\n         KEEP GOING!');
    timeToCountDown -= 1;
}

function init(){
  main.subtitle('You are at the...');
  main.body('Press SELECT to start studying hour');
  main.show();
  countdownStarted = false;
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

init();
