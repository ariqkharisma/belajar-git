document.addEventListener('DOMContentLoaded', () => {
    const pixels = document.querySelectorAll('.game-board div');
    const gameBoard = document.querySelector('.game-board');
    const scoreBoard = document.querySelector('.score-board p');
    const lose = document.querySelector('.game-over');
    const finalScore = document.querySelector('.final-score')
    const button = document.querySelector('.btn');
    let snake = [];
    let index = snake[snake.length -1];
    let index1;
    let isGoingUp = false;
    let isGoingDown = false;
    let isGoingLeft = false;
    let IsGoingRight = false;
    let isGameOver = false;
    let score = 0;
    let moveUp, moveDown, moveRight, moveLeft;
    let startMove;
    let eatFood;
    
    function control(e) {
        if (e.code == 'KeyW' && isGoingDown == false && isGoingUp == false && isGameOver == false) {
            isGoingUp = true;
            isGoingLeft = false;
            IsGoingRight = false;
            isGoingDown = false;

            clearInterval(startMove);
            clearInterval(moveRight);
            clearInterval(moveDown);
            clearInterval(moveLeft);
            
            moveUp = setInterval(() => {
                index -= 20;
                index1 = snake[0];
                snake.push(index);
                snake.shift();
                pixels[index].classList.add('snake');
                pixels[index1].classList.remove('snake');
            }, 100)   
            
        } 
        
        if (e.code == 'KeyS' && isGoingUp == false && isGoingDown == false && isGameOver == false) {
            isGoingDown = true;
            isGoingLeft = false;
            IsGoingRight = false;
            isGoingUp = false;

            clearInterval(startMove);
            clearInterval(moveUp);
            clearInterval(moveRight);
            clearInterval(moveLeft); 
                       
            moveDown = setInterval(() => {
                index += 20;
                index1 = snake[0];
                snake.push(index);
                snake.shift();
                pixels[index].classList.add('snake');
                pixels[index1].classList.remove('snake');
            }, 100)

        } 
        if (e.code == 'KeyD' && isGoingLeft == false && IsGoingRight == false && isGameOver == false) {
            isGoingUp = false;
            isGoingDown = false;
            IsGoingRight = true;
            isGoingLeft = false;

            clearInterval(startMove);
            clearInterval(moveUp);
            clearInterval(moveDown);
            clearInterval(moveLeft);

            moveRight = setInterval(() => {
                index += 1;
                index1 = snake[0];
                snake.push(index);
                snake.shift();
                pixels[index].classList.add('snake');
                pixels[index1].classList.remove('snake');
            }, 100)  

        } 
        if (e.code == 'KeyA' && IsGoingRight == false && isGoingLeft == false && isGameOver == false) {
            isGoingLeft = true;
            isGoingUp = false;
            isGoingDown = false;
            IsGoingRight = false;

            clearInterval(startMove);
            clearInterval(moveUp);
            clearInterval(moveDown);
            clearInterval(moveRight); 
  
            moveLeft = setInterval(() => {
                index -= 1;
                index1 = snake[0];
                snake.push(index);
                snake.shift();
                pixels[index].classList.add('snake');
                pixels[index1].classList.remove('snake');
            }, 100)            
        }
    }

    function food () {
        const foodIndex = Math.floor(Math.random() * 400);
        const foodLocation = pixels[foodIndex];
        foodLocation.classList.add('food');

        eatFood = setInterval(() => {
            if (foodIndex == index) {
                foodLocation.classList.remove('food');
                snake.push(foodIndex);
                score += 1;
                scoreBoard.innerHTML = `<span> Score: ${score} </span>`
                clearInterval(eatFood);
                food();
            }
        }, 100)
    }

    function gameOver () {
        const dead = setInterval(() => {
            if ((index < 0  && isGoingUp == true) ||
            (index > 400 && isGoingDown == true) || 
            (index % 20 == 19 && IsGoingRight == true) ||
            (index % 20 == 0 && isGoingLeft == true) ||
            (snake.indexOf(index) != -1 && snake.indexOf(index) != snake.length -2 && snake.indexOf(index) != snake.length -1)) {
                clearInterval(startMove);
                clearInterval(moveUp);
                clearInterval(moveDown);
                clearInterval(moveRight);
                clearInterval(moveLeft);
                clearInterval(dead);
                clearInterval(eatFood)

                isGoingLeft = false;
                isGoingUp = false;
                isGoingDown = false;
                IsGoingRight = false;
                
                isGameOver = true;                
                lose.style.display = 'flex';
                gameBoard.classList.add('blur');
                finalScore.innerText = 'Your Score:  ' + score;  
            }
        }, 100)

    }

    function start() {
        pixels.forEach(pixel => {
            pixel.classList.remove('snake');
            pixel.classList.remove('food');
        })
        score = 0;
        isGameOver = false;
        
        index = 160;
        snake = [0, 1, 2]
        
        lose.style.display = 'none';
        gameBoard.classList.remove('blur');
        scoreBoard.innerHTML = `<span> Score: ${score} </span>`;

        startMove = setInterval(() => {
            IsGoingRight = true;
            index1 = snake[0];
            index++;
            snake.push(index);
            snake.shift();
            pixels[index].classList.add('snake');
            pixels[index1].classList.remove('snake');
        }, 100)
        
        document.addEventListener('keypress', control)
        food()
        gameOver()
    }

    start()
    button.addEventListener('click', start)

})