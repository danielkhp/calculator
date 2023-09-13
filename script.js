let operand1
let operand2
let operator
let displayValue = ''

const operators = {
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
  const result = operators[operator](operand1, operand2)
  populateDisplay(result)
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

  const reg = /[0-9]/
  // check if the button clicked was a number
  if (reg.test(clicked)) {
    populateDisplay(clicked)
  } else if (clicked === 'clear') {
    clearDisplay()
  } else if (clicked in operators) {
    operand1 = Number(displayValue)
    operator = clicked
    clearDisplay()
  } else if (clicked === 'equals') {
    operand2 = Number(displayValue)
    clearDisplay()
    operate(operand1, operand2, operator)
  }
}

const buttons = document.querySelectorAll('button')
buttons.forEach(button => button.addEventListener('click', handleButtonClick))