const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const resultBtn = document.querySelector("#result");
const clearBtn = document.querySelector("#clear");
const decimalBtn = document.querySelector("#decimal");
const backspaceBtn = document.querySelector("#backspace");

let num1 = 0;
let num2 = 0;
let operator = "+";
let isNew = false;
let isNewOperation = true;

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (isError()) {
            reset();
        }
        if (isNew === true) {
            display.textContent = '';
            isNew = false;
        }
        let value = number.textContent;
        display.textContent += value;


    })
})
operators.forEach(button => {
    button.addEventListener('click', () => {
        if (isError()) {
            reset();
            return;
        }
        if (isNewOperation === true && isNew === false) {
            num2 = Number(display.textContent);
            let result = operate(operator, num1, num2);

            display.textContent = result;

        }
        num1 = Number(display.textContent);
        operator = button.textContent;
        isNew = true;
        isNewOperation = true;
    })
})

resultBtn.addEventListener('click', () => {
    if (isError()) {
        reset();
        return;
    }
    num2 = Number(display.textContent);
    let result = operate(operator, num1, num2);

    display.textContent = result;
    isNew = true;
    isNewOperation = false;
})

clearBtn.addEventListener("click", () => {
    reset();

})

decimalBtn.addEventListener("click", () => {
    if (isError()) {
        reset();
    }
    if (isNew === true || display.textContent === "") {
        display.textContent = "0.";
        isNew = false;
    }
    else if (display.textContent.includes(".")) {
        display.textContent += "";
    }
    else {
        display.textContent += ".";
    }


})
backspaceBtn.addEventListener("click", () => {
    if (isError()) {
        reset();
    }
    if (isNew === true) {
        //nothing will happen
    }
    else {
        let str = display.textContent;
        display.textContent = str.slice(0, -1);
        

    }})
function reset() {
    display.textContent = "";
    num1 = 0;
    num2 = 0;
    operator = "+";
    isNew = false;
    isNewOperation = false;
}
function isError() {
    return Number.isNaN(Number(display.textContent));
}


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

function operate(operator, num1, num2) {
    if (operator === "+") {
        return Math.round(add(num1, num2) * 100) / 100;
    } else if (operator === "-") {
        return Math.round(subtract(num1, num2) * 100) / 100;
    } else if (operator === "*") {
        return Math.round(multiply(num1, num2) * 100) / 100;
    } else if (operator === "/" && num2 === 0) {
        return "Цифру невозможно делить на 0";
    } else if (operator === "/") {
        return Math.round(divide(num1, num2) * 100) / 100;
    }

}