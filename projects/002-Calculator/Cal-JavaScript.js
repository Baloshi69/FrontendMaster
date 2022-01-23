let total = 0;                              // variable containing total value of operation
let buffer = '0'                            // variable to contain buffer value
let operator = null;                        // variable to contain operation symbol
const display = document.querySelector(".display") // variable to contain display, text and shoe value into display

// Checking butting clik, and geting the inner text value from that button
function buttonClick(value) {
    if (isNaN(parseInt(value))) {           // if value is not a number, then its a Symbol
        handleSymbol(value);                // Handover operation to handleSymbol function
    } else {                                // Else
        handleNumber(value);                // Handover operation to handleNumber function
    }
    rerender();                             // and Rerendering the dispaly, with rerender function
}

// Handing Number
function handleNumber(value) {
    if ( buffer === "0") {          // If buffer is 0
        buffer = value;             // simplay adding 0 to buffer
    } else {                        // ELSE
        buffer += value;            // add value to buffer
    }
}

// Handling Symbols. with SWITCH case.
function handleSymbol(value) {
    switch (value) {
        case 'C':                                            // if case = C , then
            buffer = '0';                                           // changing buffer to 0 , RESETTING
            total = 0;                                              // Changing total to 0 , RESETTING
            operator = null;                                        // Changing operator to null, RESETTING
            break;                                                  // BREAKING the function
        case '=':                                            // If case == '=', then
            if ( operator === null) {                               // if Operator is null,
                return;                                             // returning
            }
            flushOperation(parseInt(buffer));                       // Doing Operation second operation
            operator = null;                                        // putting Operator to null for after operation
            buffer = "" + total;                                    // Adding total to buffer , converting it into string
            total = 0;                                              // setting total to 0
            break;                                                  // BREAKING the function
        case "←":                                            // IF the case is ← , then
            if (buffer.length === 1) {                              // if buffer is 1 finger number
                buffer = "0";                                       // Simply converting it to 0
            } else {
                buffer = buffer.substring(0, buffer.length - 1)     // Else, reducing a num from buffer, which is a string.
            }
            break;                                                  // BREAKING function.
        case "+": // Future USE
        case "-": // Future USE
        case "×": // Future USE
        case "÷": // Future USE
        default:                                              // DEFAULT CASE
            handleMath(value);                                      // doing Math
            break;
    }
}

// prepairing for doing math.
function  handleMath(value) {

    // converting buffer into and int
    const intBuffer = parseInt(buffer);

    // if total is zero, adding 0 into total so we can add to it.
    if (total === 0 ) {
        total = intBuffer

    // Seing Operation and doing the math in flushOperation() function. on line 81
    } else {
        flushOperation(intBuffer)
    }

    // puting operator into operation variable.
    operator = value;

    // changing buffer to 0, for next value.
    buffer = "0"
}

// Doing Math Operation on total,
function flushOperation(intBuffer){

    // if the Operation is + plus, add the buffer value ( converted int0 int on line 63) to total.
    if ( operator === "+"){
        total += intBuffer;

    // Else if the Operation is - minus, minusing the buffer value ( converted int0 int on line 63) from total
    } else if ( operator === "-"){
        total -= intBuffer;

    // Else if the Operation is X Multiplication, Multiplying the buffer value ( converted into int on line 63) with total
    } else if ( operator === "X"){
        total *= intBuffer;

    // Else if the Operation is difinatly is division, dividing the buffer value ( converted into int on line 63) with total
    } else {
        total /= intBuffer;
    }
}

// showing the result on display, or clearing display to 0
function rerender(){
    display.innerText = buffer
}

function init() {
    document.querySelector(".button-container").addEventListener("click", function (event) {
        buttonClick(event.target.innerText);
    })
}

init();