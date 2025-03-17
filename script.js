const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");

let operand1 = [];
let num1;
let operand2 = [];
let num2;
let operator;
let answer;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "nice try";
    } else {
        return a / b;
    }
}

function operate(opr1, opr2, operator) {
    switch (operator) {
        case "add":
            operator = add;
            return operator(opr1, opr2);
        case "subtract":
            operator = subtract;
            return operator(opr1, opr2);
        case "multiply":
            operator = multiply;
            return operator(opr1, opr2);
        case "divide":
            operator = divide;
            return operator(opr1, opr2);
    }
}

function addDecimal() {
    if (operand1.length === 0) {
        operand1.push("0");
        operand1.push(decimal.textContent);
        display.textContent = "0";
        display.textContent += decimal.textContent;
    } else if (operand2.length === 0 && !operand2.includes(".") && operator !== undefined) {
        operand2.push("0");
        operand2.push(decimal.textContent);
        display.textContent = "0";
        display.textContent += decimal.textContent;
    }   else if (operand1.length !== 0 && operand1.length <= 10 && !operand1.includes(".") && operator == undefined) {
        operand1.push(decimal.textContent);
        display.textContent += decimal.textContent;
    } else if (operand2.length !== 0 && !operand2.includes(".") && operator !== undefined) {
        operand2.push(decimal.textContent);
        display.textContent += decimal.textContent;
    }
}

function normalize() {
    if (typeof operand1 !== "number") {
        num1 = operand1.join("");
    } if (typeof operand2 !== "number") {
        num2 = operand2.join("");
    }
}

function calculate() {
    normalize();
    answer = operate(+num1, +num2, operator);
    showAnswer(answer);
}

function updateDisplay(number) {
    if (operand1.includes(".") === true && operator === undefined && operand1.length < 12) {
        display.textContent += number.textContent;
    } else if (display.textContent == 0 && operator === undefined) {
        display.textContent = "";
        display.textContent += number.textContent;
    } else if ((operand2.length === 1 && operator !== undefined && !operand2.includes(".")) || 
        (display.textContent == 0 && !operand2.includes("."))) {
        display.textContent = "";
        display.textContent = number.textContent;
    } else if (operand2.length !== 0 && operand2.length < 13 && operator !== undefined) {
        display.textContent += number.textContent;
    } else if (operator === undefined && operand1.length < 13 && operand2.length < 13) {
        display.textContent += number.textContent;
    }
}

function showAnswer(answer) {
    let result = answer;
    result = result.toString().split("");
    if (result.length < 13) {
        display.textContent = answer;
    } else if (result.length >= 13) {
        if (result.indexOf(".") > 9) {
            answer = answer.toExponential(2);
        } else {
            answer = answer.toFixed(3);
        }
        display.textContent = answer;
    }
}


numbers.forEach(number => { 
    number.addEventListener("click", () => { 
        if (operand1.length === 0 || 
            operand1.length !== 0 && operand1.length < 12 && operator === undefined) {
            operand1.push(number.textContent);
            updateDisplay(number);
        }
        else if (operator !== undefined && answer === undefined && operand1.length !== 0 && operand2.length < 12) {
            operand2.push(number.textContent);
            updateDisplay(number);
        } else if (operator !== undefined && answer !== undefined && operand2.length < 12) {
            operand2.push(number.textContent);
            updateDisplay(number);
        }
    })
})

operators.forEach(oper => {
    oper.addEventListener("click", () => {
        if (operator !== undefined && operand2.length !== 0) {
            calculate();
            operand1 = [];
            operand1.push(answer);
        } if (operator !== undefined && answer !== undefined) {
            operand2 = [];
        }
        switch (oper.textContent) {
            case "+":
                operator = "add";
            break;
            case "-":
                operator = "subtract";
            break;
            case "*":
                operator = "multiply";
            break;
            case "/":
                operator = "divide";
            break;
        }
    })
})

decimal.addEventListener("click", addDecimal)

equals.addEventListener("click", () => {
    if (operand1 !== undefined && operator !== undefined && operand2 !== undefined) {
        calculate();
        operand1 = answer.toString().split("");
        operand2 = [];
    }

})

clear.addEventListener("click", () => {
    operand1 = [];
    operand2 = [];
    operator = undefined;
    display.textContent = 0
})
