let startSecondsEl = 60; // start timer at 60 seconds 
const countDownEl = document.querySelector("#count-down"); // targeting html tag displaying countdown

// function to update the counter 
function countDownSeconds () {
    if (startSecondsEl >= 0) {
        let secondsRemains = startSecondsEl;
        startSecondsEl--; // decreasing time 
        countDownEl.textContent = `${secondsRemains} seconds remains`;
    } else {
        countDownEl.textContent = `Time's up!`;
    }
}

// calling the function to update counter every millisecond
setInterval(countDownSeconds, 1000); 

// next put in an event listener to start when the button start is clicked