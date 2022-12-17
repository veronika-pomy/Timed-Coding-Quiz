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
        question: "Select all keywords that  can be used to define a variable in Javascript?",
        choiceA: "var",
        choiceB: "let",
        choiceC: "const",
        choiceD: "All of the above",
        rightAnswer: "All of the above",
    },
    question3 = {
        question: "Select all methods that can be used to access HTML elements using Javascript?",
        choiceA: "getElementById()",
        choiceB: "querySelector",
        choiceC: "getElementByClassName()",
        choiceD: "All of the above",
        rightAnswer: "All of the above",
    },
    question4 = {
        question: "Select all ways a datatype can be declared to be a constant type?",
        choiceA: "const",
        choiceB: "let",
        choiceC: "var",
        choiceD: "All of the above",
        rightAnswer: "const",
    },
    question5 = {
        question: "Which of the following methods can be used to display data in the console?",
        choiceA: "document.write()",
        choiceB: "window.alert()",
        choiceC: "console.log()",
        choiceD: "All of the above",
        rightAnswer: "console.log()",
    },
    question6 = {
        question: "Which of the following types represents two values, true and false?",
        choiceA: "bigInt",
        choiceB: "number",
        choiceC: "string",
        choiceD: "boolean",
        rightAnswer: "boolean",
    },
    question7 = {
        question: "What keyword is used to check whether a given property is valid or not?",
        choiceA: "in",
        choiceB: "is in",
        choiceC: "exists",
        choiceD: "lies",
        rightAnswer: "in",
    },
    question8 = {
        question: "What is the use of the <noscript> tag in Javascript?",
        choiceA: "Clear cookies",
        choiceB: "To display contents by non-Javascript browsers",
        choiceC: "Both A and B",
        choiceD: "None of the above",
        rightAnswer: "To display contents by non-Javascript browsers",
    },
];

// store html tag displaying countdown
const countDownEl = document.querySelector("#count-down"); 
// store button el
const buttonEl = document.querySelector("#start-button"); 
// store the div where messages to the user will be displayed 
const mainWrapperEl = document.querySelector(".message");
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
// set increment interval to be 1000 milliseconds
var incremetInt = 1000;
// define user score variable 
var userScore= 0;
// define 10 sec penalty for wrong answer
var penalty = 10;
// define the objet that will store user's initials and score as a global variable 
var lastScore = null;
// make timer var globally available to be able to stop the timer inside askQuestions () 
var timer; 

// function to countdown
function countDown ( ) {
    timer = setInterval ( function ( ) {
        startSecondsEl--; // decreasing time 
        countDownEl.textContent = `${startSecondsEl} seconds`;

        if (startSecondsEl < 0) {
            clearInterval (timer);
            saveUserScore ( );
        };
    },incremetInt);
};

// function to display and save user score 
function saveUserScore ( ) {
    document.querySelector("#count-down").textContent = "Finished!";
    questionEl.textContent = `Your score is ${userScore}`;
    
    // remove multiple choice els when quiz is done 
    var children = document.querySelectorAll(".child");
    for (i = 0; i < children.length; i++){
        multChoiceEl.removeChild(children[i]);
    }

    // ask if user wants to save score 
    var askToSave = document.createElement("p");
    var userNo = document.createElement("button"); 
    var userYes = document.createElement("button");
    askToSave.textContent = "Would you like to save your score?";
    userNo.textContent = "No";
    userYes.textContent = "Yes";
    mainWrapperEl.appendChild(askToSave);
    mainWrapperEl.appendChild(userNo);
    mainWrapperEl.appendChild(userYes);

    // if user clicks "Yes" btn, create fields for user to enter initials
    userYes.addEventListener("click", function () {
        var userInitials = document.createElement("input");
        userInitials.setAttribute("placeholder","Please Enter Your Initials");
        mainWrapperEl.appendChild(userInitials);
        var saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        mainWrapperEl.appendChild(saveBtn);

        // when user clicks "Save"
        saveBtn.addEventListener("click", function ( ) {
           // check to see if user made an entry, if not - assign "Anonymous" instead of initials 
            if (userInitials.value === "") {
                userInitials.value = "Anonymous";
            };
            // if there was a user's score saved before the game, it will be displayed under new user's entry
            if (lastScore !== null) {
                var lastScore = JSON.parse(localStorage.getItem("userScore"));
                var lastUser = document.createElement("p");
                lastUser.textContent = `Last User: ${lastScore.user}`;
                mainWrapperEl.appendChild(lastUser);
                var lastUserScore = document.createElement("p");
                lastUserScore.textContent = `Last User's Score: ${lastScore.score}`;
                mainWrapperEl.appendChild(lastUserScore);
            };

            var savedUserScores = {
                user: userInitials.value.trim( ),
                score: userScore,
            };

            localStorage.setItem("userScore", JSON.stringify(savedUserScores));

            var lastScore = JSON.parse(localStorage.getItem("userScore"));
        }); 
    });

     // if user clicks "No" btn
     userNo.addEventListener("click", function () {
        var message = document.createElement("p");
        message.textContent = "Thanks for playing!";
        mainWrapperEl.appendChild(message);
    });
};

// function to insert buttons with mult choice and inserts then into li els
function writeQuestions ( ) {
    questionEl.textContent = questionsArr[startIndex].question;
    const buttonChoiceA = choiceA.innerHTML = `<button>${questionsArr[startIndex].choiceA}</button>`;
    const buttonChoiceB = choiceB.innerHTML = `<button>${questionsArr[startIndex].choiceB}</button>`;
    const buttonChoiceC = choiceC.innerHTML = `<button>${questionsArr[startIndex].choiceC}</button>`;
    const buttonChoiceD = choiceD.innerHTML = `<button>${questionsArr[startIndex].choiceD}</button>`;
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
                console.log("correct");
            } else {
                // decrease current timer time by 10 secs if answer is wrong
                var timeNow = document.querySelector("#count-down").textContent.split(" ")[0];
                console.log("wrong");
                var newTime = timeNow - penalty;
                startSecondsEl = newTime;
            };
        };

        // increment index to move on to the next question when any answer is selected
        startIndex++; 

        if (startIndex < questionsArr.length) {
            writeQuestions (startIndex);   
        } else {
            // display and save score after the last question is answered
            saveUserScore ( );
            clearInterval (timer);
        };
    }
)};

// function calls countDown() and writeQuestions()
function beginQuiz ( ) {
    countDown( );
    askQuestions( );
};

// Event listener to start quiz when the "start button is clicked"
buttonEl.addEventListener("click", beginQuiz);