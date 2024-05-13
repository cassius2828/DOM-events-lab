///////////////////////////
// ! This is my advanced solution after working with
// ! the instructor for the classes preferred approach

/*
This calculator is able to handle complex calculations,
follow pemdas,
reset
display the answers on the screen
prevent leading zeros
prevent starting with an operator
and more. 

*/
///////////////////////////

// LOGIC FOR OPERATORS (FUNC)

// op is add
function add(x, y) {
  return x + y;
}
// op is sub
function subtract(x, y) {
  return x - y;
}
// op is mult
function multiply(x, y) {
  return x * y;
}
// op is divide
function divide(x, y) {
  return x / y;
}

// CALCULATE OBJ WITH OPERATOR METHODS
const calculate = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

// QUERY SELECTORS
const calculatorEl = document.querySelector(".calculator");
const display = document.querySelector(".display");

// CALCULATOR NUMS + OPERATOR
let numbers = [];
let tempNum = "";
let operators = [];
let tempOperator = "";
let combinedArr = [];
let answer;
let tempDisplay = [];

// REGEX
const operatorRegex = /[*\/+\-]/;
const numberRegex = /^\d$/;

// *  KEYDOWN EVENTLISTENER
document.addEventListener("keydown", function (e) {
  // NUMBERS
  if (display.innerText === "0" && e.key === 0) return;
  if (tempOperator.length > 0) {
    tempOperator = "";
  }
  if (numberRegex.test(e.key) && tempOperator.length === 0) {
    // prevents leading zeros
    if(tempNum === '0') {
        tempNum = ''
    }
    tempNum += e.key;
    display.innerText = tempNum;
  }
  //   OPERATORS
  if (operatorRegex.test(e.key)) {
    if (!tempNum) return;
    tempOperator += e.key;
    combinedArr.push(tempNum, tempOperator);
    console.log(combinedArr);
    tempNum = "";
    display.innerText = tempOperator;
  }
});

// * MAIN EVENT LISTENSER (CLICK)
calculatorEl.addEventListener("click", (e) => calculatorLogic(e));

// RESET FUNCTION
function reset() {
  tempNum = "";
  tempOperator = "";

  display.innerText = "0";

  combinedArr = [];
}
// DISPLAY FUNC
function renderCalculatorDisplay() {
  if (combinedArr.length < 1) display.innerText = tempNum;
  else if (combinedArr.length < 2) display.innerText = tempNum + tempOperator;
}

// * CALUCLATOR LOGIC FUNCTION
function calculatorLogic(e) {
  if (e.target.className === "operand" && tempOperator.length === 0) {
    if (!tempNum) return;
    tempOperator = e.target.innerText;
    //
    combinedArr.push(tempNum, tempOperator);
    console.log(combinedArr);
    tempNum = "";
    display.innerText = tempOperator;
  }

  //   IF EQUALS
  if (e.target.classList.contains("equals")) {
    combinedArr.push(tempNum);
    console.log(combinedArr);
    if (combinedArr.length < 4 && !combinedArr.includes("+" || "-")) {
      while (combinedArr.length > 4) {
        let tempSum;
        ///////////////////////////
        // ! CAAS (Calculate Addition & Subtraction)
        ///////////////////////////
        // * this will calculate the addition or subtraction operator
        // all mult and div have already ran, so these are spliced from the beginning
        // of the array and calculate the sum, saving it in a tempSum in the given loop
        tempSum = calculate[combinedArr[1]](
          Number(combinedArr[0]),
          Number(combinedArr[2])
        );
        combinedArr.splice(0, 3, tempSum);
      }
    }
    tempNum = "";
    tempOperator = "";

    ///////////////////////////
    //  start our recursive loop to get all values
    ///////////////////////////
    ///////////////////////////
    // ! CMAD (Calculate Mult & Div)
    ///////////////////////////
    console.log(combinedArr);
    if (combinedArr.includes("*" || "/")) {
      while (combinedArr.includes("*" || "/")) {
        for (let i = 0; i < combinedArr.length; i++) {
          if (combinedArr[i] === "*" || combinedArr[i] === "/") {
            let tempSum;

            tempSum = calculate[combinedArr[i]](
              Number(combinedArr[i - 1]),
              Number(combinedArr[i + 1])
            );
            combinedArr.splice(i - 1, 3, tempSum);
          }
        }
      }
    }

    // continues to splice the beginning of the array, addition and sub only now
    while (combinedArr.length > 3) {
      let tempSum;
      ///////////////////////////
      // ! CAAS (Calculate Addition & Subtraction)
      ///////////////////////////
      // * this will calculate the addition or subtraction operator
      // all mult and div have already ran, so these are spliced from the beginning
      // of the array and calculate the sum, saving it in a tempSum in the given loop
      tempSum = calculate[combinedArr[1]](
        Number(combinedArr[0]),
        Number(combinedArr[2])
      );
      combinedArr.splice(0, 3, tempSum);
    }

    ///////////////////////////
    // ! CAAS
    ///////////////////////////
    console.log(combinedArr);

    // ending in mult or div leaves 1 item in array, while ending in add or sub
    // leaves 3 in array. This filters the answer based on that
    if (combinedArr.length > 1) {
      answer = calculate[combinedArr[1]](
        Number(combinedArr[0]),
        Number(combinedArr[2])
      );
    } else {
      answer = combinedArr[0];
    }

    // displays answer
    display.innerText = answer;
    // resets array to empty after calculation
    combinedArr = [];
  }

  //   IF NUMBER
  if (e.target.classList.contains("number")) {
    // stops from adding leading zeros
    if (display.innerText === "0" && e.target.classList.contains("zero"))
      return;
    console.log(display.innerText);

    if (tempOperator.length > 0) {
      tempOperator = "";
    }
    tempNum += e.target.innerText;
    display.innerText = tempNum;
    console.log("below is temp num");
    console.log(tempNum);
    console.log(numbers);
    // renderCalculatorDisplay();
  }

  // IF RESET
  if (e.target.classList.contains("reset")) {
    reset();
    console.log(combinedArr);
  }
}

// at some point the user would do this

// console.log(calculate[selectedOperation](10,5))
// user wants to add 5 + 7

// user wants 6 * 6
// calculate[selectedOperation](6, 6);

/*
    calculate['*']
    - will return the method provided by the key accessed
    - this is a method of the calculate obj we created
    - calculate[selectedOperation](5,7);
    // using commas instead of the plus makes it easier to add things together and
    // will be compatible with objects and complex data structures
    // remember, you can enter an unlimited amount of things in console.log
    
    */

/*
    - when setting the event listener to the parent el, anything inside of the parent that is also
    clicked will be shown the target
    - this is called delagation
    
    *Checking your code
    you should be checking your code very often to catch any bugs and minimize the 
    risk of having to go through long pieces of coded to fix 
    */

///////////////////////////
// next problem
///////////////////////////

/*
    1. select op
    2. click =
    3. run func that is rep by the op
    4. calculate[operand](3,12)
    
    
    
    - typically when we have a function taht updates the DOM,
    we start the func name with the word render
    
    
    ...args for functions
    
    */

// ex:
// IF OPERATOR
//   if (!tempNum) {
//     reset();
//   }
