let operand1
let operand2
let operator
let display

let operators = {
  add:
    function add(a, b) {
      return (a + b)
    },
  subtract:
    function subtract(a, b) {
      return (a - b)
    },
  multiply:
    function multiply(a, b) {
      return (a * b)
    },
  divide:
    function divide(a, b) {
      return (a / b)
    },
}

function operate(operand1, operand2, operator) {
  return operators[operator](operand1, operand2)
}

function populateDisplay(input) {
  
}