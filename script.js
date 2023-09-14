const data = {
  operands: [],
  operator: '',
  displayValue: '',
  miniDisplayValue: '',
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
    clearAll()
    return
  }

  let result = Number(operators[operator](operand1, operand2).toFixed(10)) // round to 10 decimal places but cast back to a number to remove trailing 0s
  populateDisplay(result)

  // reset after finishing a calculation but keep the result for further calculations
  clearAll()
  data.operands.push(result)
}

function populateDisplay(input = '') {
  data.displayValue += input
  const display = document.querySelector('.display')
  display.textContent = data.displayValue
  const miniDisplay = document.querySelector('.mini-display')
  miniDisplay.textContent = data.miniDisplayValue
}

function clearAll() {
  data.operands = []
  data.operator = ''
  data.displayValue = ''
}

function captureDisplayValue() {
  data.operands.push(Number(data.displayValue))
  data.displayValue = ''
}

function handleButtonClick(e) {
  const button = e.target.id
  const reg = /[0-9]/

  switch (true) {
    case reg.test(button): // the button was a number
      /* The situation checked for here can only happen after pressing equals
      and yielding a result. The result is stored in case it needs to be used
      for further calculation but if a number is pressed instead of an operator
      button then assume the user wishes to start a fresh calculation and clear
      the operands */
      if (data.operands.length > 0 && !data.operator) {
        data.operands = []
      }
      populateDisplay(button)
      break
    case button in operators: // the button was an operator
      if (data.displayValue) {
        captureDisplayValue()
      }

      if (data.operands.length === 2) {
        operate(...data.operands, data.operator)
      }

      data.operator = button
      break
    case button === 'clear': // the button was CLEAR
      clearAll()
      populateDisplay()
      break
    case button === 'equals': // the button was =
      if (data.displayValue && data.operands.length === 1) {
        captureDisplayValue()
        operate(...data.operands, data.operator)
      }
      break
    case button === 'decimal': // the button was .
      if (!data.displayValue.includes('.')) {
        // must add 0 to ensure the result will be a number in case of no trailing digits
        populateDisplay('0.')
      }
      break
    case button === 'delete': // the button was delete
      if (data.displayValue) {
        data.displayValue = data.displayValue.slice(0, -1)
        populateDisplay()
      }
    case button === 'negate': // the button was negate
      if (data.displayValue) {
        if (data.displayValue.includes('-')) {
          data.displayValue = data.displayValue.slice(1)
          populateDisplay()
        } else {
          data.displayValue = '-' + data.displayValue
          populateDisplay()
        }
      }
  }
}

const buttons = document.querySelectorAll('button')
buttons.forEach(button => button.addEventListener('click', handleButtonClick))