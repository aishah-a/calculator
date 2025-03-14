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
    return a / b;
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

let operand1;
let operand2;
let operator;