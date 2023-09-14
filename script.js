const data = {
  operands: [],
  operator: '',
  displayValue: '',
  miniDisplayValue: '',
  clearPending: false,
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
  data.clearPending = true
}

function populateDisplay(input = '') {
  data.displayValue += input
  const display = document.querySelector('.display')
  display.textContent = data.displayValue
  const miniDisplay = document.querySelector('.mini-display')
  miniDisplay.textContent = data.miniDisplayValue
}

function clearDisplay() {
  data.displayValue = ''
  data.miniDisplayValue = ''
  populateDisplay()
}

function clearAll() {
  data.operands = []
  data.operator = ''
  data.displayValue = ''
}

function handleButtonClick(e) {
  const button = e.target.id
  const reg = /[0-9]/

  switch (true) {
    case reg.test(button): // the button was a number
      if (data.clearPending) {
        data.clearPending = !data.clearPending
        data.operands = []
      }
      populateDisplay(button)
      break
    case button in operators: // the button was an operator
      if (!data.displayValue && data.operands.length === 0) return
      if (data.displayValue) {
        data.operands.push(Number(data.displayValue))
      }
      clearDisplay()

      if (data.operands.length === 2) {
        operate(...data.operands, data.operator)
      }

      data.clearPending = false
      data.operator = button
      break
    case button === 'clear': // the button was CLR
      clearAll()
      populateDisplay()
    case button === 'equals': // the button was equals
      if ((data.operands.length < 2 && !data.displayValue) || !data.operator) return
      data.operands.push(Number(data.displayValue))
      clearDisplay()
      operate(...data.operands, data.operator)
      break
    case button === 'decimal': // the button was the decimal
      if (!data.displayValue.includes('.')) {
        if (data.clearPending) {
          data.clearPending = !data.clearPending
          data.operands = []
        }
        populateDisplay('.')
      }
    case button === 'delete': // the button was delete
      if (data.displayValue) {
        data.displayValue = data.displayValue.slice(0, -1)
        populateDisplay()
      }
  }
}

const buttons = document.querySelectorAll('button')
buttons.forEach(button => button.addEventListener('click', handleButtonClick))