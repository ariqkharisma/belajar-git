document.addEventListener('DOMContentLoaded', () => {
    const character = document.querySelector('.character');
    const game = document.querySelector('.game');
    const lose = document.querySelector('.lose');
    const scoreElem = document.querySelector('.score');
    const finalScore = document.querySelector('.finalScore');
    const startDisplay = document.querySelector('.start');
    let isJump;
    let isGameOver = false;
    let scoreNumber = 0;
    let timerUp, timerDown;

    function jump (e) {
        let characterTop = 240;
        if (e.code == 'Space' && !isJump && characterTop == 240 && isGameOver == false) {
            timerUp = setInterval(() => {
                isJump = true;
                characterTop -= 5/100 * characterTop
                character.style.top = characterTop + 'px';
                if (characterTop <= 100) {
                    clearInterval(timerUp);
                    timerDown = setInterval(() => {
                        characterTop += 5/100 * characterTop
                        character.style.top = characterTop + 'px';
                        if (characterTop >= 240) {
                            clearInterval(timerDown);
                            isJump = false;
                        }
                    }, 13);
                }
            }, 13);
        }
    }

    function blocks () {
        let blockTime = ((0.9 + Math.random()) * 700) - (scoreNumber * 0.5)
        let blockPosition = 1200
        const blockElem = document.createElement('div');
        blockElem.classList.add('block');
        game.appendChild(blockElem);
        blockElem.style.left = blockPosition + 'px'

        const blockMove = setInterval(() => {
            if (isGameOver == false) {
                blockPosition -= 5 + (scoreNumber * 0.008);
                blockElem.style.left = `${blockPosition}px`;

                if (blockPosition < -30) {
                    clearInterval(blockMove);
                    game.removeChild(blockElem);
                }
            }         
        }, 15);

        const generateBlock = setTimeout(() => {
            blocks();
        }, blockTime)
 
        const gameOver = setInterval(() => {
            const topCharacter = parseInt(window.getComputedStyle(character).getPropertyValue('top'));

            if (blockPosition <= 105 && blockPosition > 35 && topCharacter >= 190) {
                isGameOver = true
                clearInterval(timerDown);
                clearInterval(timerUp);

                lose.style.display = 'flex';
                game.classList.add('blur');
                finalScore.innerText = 'Your Score:  ' + scoreNumber;
                startDisplay.style.display = 'none';
            }
        }, 10)

        if (isGameOver == true) {
            clearTimeout(generateBlock);
        }
    }

    function score() {
        const scoreGame = setInterval(() => {
            scoreNumber += 1;
            scoreElem.innerText = scoreNumber;
            if (isGameOver) {
                clearInterval(scoreGame);
            }     
        }, 100)
    }

    function start() {
        document.addEventListener('keypress', jump);
        document.addEventListener('keydown', (e) => {
            if (e.code == 'Space') {
                startDisplay.style.display = 'none';
            }
        });
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState == 'hidden' && isGameOver == false) {
                isGameOver = true;
                lose.style.display = 'flex';
                game.classList.add('blur');
                finalScore.innerText = 'Your Score:  ' + (scoreNumber + 1);
                startDisplay.style.display = 'none';
            }
        })
        blocks();
        score();
    }

    start();
}) 