let operands = []
let operator = ''
let miniDisplayValue = ''
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
  let result = operators[operator](operand1, operand2)
  populateDisplay(result)

  operands = []
  operands.push(result)
  operator = ''
  displayValue = ''
}

function populateDisplay(input='') {
  displayValue += input
  const display = document.querySelector('.display')
  display.textContent = displayValue
}

function clearDisplay() {
  displayValue = ''
  populateDisplay()
}

function handleButtonClick(e) {
  const button = e.target.id
  const reg = /[0-9]/

  switch (true) {
    case reg.test(button): // the button button was a number
      populateDisplay(button)
      break
    case button in operators: // the button button was an operator
      if (displayValue) {
        operands.push(Number(displayValue))
      }
      clearDisplay()

      if (operands.length === 2) {
        operate(...operands, operator)
      }

      operator = button
      break
    case button === 'clear': // the button button was CLR
      operands = []
      operator = ''
      clearDisplay()
    case button === 'equals': // the button was equals
      if ((operands.length < 2 && !displayValue) || !operator) return
      operands.push(Number(displayValue))
      clearDisplay()
      operate(...operands, operator)
  }
}

const buttons = document.querySelectorAll('button')
buttons.forEach(button => button.addEventListener('click', handleButtonClick))