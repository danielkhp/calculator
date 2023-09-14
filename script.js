const OPERATOR_SYMBOLS = {
  add: '&plus;',
  subtract: '&minus;',
  multiply: '&times;',
  divide: '&divide;',
}

const data = {
  operands: [],
  operator: '',
  displayValue: '',
  miniDisplayValue: '',
  clearPending: false,
}

const display = document.querySelector('.display')
const miniDisplay = document.querySelector('.mini-display')

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
    clearData()
    alert(`Can't divide by 0`)
    return
  }

  const result = operators[operator](operand1, operand2)
  clearData()
  data.clearPending = true
  return result
}

function populateDisplay(input = '') {
  data.displayValue += input
  display.textContent = data.displayValue
  const operand1 = data.operands[0] || ''
  const operatorSymbol = OPERATOR_SYMBOLS[data.operator] || ''
  data.miniDisplayValue = `${operand1} ${operatorSymbol}`
  miniDisplay.innerHTML = data.miniDisplayValue
}

function clearData() {
  data.operands = []
  data.operator = ''
  data.displayValue = ''
  data.miniDisplayValue = ''
  data.clearPending = false
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
      if (data.clearPending) {
        data.displayValue = ''
        data.clearPending = false
      }
      populateDisplay(button)
      break
    case button in operators: // the button was an operator
      if (data.clearPending && data.operands.length > 0) {
        data.displayValue = ''
        data.clearPending = false
      }

      if (data.displayValue) {
        captureDisplayValue()
      }

      if (data.operands.length === 2) {
        const result = operate(...data.operands, data.operator)
        data.operands.push(result)
        populateDisplay(result)
      }

      data.operator = button
      populateDisplay()
      break
    case button === 'clear': // the button was CLEAR
      clearData()
      populateDisplay()
      break
    case button === 'equals': // the button was =
      if (data.displayValue && data.operands.length === 1) {
        captureDisplayValue()
        const result = operate(...data.operands, data.operator)
        populateDisplay(result)
      }
      break
    case button === 'decimal': // the button was .
      if (data.clearPending) {
        data.displayValue = ''
        data.clearPending = false
      }

      if (!data.displayValue.includes('.')) {
        if (data.displayValue) {
          populateDisplay('.')
        } else {
          // must add 0 to ensure the result will be a number in case of no trailing digits
          populateDisplay('0.')
        }
      }
      break
    case button === 'delete': // the button was delete
      data.clearPending = false

      if (data.displayValue) {
        data.displayValue = data.displayValue.slice(0, -1)
        populateDisplay()
      }
      break
    case button === 'negate': // the button was negate
      data.clearPending = false

      if (data.displayValue) {
        if (data.displayValue.includes('-')) {
          data.displayValue = data.displayValue.slice(1)
          populateDisplay()
        } else {
          data.displayValue = '-' + data.displayValue
          populateDisplay()
        }
      }
      break
  }
}

document.querySelectorAll('button').forEach(button => button.addEventListener('click', handleButtonClick))