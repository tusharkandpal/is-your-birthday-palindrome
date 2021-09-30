const dateOfBirth = document.querySelector("#input-date");
const checkBtn = document.querySelector("#check-btn");
const output = document.querySelector("#output");

function reverseString(str) {
  return str.split("").reverse().join("");
}

function findPalindrome(str) {
  let reversedStr = reverseString(str);

  return str === reversedStr;
}

function convertDateToStr(dob) {
  let dateStr = { day: "", month: "", year: "" };

  if (dob.day < 10) dateStr.day = "0" + dob.day;
  else dateStr.day = dob.day.toString();

  if (dob.month < 10) dateStr.month = "0" + dob.month;
  else dateStr.month = dob.month.toString();

  dateStr.year = dob.year.toString();

  return dateStr;
}

function convertIntoAllDateFormats(dob) {
  let dobStr = convertDateToStr(dob);

  let ddmmyy = dobStr.day + dobStr.month + dobStr.year.slice(-2);
  let mmddyy = dobStr.month + dobStr.day + dobStr.year.slice(-2);
  let yymmdd = dobStr.year.slice(-2) + dobStr.month + dobStr.day;
  let ddmmyyyy = dobStr.day + dobStr.month + dobStr.year;
  let mmddyyyy = dobStr.month + dobStr.day + dobStr.year;
  let yyyymmdd = dobStr.year + dobStr.month + dobStr.day;

  return [ddmmyy, mmddyy, yymmdd, ddmmyyyy, mmddyyyy, yyyymmdd];
}

function checkPalindromeForAllDateFormats(dob) {
  let listOfAllDates = convertIntoAllDateFormats(dob);

  let isPalindrome = false;

  for (let eachDate of listOfAllDates) {
    if (findPalindrome(eachDate)) {
      isPalindrome = true;
      break;
    }
  }

  return isPalindrome;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

function getNextDate(dob) {
  let day = dob.day + 1;
  let month = dob.month;
  let year = dob.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(dob) {
  let counter = 0;

  let nextDate = getNextDate(dob);

  while (1) {
    counter++;
    let isPalindrome = checkPalindromeForAllDateFormats(nextDate);

    if (isPalindrome) break;

    nextDate = getNextDate(nextDate);
  }

  return [counter, nextDate];
}

// function getPreviousDate(dob) {
//   let day = dob.day - 1;
//   let month = dob.month;
//   let year = dob.year;

//   let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//   if (day < 1) {
//     day = daysInMonth[month - 2];
//     month--;
//   }

//   if (month < 1) {
//     month = 12;
//     year--;
//   }

//   return {
//     day: day,
//     month: month,
//     year: year,
//   };
// }

// function getPreviousPalindromeDate(dob) {
//   let counter = 0;

//   let previousDate = getPreviousDate(dob);

//   while (1) {
//     counter++;
//     let isPalindrome = checkPalindromeForAllDateFormats(previousDate);

//     if (isPalindrome) break;

//     previousDate = getPreviousDate(previousDate);
//   }

//   return [counter, previousDate];
// }

// function findNearestPalindromeDate(dob) {
//   let nextDateList = getNextPalindromeDate(dob);

//   let previousDateList = getPreviousPalindromeDate(dob);

//   if (previousDateList[0] < nextDateList[0]) {
//     return previousDateList;
//   } else return nextDateList;
// }

// console.log(getPreviousPalindromeDate(date));

function clickHandler() {
  let birthdate = dateOfBirth.value;

  if (birthdate !== "") {
    let listOfDates = birthdate.split("-");

    let date = {
      day: Number(listOfDates[2]),
      month: Number(listOfDates[1]),
      year: Number(listOfDates[0]),
    };

    let flag = checkPalindromeForAllDateFormats(date);

    if (flag) {
      output.innerHTML = `<span>Yay! your birthday is a palindrome 🥳✨</span>`;
    } else {
      let [missedDays, nextDate] = getNextPalindromeDate(date);

      output.innerHTML = `<p>Nope! your birthdate is not a palindrome 😥. The next palindrome date is <span>${nextDate.day}-${nextDate.month}-${nextDate.year}</span> ; missed it by <span>${missedDays}</span> days.</p>`;
    }
  }
  else
  {
    output.innerHTML = `<p style='color: red'>Please enter a date!</p>`;
  }
}

checkBtn.addEventListener("click", clickHandler);

