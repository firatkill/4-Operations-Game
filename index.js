const scoreInput = document.querySelector("#scoreInput");
const timeInput = document.querySelector("#timeInput");
const operationSpan = document.querySelector("#operationSpan");
const resultInput = document.querySelector("#resultInput");
const buttons = document.querySelector(".parent");
const selectButtons = document.querySelector("#selectButtons");
const startButton = document.querySelector("#startButton");
const scoreTable = document.querySelector("#endingScore");

timeInput.value = 0;

let selectedOperator = "";
let result = "";
let score = 0;
let startTimer;
let timeLeft = 60;
//eventListeners
startButton.addEventListener("click", startGame);
selectButtons.addEventListener("click", selectOperator);
buttons.addEventListener("click", updateInput);

//Functions
function endGame() {
  document.querySelector("#operatingScreen").classList.replace("show", "hide");
  document.querySelector("#scoreTable").classList.replace("hide", "show");

  scoreTable.textContent = score;
  if (score == 5) {
    scoreTable.className = "bg-secondary";
  } else if (score > 5) {
    scoreTable.className = "bg-success";
  } else {
    scoreTable.className = "bg-danger";
  }
}

function callInterval() {
  let timeInterval = setInterval(() => {
    timeLeft--;
    timeInput.value = timeLeft;
    if (timeLeft == 0) {
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);
}

let myInterval = setInterval(() => {
  startTimer--;
  operationSpan.textContent = startTimer;
  if (startTimer == 0) {
    clearInterval(myInterval);
    generateQuestion(selectedOperator);
    timeLeft = 60;
    callInterval();
  }
}, 1000);
function startSequence() {
  startTimer = 3;
  operationSpan.textContent = startTimer;
  myInterval();
}
function startGame() {
  startButton.classList.replace("show", "hide");
  operationSpan.classList.replace("hide", "show");
  startSequence();
}
function updateScore() {
  scoreInput.value = score;
}
function wrongAnswer() {
  if (operationSpan.classList.contains("bg-secondary")) {
    operationSpan.classList.replace("bg-secondary", "bg-danger");
  } else if (operationSpan.classList.contains("bg-success")) {
    operationSpan.classList.replace("bg-success", "bg-danger");
  }
  generateQuestion(selectedOperator);
  score--;
  updateScore();
  resultInput.value = "";
}

function correctAnswer() {
  if (operationSpan.classList.contains("bg-secondary")) {
    operationSpan.classList.replace("bg-secondary", "bg-success");
  } else if (operationSpan.classList.contains("bg-danger")) {
    operationSpan.classList.replace("bg-danger", "bg-success");
  }
  generateQuestion(selectedOperator);
  score++;
  updateScore();
  resultInput.value = "";
}

function controlResult(value) {
  if (value == result) {
    correctAnswer();
  } else {
    wrongAnswer();
  }
}

function updateInput(e) {
  if (
    e.target.classList.contains("btn") &&
    e.target.textContent != "ENTER" &&
    e.target.textContent != "DELETE"
  ) {
    resultInput.value += e.target.textContent;
  } else if (e.target.textContent == "ENTER") {
    controlResult(resultInput.value);
  } else if (e.target.textContent == "DELETE") {
    let resultInputValue = resultInput.value.split("");
    resultInput.value = resultInputValue
      .slice(0, resultInput.value.length - 1)
      .join("");
  }
}

function generateQuestion(operator) {
  console.log(operator);
  if (operator == "ADDITION" || operator == "SUBTRACTION") {
    if (operator == "ADDITION") {
      let number1 = Math.round(Math.random() * 1000);
      let number2 = Math.round(Math.random() * 1000);
      result = number1 + number2;
      operationSpan.textContent = `${number1} + ${number2}`;
    } else {
      let number1 = Math.round(Math.random() * 1000);
      let number2 = Math.round(Math.random() * 1000);
      result = number1 - number2;
      operationSpan.textContent = `${number1} - ${number2}`;
    }
  } else {
    if (operator == "DIVISION") {
      let number1 = Math.round(Math.random() * 50);
      let number2 = Math.round(Math.random() * 30);
      let number3 = number1 * number2;
      operationSpan.textContent = `${number3}
       / ${number2}`;
    } else {
      let number1 = Math.round(Math.random() * 100);
      let number2 = Math.round(Math.random() * 100);
      result = number1 * number2;
      operationSpan.textContent = `${number1} x ${number2}`;
    }
  }
}

function nextContent() {
  document.querySelector("#selectScreen").classList.replace("show", "hide");
  document.querySelector("#operatingScreen").classList.replace("hide", "show");
}

function selectOperator(e) {
  if (e.target.classList.contains("btn")) {
    selectedOperator = e.target.textContent;
    nextContent();
    console.log(selectedOperator);
  }
}
