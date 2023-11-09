const buttons = document.querySelectorAll("[data-number]");
const operation = document.querySelectorAll("[data-operation]");
const equals = document.querySelector("[data-equals]");
const allClear = document.querySelector("[data-all-clear]");
const characterDelete = document.querySelector("[data-delete]");
const outputPreviousOperand = document.querySelector("[data-previous-operand]");
const outputCurrentOperand = document.querySelector("[data-current-operand]");

const updateDisplay = () => {
  buttons.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      const btnClicked = evt.target.innerHTML;
      if (btnClicked === "." && outputCurrentOperand.innerHTML.includes("."))
        return;
      outputCurrentOperand.innerHTML += btnClicked;
    });
  });
};
updateDisplay();

const clearAll = () => {
  allClear.addEventListener("click", () => {
    outputCurrentOperand.innerHTML = "";
    outputPreviousOperand.innerHTML = "";
  });
};
clearAll();

const deleteChar = () => {
  characterDelete.addEventListener("click", () => {
    const sliced = outputCurrentOperand.innerHTML.slice(0, -1);
    outputCurrentOperand.innerHTML = sliced;
  });
};
deleteChar();

const chooseOperation = () => {
  operation.forEach((opera) => {
    opera.addEventListener("click", (evt) => {
      operationClicked = evt.target.innerHTML;
      if (outputCurrentOperand.innerHTML === "") return;
      if (outputPreviousOperand !== "") {
        compute();
      }
      outputPreviousOperand.innerHTML +=
        outputCurrentOperand.innerHTML + operationClicked;
      outputCurrentOperand.innerHTML = "";
    });
  });
};
chooseOperation();

const compute = () => {
  let computation;
  var prev = parseFloat(outputPreviousOperand.innerHTML);
  var current = parseFloat(outputCurrentOperand.innerHTML);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operationClicked) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "÷":
      computation = prev / current;
      break;
    case "*":
      computation = prev * current;
      break;

    default:
      return;
  }
  outputCurrentOperand.innerHTML = computation;
  outputPreviousOperand.innerHTML = "";
};

equals.addEventListener("click", () => {
  compute();
});
