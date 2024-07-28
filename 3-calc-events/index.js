let firstNum = Number(process.argv[2]);
let secondNum = Number(process.argv[3]);
let operation = process.argv[4];

const EventEmmiter = require('events');
const calcEmmiter = new EventEmmiter();

calcEmmiter.on(operation, (firstNum, secondNum) => {
    switch(operation) {
        case 'add':
            console.log(firstNum + secondNum);
            break;
        case 'mult':
            console.log(firstNum * secondNum);
            break;
        case 'div':
            console.log(firstNum / secondNum);
            break;
        case 'sub':
            console.log(firstNum - secondNum)
            break;
        default:
            throw new Error(' Передайте одно из значений: add, mult, div, sub')
    }  
})
    
calcEmmiter.emit(operation, firstNum, secondNum)
