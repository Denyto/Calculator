let numbers = document.querySelectorAll(".number"),
  operations = document.querySelectorAll(".operator"),
  clearBtns = document.querySelectorAll(".btn-clear"),
  decimalBtn = document.getElementById("decimal"),
  result = document.getElementById("result"),
  display = document.getElementById("display"),
  MemoryCurrentNumber = 0,
  MemoryNewNumber = false,
  MemoryPendingOperation = "";

function initNum(array, action) {
  for (i = 0; i < array.length; i++) {
    let number = array[i];
    number.addEventListener("click", function (e) {
      action(e.target.textContent);
    });
  }
}
initNum(numbers, numberPress);
initNum(operations, operationPress);
initNum(clearBtns, clear);

/*for (i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener("click", function (e) {
    numberPress(e.target.textContent);
  });
}
for (i = 0; i < operations.length; i++) {
  let number = operations[i];
  number.addEventListener("click", function (e) {
    operationPress(e.target.textContent);
  });
}
for (i = 0; i < clearBtns.length; i++) {
  let number = clearBtns[i];
  number.addEventListener("click", function (e) {
    clear(e.target.textContent);
  });
}*/
decimalBtn.addEventListener("click", decimal);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operationPress(oper) {
  localOperationMemory = display.value;
  if (MemoryNewNumber && MemoryPendingOperation !== "=") {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    switch (MemoryPendingOperation) {
      case "+":
        MemoryCurrentNumber += +localOperationMemory;
        break;
      case "-":
        MemoryCurrentNumber -= +localOperationMemory;
        break;
      case "*":
        MemoryCurrentNumber *= +localOperationMemory;
        break;
      case "/":
        MemoryCurrentNumber /= +localOperationMemory;
        break;
      default:
        MemoryCurrentNumber = +localOperationMemory;
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = oper;
  }
}

function decimal() {
  let localDecimalMemory = display.value;
  if (MemoryNewNumber && localDecimalMemory.indexOf(".") === -1) {
    localDecimalMemory += ".";
    MemoryNewNumber = false;
  } if (localDecimalMemory.indexOf(".") === -1) {
    localDecimalMemory += ".";
  }
  display.value = localDecimalMemory;
}

function clear(id) {
  if (id === "CE") {
    MemoryNewNumber = true;
    display.value = "0";
  }
  if (id === "C") {
    display.value = "0";
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = "";
  }
}
