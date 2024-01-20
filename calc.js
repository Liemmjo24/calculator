let operator ='';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded", function(){
    //Store components on HTML to JS

    let clear = document.querySelector("#clear-btn");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");
    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator")

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");

    //Allows the UI to know what number the users want
    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue;
    }))
    //Allows the UI to know what operator the users want
    operators.forEach((op) => op.addEventListener("click", function(e){
        handleOperator(e.target.textContent)
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }))
    //Logic for Clear
    clear.addEventListener("click", function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    })
    //Logic for computation
    equal.addEventListener("click", function(){
        if (currentValue != '' && previousValue != ''){
            calculate();
            previousScreen.textContent = '';
            if(previousValue.length <= 5){
                currentScreen.textContent = previousValue;
            } else {
                currentScreen.textContent = previousValue.slice(0,5) + "...";
            }
        }
    })
    decimal.addEventListener("click", function(){
        addDecimal()
    })
})

//Calculator shows only 5 numbers
function handleNumber(num){
    if(currentValue.length <= 5){
        currentValue += num;
    }
}

//Logic for operator
function handleOperator(op){
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}
//Logic for computation
function calculate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === "+"){
        previousValue += currentValue;
    } else if (operator === "-"){
        previousValue -= currentValue;
    } else if (operator === "*"){
        previousValue *= currentValue;
    } else if (operator === "/"){
        previousValue /= currentValue;
    }
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
    console.log(previousValue)
}

//Calculator to round up
function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

//Shows decimals if computation has one
function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += '.';
    }
}