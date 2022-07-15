document.addEventListener('DOMContentLoaded', () => {
    const character = document.querySelector('.character');
    const gameOverWindow = document.querySelector('.game-over');
    const instruction = document.querySelector('.instruction');
    const scoreBoard = document.querySelector('.score span');
    const gameBoard = document.querySelector('.game-board');
    const finalScore = document.querySelector('.game-over p span');

    let characterPosition = 0;

    let isJump = false;
    let isGameOver = false;
    let score;

    let jumpingInterval;
    let gameoverInterval;
    let scoringInterval;
    let makeObstacleInterval;
    let moveObstacleInterval;

    function makeObstacle() {
        makeObstacleInterval = setInterval(() => {
            const obstacle = document.createElement('div');
            obstacle.classList.add('obstacle');
            gameBoard.appendChild(obstacle);
        }, 1000 + (Math.random() * 1000)) 
    } 

    function moveObstacle() {
        moveObstacleInterval = setInterval(() => {
            const obstacles = document.querySelectorAll('.obstacle');
            const characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
            const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'));

            obstacles.forEach( obs => {
                let obstaclePosition =  parseInt(window.getComputedStyle(obs).getPropertyValue('right'));
                obstaclePosition += window.innerWidth * 0.6 / 100;
                if (obstaclePosition < 2000) {
                    obs.style.right = `${obstaclePosition}px`;
                } else obs.remove();

                if (obstaclePosition >= characterRight - parseInt(window.getComputedStyle(obs).getPropertyValue('width'))  && obstaclePosition <= characterRight + characterLeft && characterPosition <= 20) {
                    gameOver();
                }
            })
        }, 15) 
    }

    function jump() {
        let velocity = 0;
        jumpingInterval = setInterval(() => {    
            velocity += 0.2;
            isJump = true;       
            characterPosition += 5 - velocity;
            character.style.bottom = `${characterPosition}%`;
            if (characterPosition <= 0) {
                isJump = false;
                clearInterval(jumpingInterval);
            }                
        }, 15)
    }

    function gameOver() {
        isGameOver = true;
        gameOverWindow.style.display = 'flex';
        gameBoard.style.filter = 'blur(0.3vh)';
        instruction.style.display = 'none';
        clearInterval(jumpingInterval);
        clearInterval(gameoverInterval);
        clearInterval(scoringInterval);
        clearInterval(moveObstacleInterval);
        clearInterval(makeObstacleInterval);
        finalScore.innerHTML = score;
    }

    function scoring() {
        score = 0;
        scoringInterval = setInterval(() => {
        score += 1;
        scoreBoard.innerHTML = score;
        }, 15)
    }

    function start() {
        makeObstacle();
        moveObstacle();
        scoring();
        document.addEventListener('keypress', (e) => {
            instruction.style.display = 'none';
            if (e.code === 'Space' && isJump == false && isGameOver == false) {
                jump();
            }
        })
        document.addEventListener('click', () => {
            instruction.style.display = 'none';
            if (isJump == false && isGameOver == false) {
                jump();
            }
        })
        document.addEventListener('visibilitychange', () => {
            gameOver();
        })
        window.addEventListener('resize', () => {
            gameOver();
        })
    }

    start();
})