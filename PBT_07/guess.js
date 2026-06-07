let randomNumber;
let turnsLeft;
let guessedNumbers;

function initGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  turnsLeft = 7;
  guessedNumbers = [];

  document.getElementById("turns-left").textContent = turnsLeft;
  document.getElementById("guess-input").value = "";
  document.getElementById("guess-input").disabled = false;
  document.getElementById("btn-guess").disabled = false;

  document.getElementById("hint-msg").textContent =
    "Nhập số từ 1 đến 100 và nhấn Đoán!";

  document.getElementById("result-msg").textContent = "";
  document.getElementById("guessed-list").textContent = "";

  document.getElementById("btn-restart").style.display = "none";
}

function makeGuess() {
  let input = document.getElementById("guess-input").value;
  let guess = Number(input);

  if (guess < 1 || guess > 100 || input === "") {
    document.getElementById("hint-msg").textContent =
      "Vui lòng nhập số từ 1 đến 100!";
    return;
  }

  if (guessedNumbers.includes(guess)) {
    document.getElementById("hint-msg").textContent = "Bạn đã đoán số này rồi!";
    return;
  }

  guessedNumbers.push(guess);
  turnsLeft--;

  document.getElementById("turns-left").textContent = turnsLeft;

  document.getElementById("guessed-list").textContent =
    "Đã đoán: " + guessedNumbers.join(", ");

  if (guess === randomNumber) {
    let total = 7 - turnsLeft;

    document.getElementById("result-msg").textContent =
      "Bạn đoán đúng sau " + total + " lần!";

    document.getElementById("guess-input").disabled = true;
    document.getElementById("btn-guess").disabled = true;

    document.getElementById("btn-restart").style.display = "block";
  } else if (turnsLeft === 0) {
    document.getElementById("result-msg").textContent =
      "Bạn đã thua! Đáp án là " + randomNumber;

    document.getElementById("guess-input").disabled = true;
    document.getElementById("btn-guess").disabled = true;

    document.getElementById("btn-restart").style.display = "block";
  } else if (guess < randomNumber) {
    document.getElementById("hint-msg").textContent = "Cao hơn!";
  } else {
    document.getElementById("hint-msg").textContent = "Thấp hơn!";
  }

  document.getElementById("guess-input").value = "";
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    makeGuess();
  }
}
