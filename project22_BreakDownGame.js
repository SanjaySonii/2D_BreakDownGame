//  Variables

let gameStart = new Audio(`gametrack.wav`)
let lifeGoes = new Audio(`hit.wav`)
let wonGame = new Audio(`won.wav`)
let BreakDownGame = document.getElementById('BreakDownGame');
let startBtn = document.getElementById('startBtn');
let ball = document.getElementById('ball');
let reset = document.getElementById('reset');
let lifes = document.getElementById('lifes');
let result = document.getElementById('result');
let boxes = document.getElementsByClassName('box');
let user = document.getElementById('user');
let Play = false;
let userMove = true;
let Top = 12.6
let Left = 0
let l = 0
let life = 3
let boxLength = boxes.length
var move = null
let keys = {
    ArrowRight: false,
    ArrowLeft: false
}


reset.addEventListener(`click`, () => {
    window.location.reload();
})

// Game started

Play = true;
startBtn.addEventListener('click', () => {
    if (Play) {
        gameStart.play();
        moveBall();
        document.addEventListener('keydown', keydown)
        document.addEventListener('keyup', keyup)
        function keydown(e) {
            keys[e.key] = true;
            if (userMove) {
                if (keys.ArrowLeft && (l >= -14 && l <= 14)) {
                    if (l == -14) { }
                    else {
                        l = l - 1;
                    }
                }
                else if (keys.ArrowRight && (l >= -14 && l <= 14)) {
                    if (l == 14) { }
                    else {
                        l = l + 1;
                    }
                }
                user.style.left = l + 'rem';
            }
        }
        function keyup(e) {
            keys[e.key] = false
        }

    }
})

// Move ball function

function moveBall() {
    let Top = 12.6
    let Left = 0
    ball.style.display = "inline"
    ball.style.left = '0rem'
    user.style.left = '0rem'
    ball.style.top = "12.6rem"
    let T = true
    let L
    let randNo = parseInt(0 + 11 * Math.random());
    console.log(randNo)
    if (randNo % 2 == 0) {
        L = true
    } else {
        L = false
    }
    move = setInterval(() => {
        if (Top < -25.9) {
            Top += 1
            T = false
        }
        else if (Top > 13) {
            lifeGoes.play();
            gameStart.pause();
            l = 0
            life -= 1
            if (life == 2) {
                lifes.innerHTML = ` &hearts;    &hearts;`
            }
            else if (life == 1) {
                lifes.innerHTML = ` &hearts;`
            }
            else if (life == 0) {
                lifes.innerHTML = ``
            }
            clearInterval(move)
            ball.style.display = "none"
            if (life == 0) {
                userMove = false
                GameOver("Lose")
            }
        }
        else {
            if (T) {
                Top -= 1
            }
            else {
                Top += 1
            }
        }
        if (Left >= 19) {
            Left -= 1
            L = false
        }
        else if (Left <= -19) {
            Left += 1
            L = true
        }
        else {
            if (L) {
                Left += 1
            }
            else {
                Left -= 1
            }
        }
        ball.style.top = Top + 'rem'
        ball.style.left = Left + 'rem'
        if (boxLength) {
            for (const box of boxes) {
                if ((ball.offsetLeft == box.offsetLeft && ball.offsetTop == box.offsetTop)
                    || ((ball.offsetLeft > box.offsetLeft && ball.offsetLeft < box.offsetLeft + box.offsetWidth)
                        && (ball.offsetTop > box.offsetTop && ball.offsetTop < box.offsetTop + box.offsetHeight))) {
                    if (box.classList.length != 1) { }
                    else {
                        boxLength -= 1
                        box.classList.add('hidden')
                        box.style.visibility = "hidden"
                        if (T = true) { T = false }
                        else { T = true }
                        if (L = true) { L = false }
                        else { L = true }
                    }
                }
            }
        }
        else {
            GameOver("Won");
            clearInterval(move)
        }
        if ((ball.offsetLeft >= user.offsetLeft && ball.offsetLeft <= user.offsetLeft + user.offsetWidth)
            && (ball.offsetTop + ball.offsetHeight == user.offsetTop + 2)) {
            if (keys.ArrowLeft && L) {
                L = false
            }
            if (keys.ArrowRight && !L) {
                L = true
            }
            if (T) { T = false }
            else { T = true }
        }
    }, 40);
}


//  GameOver function

function GameOver(ele) {
    Play = false
    if (ele == "Won") {
        result.innerHTML = `<h2>Congratulation! <br> You <br> Won</h2>`
        result.style.visibility = "visible"
        wonGame.play();
        gameStart.pause();
    }
    else {
        result.innerHTML = `<h2> Oops! <br> You <br> Loose <h2>`
        result.style.visibility = "visible"
        lifeGoes.play();
    }
}