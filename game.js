"use strict";

const alphabetWords = document.querySelectorAll("button");
const warning = document.querySelector(".alert");
const lives = document.querySelector(".lives");
const word = document.querySelector(".word");
const question = document.querySelector(".question");
let currentValue = "-";

let gameEnd = false;

let obj = [
  {
    questions: "the city that have the tallest tower",
    answer: "hongkong",
  },
  {
    questions: "what the name of the snake that have the same name of a car",
    answer: "viper",
  },
  {
    questions: "the world biggest shark",
    answer: "whaleshark",
  },
  {
    questions: "the most expensive matter in the world",
    answer: "antimatter",
  },
];

let arr = [];
let pressed = [];

let score = 0;

let next = 0;

let r = "asda";

console.log(obj.length);

window.addEventListener("DOMContentLoaded", function () {
  creatSpan();
  question.textContent = obj[0].questions;
});

window.addEventListener("keydown", function (e) {
  if (!gameEnd) {
    const word = [...alphabetWords].map((item) => item.innerHTML);
    const display = document.querySelectorAll(".display");
    const mainObj = obj[next];
    const secondaryObj = obj[next + 1];
    alphabetWords.forEach((item) => {
      if (!e.repeat) {

        if (e.key == item.innerHTML) {

          display.forEach((item, index) => {
            item.classList.add(mainObj.answer[index]);
          });

          const check = document.querySelector(`.${e.key}`);

          const check2 =  document.querySelectorAll(`.${e.key}`);

          if (check == null) {
            lives.textContent = Number(lives.textContent) - 1;
          } else {

            if (mainObj.answer.indexOf(e.key) == mainObj.answer.lastIndexOf(e.key)) {
              preventDuplicate(check,e.key)
            } else {
              preventDuplicate(check2,e.key,true);
            }
          }
        }
      }
    });
    if (!word.includes(e.key)) {
      showText("you must enter one of the words above", "danger");
      setTimeout(() => {
        warning.textContent = "";
        warning.classList.remove("danger");
      }, 1500);
    }
    if (!Number(lives.textContent)) {
     WinOrLose(display,secondaryObj)
    }
    console.log(arr.length);
    if (arr.length == display.length && mainObj !== undefined) {
      score++;
     WinOrLose(display,secondaryObj)
      arr = [];
      pressed = [];
    }
  }
});

function showText(text, classes) {
  warning.textContent = text;
  warning.classList.add(classes);
}

function creatSpan() {
  if (!gameEnd) {
    for (let i = 0; i < obj[next].answer.length; i++) {
      let span = document.createElement("span");
      span.classList.add("display");
      span.textContent = currentValue;
      word.append(span);
    }
  }
}


function preventDuplicate(doc,key,value = false) {
  if(value == false) {
    if (!pressed.includes(key)) {
      doc.textContent = key;
      arr.push(key);
    }
    pressed.push(key);
  }
  if(value) {
    if (!pressed.includes(key)) {
      doc.forEach((word) => {
        word.textContent = key;
        arr.push(key);
      });
    }
    pressed.push(key);
  }
}


function nextQuestion(display) {
  display.forEach((_, index) => {
    document.querySelector(`.${obj[next].answer[index]}`).remove();
  });
  next++;
  question.textContent = obj[next].questions;
  creatSpan();
  lives.textContent = 10;
}


function WinOrLose(...rest) {
  if (rest[1] == undefined) {
    gameEnd = true;
    if (score > obj.length / 2) {
      showText(`you have one the game ${score}/${obj.length}`, "win");
    } else {
      showText(`you have lost the game ${score}/${obj.length}`, "danger");
    }
  } else {
    nextQuestion(rest[0]);
  }
}