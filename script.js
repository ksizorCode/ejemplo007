let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

const displayElement = document.getElementById('display');
const previousOpElement = document.getElementById('previous-op');

function updateDisplay() {
    displayElement.innerText = currentInput;
    if (operator) {
        previousOpElement.innerText = `${previousInput} ${operator}`;
    } else {
        previousOpElement.innerText = '';
    }
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("¡No se puede dividir por cero! 😮");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// Keyboard support (optional but nice)
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') appendNumber(event.key);
    if (event.key === '.') appendNumber('.');
    if (event.key === '+') appendOperator('+');
    if (event.key === '-') appendOperator('-');
    if (event.key === '*') appendOperator('*');
    if (event.key === '/') appendOperator('/');
    if (event.key === 'Enter' || event.key === '=') calculate();
    if (event.key === 'Backspace') deleteLast();
    if (event.key === 'Escape') clearDisplay();
});
