// Get input elements
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

const currentDate = new Date();

// Get error elements
const dayError = document.getElementById('day-error');
const monthError = document.getElementById('month-error');
const yearError = document.getElementById('year-error');

// Get total elements
const yearsTotal = document.querySelector('.years-total');
const monthsTotal = document.querySelector('.months-total');
const daysTotal = document.querySelector('.days-total');

// Event listeners
dayInput.addEventListener('input', checkDayInput);
monthInput.addEventListener('input', checkMonthInput);
yearInput.addEventListener('input', checkYearInput);

// Arrow button
const arrowButton = document.getElementById('arrow');
arrowButton.addEventListener('mouseenter', () => {
  arrowButton.classList.toggle("filter-hover");
});
arrowButton.addEventListener('mouseleave', () => {
  arrowButton.classList.toggle("filter-hover");
});
arrowButton.addEventListener('click', calculateAge);

// Functions for input validation
function checkDayInput() {
  dayInput.classList.remove('error-input');
  const inputValue = dayInput.value;
  if (inputValue > 31) {
    dayError.innerHTML = 'Must be a valid day';
  } else {
    dayError.innerHTML = '';
  }
}

function checkMonthInput() {
  monthInput.classList.remove('error-input');
  const inputValue = monthInput.value;
  if (inputValue > 12) {
    monthError.innerHTML = 'Must be a valid month';
  } else {
    monthError.innerHTML = '';
  }
}

function checkYearInput() {
  yearInput.classList.remove('error-input');
  const inputValue = yearInput.value;
  const currentYear = currentDate.getFullYear();
  if (inputValue > currentYear) {
    yearError.innerHTML = `Year can't be greater than ${currentYear}`;
  } else {
    yearError.innerHTML = '';
  }
}

// Functions for input validation and date calculation
function checkForEmptyInput(date) {
  return isNaN(date);
}

function checkValidAndPastDate(day, month, year) {
  const inputDate = new Date(year, month - 1, day);
  if (
    inputDate.getFullYear() === year &&
    inputDate.getMonth() === month - 1 &&
    inputDate.getDate() === day
  ) {
    if (inputDate < currentDate) {
      return true;
    }
    dayError.innerHTML = 'Please enter a valid date';
    return false;
  } else {
    dayError.innerHTML = 'Please enter a valid date';
    return false;
  }
}

function validateDateInput() {
  const dayValue = parseInt(dayInput.value, 10);
  const monthValue = parseInt(monthInput.value, 10);
  const yearValue = parseInt(yearInput.value, 10);

  const emptyDay = checkForEmptyInput(dayValue);
  const emptyMonth = checkForEmptyInput(monthValue);
  const emptyYear = checkForEmptyInput(yearValue);

  if (emptyDay) {
    dayInput.classList.toggle('error-input');
    dayError.innerHTML = 'This field is required';
  }
  if (emptyMonth) {
    monthInput.classList.toggle('error-input');
    monthError.innerHTML = 'This field is required';
  }
  if (emptyYear) {
    yearInput.classList.toggle('error-input');
    yearError.innerHTML = 'This field is required';
  }

  if (!emptyDay && !emptyMonth && !emptyYear) {
    const validDate = checkValidAndPastDate(dayValue, monthValue, yearValue);
    if (validDate) {
      return true;
    }
  }
  return false;
}

function calculateAge() {
  const isDateValid = validateDateInput();
  if (isDateValid) {
    const birthDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageInMonths = currentDate.getMonth() - birthDate.getMonth();
    if (ageInMonths < 0) {
      ageInYears--;
      ageInMonths += 12;
    }
    let ageInDays = currentDate.getDate() - birthDate.getDate();
    if (ageInDays < 0) {
      const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, dayInput.value);
      ageInMonths--;
      ageInDays = Math.floor((currentDate - tempDate) / (1000 * 60 * 60 * 24));
      if (ageInMonths < 0) {
        ageInYears--;
        ageInMonths += 12;
      }
    }
    displayAge(ageInYears, ageInMonths, ageInDays);
  } else {
    clearDisplay();
  }
}

// Display age
function displayAge(yearsDisplay, monthsDisplay, daysDisplay) {
  yearsTotal.firstChild.textContent = yearsDisplay + " ";
  monthsTotal.firstChild.textContent = monthsDisplay + " ";
  daysTotal.firstChild.textContent = daysDisplay + " ";
}

// Clear display
function clearDisplay() {
  console.log("where is the bug?");
  yearsTotal.firstChild.textContent = "--";
  yearsTotal.lastChild.textContent = "years";
  monthsTotal.firstChild.textContent = "--";
  monthsTotal.lastChild.textContent = "months";
  daysTotal.firstChild.textContent = "--";
  daysTotal.lastChild.textContent = "days";
}

