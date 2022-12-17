// create multiple choice questions and define them as objects
const questionsArr = [
    question1 = {
        question: "Javascript is an _______ language?",
        choiceA: "Object-Oriented",
        choiceB: "Object-Based",
        choiceC: "Procedural",
        choiceD: "None of the above",
        rightAnswer: "Object-Oriented",
    },
    question2 = {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choiceA: "var",
        choiceB: "let",
        choiceC: "const",
        choiceD: "All of the above",
        rightAnswer: "All of the above",

    }
];

// store html tag displaying countdown
const countDownEl = document.querySelector("#count-down"); 
// store button el
const buttonEl = document.querySelector("#start-button"); 
// store h3 tag that question will be inserted into
const questionEl = document.querySelector("#message"); 
// store the ul that contains mult choice lis 
const multChoiceEl = document.querySelector("#mult-choice");
// store lis for multiple choice answers
const choiceA = document.querySelector("#choice-a"); 
const choiceB = document.querySelector("#choice-b"); 
const choiceC = document.querySelector("#choice-c"); 
const choiceD = document.querySelector("#choice-d"); 

// start timer at 60 seconds 
var startSecondsEl = 60;
// set increment interval to be 1000 milliseconds at the start
var incremetInt = 1000;
// define var that will show the most recent score
var userScore= 0;
// define 10 sec penalty for wrong answer
var penalty = 10;

// function to display user score 
function displayUserScore () {
    startSecondsEl = 0; // makes sure countDown() won't run again
    document.querySelector("#count-down").textContent = `Time's up!`;
    questionEl.textContent = `Your score is ${userScore}`;
    // remove multiple choice els when quiz is done 
    var children = document.querySelectorAll(".child")
    for (i = 0; i < children.length; i++){
        multChoiceEl.removeChild(children[i]);
    }
}

// function to countdown
function countDown ( ) {
    timer = setInterval ( function ( ) {
        if (startSecondsEl > 0) {
            var secondsRemains = startSecondsEl;
            startSecondsEl--; // decreasing time 
            countDownEl.textContent = `${secondsRemains} seconds`;
        } else {
            countDownEl.textContent = `Time's up!`;
            displayUserScore ();
        }
    },incremetInt);
};

// funciton that presents questions to user, validates answeres and counts score
let startIndex = 0; // always start with the first question 
function askQuestions ( ) {
    writeQuestions (startIndex);
    multChoiceEl.addEventListener("click", function (event) {
        var element = event.target;
        if (element.matches("button") === true) {
            if (element.textContent === questionsArr[startIndex].rightAnswer) {
                userScore++;
                console.log(userScore);
                console.log("correct!");
            } else {
                console.log("wrong!");
                // decrease current timer time by 10 secs if answer wrong
                var timeNow = document.querySelector("#count-down").textContent.split(" ")[0];
                var newTime = timeNow - penalty;
                startSecondsEl = newTime;
            };
        };
        // increment index to move on to the next question when any answer is selected
        startIndex++; 

        if (startIndex < questionsArr.length) {
            writeQuestions (startIndex);   
        } else {
            displayUserScore ( );
        };
    }
)};

// function that creates buttons with mult choice and inserts then into li els
function writeQuestions ( ) {
    questionEl.textContent = questionsArr[startIndex].question;
    const buttonChoiceA = choiceA.innerHTML = `<button>${questionsArr[startIndex].choiceA}</button>`;
    const buttonChoiceB = choiceB.innerHTML = `<button>${questionsArr[startIndex].choiceB}</button>`;
    const buttonChoiceC = choiceC.innerHTML = `<button>${questionsArr[startIndex].choiceC}</button>`;
    const buttonChoiceD = choiceD.innerHTML = `<button>${questionsArr[startIndex].choiceD}</button>`;
};

// function calls countDown() and writeQuestions()
function beginQuiz ( ) {
    countDown();
    askQuestions();
};

// Event listener to start quiz when the "start button is clicked"
// !!! Fix that when the button is clicked twice the timer goes faster
buttonEl.addEventListener("click", beginQuiz);