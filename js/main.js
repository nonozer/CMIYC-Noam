var hsDOM = document.getElementById("highScores");
var winners = [];
var hsJSON = localStorage.getItem("winners");
if (hsJSON != null){
    winners = JSON.parse(hsJSON);
    createHs();
}
function createHs(){
    hsDOM.innerHTML = "";
    var toAppend = "";
    winners.forEach(function (w){
        toAppend += `<div class="users"> ${w.name} - <span id="number">${w.score}</span>
        <div class="date">${w.date}</div>
    </div>`
    });
    hsDOM.innerHTML = toAppend;
}

var mainButton = document.getElementById("mainButton");
mainButton.addEventListener("click", startGame, {once:true});
var i = 60;
var myInterval = "";
var clickMe = document.getElementById("clickMe");
var score = 0;
var level = 1;
var levelDOM = document.getElementById("level");
var pNext = 10;
var pNextDOM = document.getElementById("pNext");
var ms = 300;
var spinTime = 2;
var screen = document.getElementById("screen");
var missClicks = 0;
var missClickDOM = document.getElementById("missClicks");
var scoreDOM = document.getElementById("score");
var users = document.getElementsByClassName("users");
var date = document.getElementsByClassName("date");

function ondate(){
    date.style.display = "block"
}

function startGame() {  
    alert("The game is started !");
    clickMe.style.animationDuration = "2s";
    myInterval = setInterval(function () {
        if (i == 0) {
            gameOver();
            return;
        }
        i--;
        timer.innerHTML = i;
    }, 1000);
    clickMe.addEventListener("click", addPoints);
    clickMe.addEventListener("mouseover", escape);
    clickMe.style.cursor = "crosshair";
    screen.addEventListener("click", losePoints);
}

function gameOver() {
    alert(" The Game is Over ! \n Your score is " + score + " and you missed " + missClicks + " times the div !");
    checkHighScores();
    clearInterval(myInterval);
    clickMe.style.animationDuration = "0s";
    clickMe.style.top = 0 + "px";
    clickMe.style.left = 0 + "px";
    clickMe.removeEventListener("click", addPoints);
    clickMe.removeEventListener("mouseover", escape);
    screen.removeEventListener("click", losePoints);
    clickMe.style.cursor = "default";
    init();

}

function init(){
    i = 60;
    score = 0;
    level = 1;
    pNext = 10;
    ms = 300;
    spinTime = 2;
    missClicks = 0;
    scoreDOM.innerHTML = 0;
    levelDOM.innerHTML = 1;
    pNextDOM.innerHTML = 10;
    missClickDOM.innerHTML = 0;
    if (confirm("Do you want to restart ?")) {
        startGame();
    }
};


function sortHighScores(arr, key){
    return arr.sort((a,b)=>{
        return b[key]-a[key];
    });
};

function checkHighScores(){
    if (score>winners[4].score){
        winners.pop();
        winners.push(newUser());
        sortHighScores(winners, "score");
        createHs();
        var winnersJSON = JSON.stringify(winners);
        localStorage.setItem("winners", winnersJSON);
    }
};

function newUser(){
    var name = prompt("Enter your name");
    var d = new Date();
    var today = d.toLocaleString();
    return {name:name, score:score, date:today};
}

function addPoints(e) {
    e.stopPropagation()
    score += level * 10;
    scoreDOM.innerHTML = score;
    // missClicks--;
    // missClickDOM.innerHTML = missClicks;
    pNext--;
    if (pNext == 0) {
        addLevel();
    }
    pNextDOM.innerHTML = pNext;
}

function escape() {
    setTimeout(function () {
        clickMe.style.top = Math.floor(Math.random() * 400) + "px";
        clickMe.style.left = Math.floor(Math.random() * 800) + "px"
    }, ms)
}

function addLevel() {
    level++;
    i += 10;
    levelDOM.innerHTML = level;
    pNext = 10;
    ms -= 50;
    spinTime -= 0.25;
    clickMe.style.animationDuration = spinTime + "s";
    if (level == 6){
        gameOver();
    }
}

function losePoints() {
    missClicks++;
    missClickDOM.innerHTML = missClicks;
    score -= level;
    scoreDOM.innerHTML = score;
}

// var winners = [{name:"Noam",score :500,date:"07/23/2019"},{name:"Ivy",score :350,date:"07/23/2019"},{name:"Jaclyn",score :250,date:"07/23/2019"},{name:"Yoel",score :200,date:"07/23/2019"},{name:"Anaelle",score :150,date:"07/23/2019"},];