// start timer at 60 seconds 
let startSecondsEl = 60;
// selecting html tag displaying countdown
const countDownEl = document.querySelector("#count-down"); 
// selecting button el
const buttonEl = document.querySelector("#start-button"); 
// Event listener to start countdown when the button "start" is clicked
// Includes set interval method and a funcion that increments seconds
// Fix that when the button is clicked twice the timer goes faster
buttonEl.addEventListener("click", function () {
    setInterval ( function (){
        if (startSecondsEl >= 0) {
            let secondsRemains = startSecondsEl;
            startSecondsEl--; // decreasing time 
            countDownEl.textContent = `${secondsRemains} seconds remains`;
        } else {
            countDownEl.textContent = `Time's up!`;
        }
    },1000);
});