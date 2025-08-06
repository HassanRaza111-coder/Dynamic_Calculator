let current = '';
let expression = '';
let historyList = [];
let showHistory = false;

const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');
const historyDiv = document.getElementById('history');

function updateDisplay() {
  expressionDisplay.textContent = expression || '0';
  resultDisplay.textContent = current || '0';
}

function append(num) {
  current += num;
  updateDisplay();
}

function clearAll() {
  current = '';
  expression = '';
  updateDisplay();
}

function operate(op) {
  if (current === '') return;
  expression += current + ' ' + op + ' ';
  current = '';
  updateDisplay();
}

function calculate() {
  if (current === '') return;
  expression += current;
  try {
    const result = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
    historyList.unshift(expression + ' = ' + result);
    current = result.toString();
  } catch {
    current = 'Error';
  }
  expression = '';
  updateDisplay();
  renderHistory();
}

function percent() {
  current = (parseFloat(current) / 100).toString();
  updateDisplay();
}

function backspace() {
  current = current.slice(0, -1);
  updateDisplay();
}

function toggleTheme() {
  document.body.classList.toggle('dark');

  // Update icon
  const icon = document.querySelector('.mode-toggle');
  if (document.body.classList.contains('dark')) {
    icon.textContent = '☀️';
  } else {
    icon.textContent = '🌙';
  }
}

function toggleHistory() {
  showHistory = !showHistory;
  historyDiv.classList.toggle('hidden', !showHistory);
}

function renderHistory() {
  historyDiv.innerHTML = historyList.map(item => '<div>' + item + '</div>').join('');
}

// Set correct icon on page load
window.onload = () => {
  const icon = document.querySelector('.mode-toggle');
  icon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
};
