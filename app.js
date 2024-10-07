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
    const checkWinner = () => {
        for (let set of winningSets) {
            const [a, b, c] = set;
            if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
                return gameboard[a]; 
            }
        }
        return gameboard.includes('') ? null : 'Empate'; 
    };

    const getBoard = () => gameboard;
    return {markSqr, emptyGameBoard, checkWinner, getBoard}})();


//==================================================================//
//                          VISTA
//==================================================================//
  const view = (function(){
    const cells = document.querySelectorAll('td');
    const updateCell = function(pos){
        cells[pos].innerText = gameboard[pos];
    }
    const winner = function(cell){
        cells[cell].classList.add('winner')
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
    
        };
    
        const playTurn = (pos) => {
            if (gameboardController.markSqr(currentPlayer.symbol, pos)) {
                view.updateCell(pos);
                const winner = gameboardController.checkWinner();
                if (winner) {
                    winner === 'Empate' ? view.tie(): view.winner();
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1; 
                }
            } else {
                console.log("Error. Casilla ocupada.");
            }
        };

    
        return { startGame, playTurn };
    })();






//==================================================================//
//                          APP
//==================================================================//
    function app(){

        const cells = document.querySelectorAll('td');

        gameController.startGame();

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const index = cell.getAttribute('data-index');
                gameController.playTurn(index);
            });
        });
    
    }

app();