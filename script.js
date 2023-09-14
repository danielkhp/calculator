const data = {
  operands: [],
  operator: '',
  displayValue: '',
  miniDisplayValue: '',
  clear: false,
}

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
  // special case for divide by zero
  if (operator === 'divide' && operand2 === 0) {
    populateDisplay('Infinity')
    data.operands = []
    data.operator = ''
    data.displayValue = ''
    return
  }

  let result = operators[operator](operand1, operand2)
  populateDisplay(Number(result.toFixed(10))) // round to 10 decimal places but cast back to a number to remove trailing 0s

  // reset after finishing a calculation but keep the result for further calculations
  data.operands = []
  data.operands.push(result)
  data.operator = ''
  data.displayValue = ''
  data.clear = true
}

function populateDisplay(input='') {
  data.displayValue += input
  const display = document.querySelector('.display')
  display.textContent = data.displayValue
}

function clearDisplay() {
  data.displayValue = ''
  populateDisplay()
}

function handleButtonClick(e) {
  const button = e.target.id
  const reg = /[0-9]/

  switch (true) {
    case reg.test(button): // the button button was a number
      if (data.clear) {
        data.clear = !data.clear
        data.operands = []
      }
      populateDisplay(button)
      break
    case button in operators: // the button button was an operator
      if (!data.displayValue && data.operands.length === 0) return
      if (data.displayValue) {
        data.operands.push(Number(data.displayValue))
      }
      clearDisplay()

      if (data.operands.length === 2) {
        operate(...data.operands, data.operator)
      }

      data.operator = button
      break
    case button === 'clear': // the button button was CLR
      data.operands = []
      data.operator = ''
      clearDisplay()
    case button === 'equals': // the button was equals
      if ((data.operands.length < 2 && !data.displayValue) || !data.operator) return
      data.operands.push(Number(data.displayValue))
      clearDisplay()
      operate(...data.operands, data.operator)
  }
}

const buttons = document.querySelectorAll('button')
buttons.forEach(button => button.addEventListener('click', handleButtonClick))