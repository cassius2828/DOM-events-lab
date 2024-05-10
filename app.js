/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
const btns = document.querySelectorAll(".button");
const reset = document.querySelector(".reset");
const equals = document.querySelector(".equals");
const display = document.querySelector(".display");

///////////////////////////
// memory variable to store our btn entries
///////////////////////////
let memory = "";


///////////////////////////
// give each btn an event listener
///////////////////////////
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
//  removes the leading zero when user starts pushing btns
    if (display.innerText === "0") {
      display.innerText = "";
    }
    // add to the display text
    display.innerText += e.target.innerText;
    memory = display.innerText;
    console.log(memory + " this is the current memory");
  });
});

//////////////////////////////////////////////////////
// regex | separating numbers & operators
//////////////////////////////////////////////////////
const regexNums = /[0-9]+/g;
const regexOps = /\D+/g;
let findNums;
let findOps;
console.log(findNums);


///////////////////////////
// Calculate Function
///////////////////////////
const calculateAnswer = () => {
    // run our regex
  findNums = memory.match(regexNums);
  findOps = memory.match(regexOps);

//   sets the type of our nums to number so we can calculate the total
  findNums[0] = Number(findNums[0]);
  findNums[1] = Number(findNums[1]);

// determines the type of operation run
  if (findOps[0] === "*") {
    display.innerText = findNums[0] * findNums[1];
  }
  if (findOps[0] === "+") {
    display.innerText = findNums[0] + findNums[1];
  }
  if (findOps[0] === "-") {
    display.innerText = findNums[0] - findNums[1];
  }
  if (findOps[0] === "/") {
    display.innerText = findNums[0] / findNums[1];
  }
};


///////////////////////////
// calculate the answer
///////////////////////////
equals.addEventListener("click", calculateAnswer);


///////////////////////////
// reset the calculator
///////////////////////////
reset.addEventListener("click", () => {
  display.innerHTML = "0";
});
/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/
