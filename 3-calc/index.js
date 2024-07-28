let firstNum = process.argv[2];
let secondNum = process.argv[3];
let operation = process.argv[4];

const { add } = require('./add.js');
const { mult } = require('./mult.js');
const { div } = require('./div.js');
const { sub } = require('./sub.js');

function calculator(firstNum, secondNum, operation) {
    switch(operation) {
        case 'add':
            console.log(add(firstNum, secondNum));
            break;
        case 'mult':
            console.log(mult(firstNum, secondNum));
            break;
        case 'div':
            console.log(div(firstNum, secondNum));
            break;
        case 'sub':
            console.log(sub(firstNum, secondNum))
            break;
        default:
            throw new Error(' Передайте одно из значений: add, mult, div, sub')
    }
    return operation;
};

console.log(calculator(firstNum, secondNum, operation))
