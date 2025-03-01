let displayedExpression = "";
let processedExpression = "";

const display = document.getElementById("display");

function updateDisplay() {
  display.value = displayedExpression;
  console.log("Processed:", processedExpression);
}

const funcMap = {
  sin: "Math.sin(",
  cos: "Math.cos(",
  tan: "Math.tan(",
  ln: "Math.log(",
  log: "Math.log(",
  "√": "Math.sqrt(",
  EXP: "*10**(",
  Inv: "1/(",
};

const opMap = {
  "+": "+",
  "-": "-",
  "÷": "/",
  x: "*",
  "%": "%",
  "^": "**",
};

const constMap = {
  π: "Math.PI",
  e: "Math.E",
};

function lastChar() {
  return displayedExpression.slice(-1);
}

function canAppend(token) {
  if (token === ")") {
    let openCount = (displayedExpression.match(/\(/g) || []).length;
    let closeCount = (displayedExpression.match(/\)/g) || []).length;
    if (openCount <= closeCount) return false;
    if ("+-×÷*/%^".includes(lastChar())) return false;
  }
  if (opMap[token] || token === "(") {
    if (displayedExpression === "" && token !== "(") return false;
    if (
      displayedExpression !== "" &&
      "+-×÷*/%^".includes(lastChar()) &&
      token !== "("
    )
      return false;
    if (lastChar() === "(" && token !== "(" && token !== "-") return false;
  }
  return true;
}

function appendToken(token) {
  if (!isNaN(token) || token === ".") {
    displayedExpression += token;
    processedExpression += token;
    updateDisplay();
    return;
  }
  if (constMap[token]) {
    displayedExpression += token;
    processedExpression += constMap[token];
    updateDisplay();
    return;
  }
  if (opMap[token]) {
    if (displayedExpression === "" || "+-×÷*/%^".includes(lastChar())) return;
    displayedExpression += token;
    processedExpression += opMap[token];
    updateDisplay();
    return;
  }
  if (token === "(" || token === ")") {
    if (!canAppend(token)) return;
    displayedExpression += token;
    processedExpression += token;
    updateDisplay();
    return;
  }
  if (funcMap[token]) {
    if (
      displayedExpression !== "" &&
      (/\d/.test(lastChar()) || lastChar() === ")")
    ) {
      displayedExpression += "x";
      processedExpression += "*";
    }
    displayedExpression += token + "(";
    processedExpression += funcMap[token];
    updateDisplay();
    return;
  }
  if (token === "x²") {
    if (displayedExpression === "" || "+-×÷*/%^(".includes(lastChar())) return;
    displayedExpression += "²";
    processedExpression += "**2";
    updateDisplay();
    return;
  }
}

document.querySelectorAll(".button").forEach((button) => {
  if (button.id === "clear" || button.id === "equals") return;
  button.addEventListener("click", () => {
    const token = button.getAttribute("data-value");
    appendToken(token);
  });
});

document.getElementById("clear").addEventListener("click", () => {
  displayedExpression = "";
  processedExpression = "";
  updateDisplay();
});

document.getElementById("equals").addEventListener("click", () => {
  let openCount = (displayedExpression.match(//g) || []).length;
  let closeCount = (displayedExpression.match(//g) || []).length;
  if (openCount !== closeCount) {
    alert("Error: Unbalanced parentheses");
    return;
  }
  try {
    let result = eval(processedExpression);
    displayedExpression = result.toString();
    processedExpression = result.toString();
    updateDisplay();
  } catch (e) {
    alert("Invalid Expression");
  }
});

updateDisplay();
