const colors = ["red", "blue", "green", "yellow"];

let userPattern = new Array();
let gamePattern = new Array();

let level = 0;

let gameHasStarted = false;

//kada korisnik pritisne tipku na tastaturi, tada ce funkcija nextSeq biti izvrsena
$(document).keydown( () => {
    if(gameHasStarted === false){
        nextSeq();
        gameHasStarted = true;
    }
});


$(".btn").click((e) => {
    let buttonName = e.target.id;

    buttonAnimation(buttonName);
    playSound(buttonName);

    userPattern.push(buttonName);

    checkAnswer(buttonName);
});


function nextSeq() {
    let randomColour = Math.floor(Math.random() * 4);
    let randomColourName = colors[randomColour];

    $("#" + randomColourName).fadeToggle(100);
    $("#" + randomColourName).fadeToggle(100)

    // setTimeout( () => {
    //     $("#" + randomColourName).fadeToggle(100)
    // }, 100);

    playSound(randomColourName);

    gamePattern.push(randomColourName);

    level++;

    $("#level-title").text("Level " + level);
}


function checkAnswer ( name ) {
    let x = userPattern.length - 1;
    let y = gamePattern.length - 1;

    if(name !== gamePattern[x]){
        gameOver();
    }else if((name === gamePattern[x]) && (x === y)){
        setTimeout( () => {
            nextSeq();
        }, 1000); 
        userPattern = [];
    }
}


function buttonAnimation (name) {

    $("#" + name).addClass("pressed");

    setTimeout( () => {
        $("#" + name).removeClass("pressed");
    }, 100);

}

function playSound ( name ) {
    let soundSource = "sounds/" + name + ".mp3";

    let sound = new Audio(soundSource);
    sound.play();
}

function gameOver(){
    $("#level-title").text("Game Over, Press Any Key to Restart");

    gameHasStarted = false;

    level = 0;
    userPattern = [];
    gamePattern = [];

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(() => { 
        $("body").removeClass("game-over"); 
    }, 100);
}