const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let secretNumber = randomInRange(0, 100);
let numAttempts = 5;

function checkGuess(num) {
  if (num > secretNumber) {
    console.log("Too high.");
    return false;
  } else if (num < secretNumber) {
    console.log("Too low.");
    return false;
  } else {
    console.log("Correct!");
    return true;
  }
}

function askGuess() {
  numAttempts--;

  rl.question("Enter a guess: ", answer => {
    if (numAttempts === 0) {
      console.log("You Lose!");
      rl.close();
    } else if ( checkGuess(answer) ) {
      console.log("You Win!");
      rl.close();
    } else {
      console.log(`You have ${numAttempts} attempts left.`);
      askGuess();
    }
  });
}

function randomInRange(min, max) {
  minimum = Math.ceil(min);
  maximum = Math.floor(max);

  return Math.floor(Math.random() * (maximum - minimum) + minimum)
}

function askRange() {
  const range = [];

  rl.question("Enter a min number: ", min => {
    const minimum = Number(min);
    range.push(minimum);

    rl.question("Enter a max number: ", max => {
      const maximum = Number(max);
      range.push(maximum);
      console.log(`I'm thinking of a number between ${minimum} and ${maximum}...`)
      secretNumber = randomInRange(...range);

      askGuess();
    });
  });
}

function askLimit() {
  rl.question("Enter the number of attempts: ", attempts => {
    numAttempts = attempts;
    askRange();
  })
}

askLimit();
