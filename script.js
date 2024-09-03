let start, end;
let isRunning = false;
let winPx;
let offset = 2;
let times = [];
const randomColors = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red']

let scoreText = document.getElementById("score-text");
let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", () => {
    if (isRunning == false) {
        submitButton.innerHTML = "Stop";

        start = Date.now();

        winPx = getRandomInt(200, 1000);
        applyCSSMediaQuery(winPx);

        scoreText.innerHTML = `Your Score: `;
        scoreText.style.visibility = "hidden";

        applyCSSRandomBgColor();

        isRunning = true;
    } else {
        submitButton.innerHTML = "Start";
        applyCSSResetBg();
        end = Date.now();
        isRunning = false;

        if (screen.width >= winPx-offset && screen.width <= winPx+offset) {
            times.push(end - start);
        } else {
            alert("You couldn't find the pixel, try again!");
        }
    }
});

document.getElementById("calculate-score").addEventListener("click", () => {
    if (isRunning == true) { scoreText.style.visibility = "hidden"; return ; }
    else {
        let average = 0.0;

        if (times.length == 0) {alert("Play some games to get a score."); return;}

        for (let i = 0; i < times.length; i++) {
            average += times[i]
        }
        average = average / times.length;

        scoreText.innerHTML = `Your Score: ${(average/1000).toFixed(1)} seconds`;
        scoreText.style.visibility = "visible";
    }
});

function applyCSSMediaQuery(winPx) {
    const style = document.createElement('style');

    style.textContent = `
        body {
            background-color: grey;
        }
        
        @media (min-width: ${winPx-offset}px) and (max-width: ${winPx+offset}px) {
            body {
                background-color: ${pickRandomColor()};
            }
        }
    `;

    document.head.appendChild(style);
}

function applyCSSResetBg(winPx) {
    const style = document.createElement('style');

    style.textContent = `
        body {
            background-color: white;
        }
    `;

    document.head.appendChild(style);
}

function applyCSSRandomBgColor(winPx) {
    // Create a style element
    const style = document.createElement('style');

    // Set the media query CSS
    style.textContent = `
        @media (min-width: ${winPx}px) and (max-width: ${winPx}px) {
            body {
                background-color: pink;
            }
        }
    `;

    // Append the style element to the head
    document.head.appendChild(style);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;   
  
}

function pickRandomColor() {
    const randomIndex = Math.floor(Math.random() * randomColors.length);
    return randomColors[randomIndex];
}