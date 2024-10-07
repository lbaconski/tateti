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
                return {
                    winner:gameboard[a], a, b, c}
            }
        }
        return gameboard.includes('') ? null : 'Empate'; 
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
    const winner = function(a,b,c){
        cells[a].classList.add('winner')
        cells[b].classList.add('winner')
        cells[c].classList.add('winner')
      
    }
    const tie = function(){
        cells.forEach(cell => cell.classList.add('tie'))
    }
    return {updateCell, winner, tie}
  })();

//==================================================================//
//                          CONTROLADOR DE JUEGO
//==================================================================//

    const gameController = (function () {
        let currentPlayer;
        const player1 = Player("Player 1", 'X');
        const player2 = Player("Player 2", 'O');
    
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
                    win === 'Empate' ? view.tie(): view.winner(win.a, win.b, win.c);
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1; 
                }
            } else {
                console.log("Error. Casilla ocupada.");
            }
        };

        const endGame = function(){
            const cells = document.querySelectorAll('td');
            cells.forEach(cell => cell.classList.add('not-clickable'));
        }
        return { startGame, playTurn, endGame };
    })();






//==================================================================//
//                          APP
//==================================================================//
    function app(){

        gameController.startGame();
    
    }

app();