let gameSeq = [];
let userSeq = [];

let btns = ["yellow" , "red" , "purple" , "green"];

let started = false;
let level = 0;
let highestScore = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randmIdx = Math.floor(Math.random() * 3);
    let randmClr = btns[randmIdx];
    let randbtn = document.querySelector(`.${randmClr}`);
    // console.log(randmIdx);
    // console.log(randmClr)
    // console.log(randbtn);
    gameSeq.push(randmClr)
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx){
    // console.log(`curr level : ${level}`);

    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        if(highestScore < level){
            highestScore = level;
        }
        h2.innerHTML = `Game over! Your score was <b>${level}<b> <br> Press any key to start. <br> HIGHEST SCORE ${highestScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq  = [];
    level = 0;
}