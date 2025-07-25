const notifier = require('node-notifier');

let seconds = Number(process.argv[2]) * 1000;
let minutes = Number(process.argv[3]) * 60000;
let hours = Number(process.argv[4]) * 3600000;


function setTimer(seconds, minutes, hours) {
    let time = 0;
    if(!minutes && !hours) {
        time = seconds 
    } else if (!minutes) {
        time = seconds + hours
    } else if(!hours) {
        time = seconds + minutes
    }
    setTimeout(() => { 
        notifier.notify({
            title: 'Таймер',
            message: 'Прошло ' + time + ' миллисекунд'
        })
    }, time)
};

setTimer(seconds, minutes, hours);