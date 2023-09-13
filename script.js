let operand1
let operand2
let operator
let displayValue = ''

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

function clearDisplay() {
  displayValue = ''
  const displayDiv = document.querySelector('.display')
  displayDiv.textContent = displayValue
}

function populateDisplay(input) {
  displayValue = displayValue.concat(input)
  const displayDiv = document.querySelector('.display')
  displayDiv.textContent = displayValue
}

function handleButtonClick(e) {
  const clicked = e.target.id
  // check if the button clicked was a number
  const reg = /[0-9]/
  if (reg.test(clicked)) {
    populateDisplay(clicked)
  } else if (clicked === 'clear') {
    clearDisplay()
  }
}

const buttons = document.querySelectorAll('button')
buttons.forEach(button => button.addEventListener('click', handleButtonClick))