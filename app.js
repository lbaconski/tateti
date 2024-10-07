let gameboard = Array(9).fill('')

//posibles combinaciones ganadoras
const winningSets = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,7],
    [0,4,8],
    [2,4,6]
]

//Player factory
const Player = (name, symbol) => {
    return { name, symbol };
};

//==================================================================//
//                           TABLERO
//==================================================================//

const gameboardController = (function () {
    
    const markSqr = (playerSymbol, pos) => {
        if (gameboard[pos] === '') {
            gameboard[pos] = playerSymbol;
            return true; 
        }
        return false;
    };

    const emptyGameBoard = function(){
        gameboard = Array(9).fill('')
        return gameboard;
    };
    const checkWin = () => {
        for (let set of winningSets) {
            const [a, b, c] = set;
            if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
                //HAY GANADOR
                gameController.endGame();
                return { winner:gameboard[a], a, b, c}
            }
        }
        return gameboard.includes('') ? null : 'Tie'; 
    };

    const getBoard = () => gameboard;
    return {markSqr, emptyGameBoard, checkWin, getBoard}})();


//==================================================================//
//                          VISTA
//==================================================================//
  const view = (function(){
    const cells = document.querySelectorAll('td');
    const updateCell = function(pos){
        cells[pos].innerText = gameboard[pos];
    }
    const winner = function(win){
        cells[win.a].classList.add('winner')
        cells[win.b].classList.add('winner')
        cells[win.c].classList.add('winner')
        document.getElementById('message-board').innerText(`We have a WINNER! Congratulations ${win.winner}.`);
      
    }
    const tie = function(){
        cells.forEach(cell => cell.classList.add('tie'))
        document.getElementById('message-board').innerText(`It's a Tie!`);
    }

    const play = function(){
        document.getElementById('message-board').innerText(`${gameController.currentPlayer()} turn.`);
    }
            


    return {updateCell, winner, tie, play}
  })();

//==================================================================//
//                          CONTROLADOR DE JUEGO
//==================================================================//

    const gameController = (function () {
        let currentPlayer;
        const player1 = Player("Player 1", 'X');
        const player2 = Player("Player 2", 'O');
    
        const getCurrentPlayer = (){
            return currentPlayer;
        }
        const startGame = () => {
            currentPlayer = player1; 
            gameboardController.emptyGameBoard();
            const cells = document.querySelectorAll('td');
            cells.forEach(cell => {
                cell.addEventListener('click', () => {
                    const index = cell.getAttribute('data-index');
                    gameController.playTurn(index);
                });
            });
    
        };
    
        const playTurn = (pos) => {
            if (gameboardController.markSqr(currentPlayer.symbol, pos)) {
                view.updateCell(pos);
                const win = gameboardController.checkWin();
                if (win) {
                    win === 'Tie' ? view.tie(): view.winner(win);
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1; 
                    view.play();
                }
            } else {
                console.log("Error. Already marked cell");
            }
        };

        const endGame = function(){
            const cells = document.querySelectorAll('td');
            cells.forEach(cell => cell.classList.add('not-clickable'));
        }
        return { startGame, playTurn, endGame, getCurrentPlayer };
    })();






//==================================================================//
//                          APP
//==================================================================//
    function app(){

        gameController.startGame();
    
    }

app();