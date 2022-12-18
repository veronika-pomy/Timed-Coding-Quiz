// create multiple choice questions and define them as objects
const questionsArr = [
    question1 = {
        question: "1. Javascript is an _______ language?",
        choiceA: "Object-Oriented",
        choiceB: "Object-Based",
        choiceC: "Procedural",
        choiceD: "None of the above",
        rightAnswer: "Object-Oriented",
    },
    question2 = {
        question: "2. Select all keywords that  can be used to define a variable in Javascript?",
        choiceA: "var",
        choiceB: "let",
        choiceC: "const",
        choiceD: "All of the above",
        rightAnswer: "All of the above",
    },
    question3 = {
        question: "3. Select all methods that can be used to access HTML elements using Javascript?",
        choiceA: "getElementById()",
        choiceB: "querySelector",
        choiceC: "getElementByClassName()",
        choiceD: "All of the above",
        rightAnswer: "All of the above",
    },
    question4 = {
        question: "4. Select all ways a datatype can be declared to be a constant type?",
        choiceA: "const",
        choiceB: "let",
        choiceC: "var",
        choiceD: "All of the above",
        rightAnswer: "const",
    },
    question5 = {
        question: "5. Which of the following methods can be used to display data in the console?",
        choiceA: "document.write()",
        choiceB: "window.alert()",
        choiceC: "console.log()",
        choiceD: "All of the above",
        rightAnswer: "console.log()",
    },
    question6 = {
        question: "6. Which of the following types represents two values, true and false?",
        choiceA: "bigInt",
        choiceB: "number",
        choiceC: "string",
        choiceD: "boolean",
        rightAnswer: "boolean",
    },
    question7 = {
        question: "7. What keyword is used to check whether a given property is valid or not?",
        choiceA: "in",
        choiceB: "is in",
        choiceC: "exists",
        choiceD: "lies",
        rightAnswer: "in",
    },
    question8 = {
        question: "8. What is the use of the <noscript> tag in Javascript?",
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
// store div that will show if the answer is right or wrong
const feedbackEl = document.querySelector("#feedback"); 

// start timer at 60 seconds 
var startSecondsEl = 60;
// set increment interval to be 1000 milliseconds
var incremetInt = 1000;
// define user score variable 
var userScore= 0;
// define 10 sec penalty for wrong answer
var penalty = 10;
// define var that will store user's initials and score as a global variable 
var lastScore;
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
    feedbackEl.textContent = "";
    document.querySelector("#count-down").textContent = "Finished!";
    questionEl.textContent = `Your score is ${userScore}`;
    
    // remove multiple choice els when quiz is done 
    var children = document.querySelectorAll(".child");
    for (i = 0; i < children.length; i++){
        multChoiceEl.removeChild(children[i]);
    }

    // ask if user wants to save score 
    var askToSave = document.createElement("p");
    askToSave.textContent = "Would you like to save your score?";
    mainWrapperEl.appendChild(askToSave);

    var userYes = document.createElement("button");
    userYes.textContent = "Yes";
    userYes.setAttribute("class", "choice-btn");
    mainWrapperEl.appendChild(userYes);

    var userNo = document.createElement("button"); 
    userNo.textContent = "No";
    userNo.setAttribute("class", "choice-btn");
    mainWrapperEl.appendChild(userNo);
    
    // if user clicks "Yes" btn, create fields for user to enter initials
    userYes.addEventListener("click", function () {
        // remove feedback div
        feedbackEl.textContent = "";

        var userInitials = document.createElement("input");
        userInitials.setAttribute("placeholder","Please Enter Your Initials");
        userInitials.setAttribute("class", "style");
        mainWrapperEl.appendChild(userInitials);

        var saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.setAttribute("class", "choice-btn");
        mainWrapperEl.appendChild(saveBtn);

        // if there was a user's score saved before the current game, it will be displayed under new user's entry
        lastScore = JSON.parse(localStorage.getItem("userScore"));
        if (lastScore != null) {

            var lastUser = document.createElement("p");
            lastUser.textContent = `Last User: ${lastScore.user}`;
            mainWrapperEl.appendChild(lastUser);

            var lastUserScore = document.createElement("p");
            lastUserScore.textContent = `Last User's Score: ${lastScore.score}`;
            mainWrapperEl.appendChild(lastUserScore);
        };

        // when user clicks "Save"
        saveBtn.addEventListener("click", function ( ) {
           // check to see if user made an entry, if not - assign "Anonymous" instead of initials 
            if (userInitials.value === "") {
                userInitials.value = "Anonymous";
            };

            var savedUserScores = {
                user: userInitials.value.trim( ),
                score: userScore,
            };

            localStorage.setItem("userScore", JSON.stringify(savedUserScores));

            var lastScore = JSON.parse(localStorage.getItem("userScore"));
            
            // render most recent user's initials and score
            var yourName = document.createElement("p");
            yourName.textContent = `Your Initials: ${savedUserScores.user}`;
            mainWrapperEl.appendChild(yourName);

            var yourScore = document.createElement("p");
            yourScore.textContent = `Your Score: ${savedUserScores.score}`;
            mainWrapperEl.appendChild(yourScore);
        }); 
    });

     // if user clicks "No" btn
     userNo.addEventListener("click", function () {
        //remove feednack div
        feedbackEl.textContent = "";

        var message = document.createElement("p");
        message.textContent = "Thanks for taking the quiz!";
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
    
    // grab all btns to iterate over 
    const buttons = document.getElementsByTagName("button");

    // set attributes for each btn to style in css
   for (index = 1; index < buttons.length; index++) {
        buttons[index].setAttribute("class","mult-btn");
    }
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
                feedbackEl.textContent = "correct";
            } else {
                // decrease current timer time by 10 secs if answer is wrong
                var timeNow = document.querySelector("#count-down").textContent.split(" ")[0];
                feedbackEl.textContent = "incorrect";
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