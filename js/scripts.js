"use strict";

const billInput = document.querySelector("#bill-input");
const customTipInput = document.querySelector(".custom-tip-input");
const numberOfPeopleInput = document.querySelector("#number-of-people-input");
const tipAmountValue = document.querySelector(".tip-amount-value");
const totalValue = document.querySelector(".total-value");
const btnReset = document.querySelector(".btn-reset");
const selectTipBtns = document.querySelectorAll(".select-tip-percentage");

btnReset.addEventListener("click", (event) => {
  // Reset the inputs and values
  billInput.value = "0";
  customTipInput.value = "";
  numberOfPeopleInput.value = "1";
  tipAmountValue.innerHTML = "$0";
  totalValue.innerHTML = "$0";

  // Reset the tip percentage btns
  selectTipBtns.forEach((tipBtn) => {
    tipBtn.classList.remove("active");
  });

  // Set 15% as the default tip percentage
  selectTipBtns[2].classList.add("active");
});

// Make the tip percentage btns clickable
selectTipBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    selectTipBtns.forEach((tipBtn) => {
      tipBtn.classList.remove("active");
    });

    if (event.target.classList.contains("custom-tip-input")) {
      event.target.parentElement.classList.add("active");
    } else {
      event.target.classList.add("active");
    }

    calculateTip();
  });
});

const calculateTip = () => {
  const billValue = parseFloat(billInput.value);
  const numberOfPeople = parseFloat(numberOfPeopleInput.value);
  const customTipActive = document.querySelector(".select-tip-custom.active");
  let tipPercentage = parseInt(
    document.querySelector(".select-tip-percentage.active").dataset.percentage
  );

  if (customTipActive) {
    tipPercentage = parseFloat(
      document.querySelector(".custom-tip-input").value
    );
  }

  const totalAmount = parseFloat((tipPercentage / 100) * billValue).toFixed(2);
  const tipAmount = parseFloat(totalAmount / numberOfPeople).toFixed(2);
  const actualTotalAmount = parseFloat(
    (billValue + parseFloat(totalAmount)) / numberOfPeople
  ).toFixed(2);

  tipAmountValue.innerHTML = `$${tipAmount}`;
  totalValue.innerHTML = `$${actualTotalAmount}`;
};

const isNumber = (value) => {
  // Allow Exceptions
  if (
    value === "Backspace" ||
    value === "ArrowLeft" ||
    value === "ArrowRight" ||
    value === "."
  ) {
    return true;
  }

  const regex = /^[0-9]+$/;

  return regex.test(value);
};

// Calculate the tip
billInput.addEventListener("keyup", (event) => {
  calculateTip();
});
customTipInput.addEventListener("keyup", (event) => {
  calculateTip();
});
numberOfPeopleInput.addEventListener("keyup", (event) => {
  calculateTip();
});

// Prevent alphabetical characters from being entered
billInput.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
customTipInput.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
numberOfPeopleInput.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
