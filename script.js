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

let operand1 = [];
let operand2 = [];
let operator;
let answer;

const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");


numbers.forEach(number => { 
    number.addEventListener("click", () => {
        if (operator === undefined) {
            operand1.push(number.textContent);
            console.log(operand1);
        } else {
                operand2.push(number.textContent);
                console.log(operand2);
            }
    })
});

numbers.forEach(number => { 
    number.addEventListener("click", () => {
        if (display.textContent == "0") {
            display.textContent = number.textContent
        } else if (operator !== undefined) {
            display.textContent = "";
            display.textContent += number.textContent
        }
    })
})


operators.forEach(op => {
    op.addEventListener("click", () => {
        if (answer !== undefined) {
            console.log("there's an answer");
            operand1 = [];
            operand1.push(answer);
            operand2 = [];
        }
    })
})


operators.forEach(op => { 
    op.addEventListener("click", () => {
        if (operator === undefined || 
            operator !== undefined && answer !== undefined) {
            switch (op.textContent) {
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
            console.log(operator);
            return operator;
        }
    }) 
});

equals.addEventListener("click", () => {
    if (answer === undefined) {
        operand1 = +operand1.join("");
        operand2 = +operand2.join("");
    
        answer = operate(operand1, operand2, operator);
        console.log(operate(operand1, operand2, operator));
        display.textContent = answer
        return answer;
    }
})

clear.addEventListener("click", () => {
    operand1 = [];
    operand2 = [];
    operator = undefined;
    display.textContent = 0
})






