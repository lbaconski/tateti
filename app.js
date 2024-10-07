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

//controlador de tablero
const gameboardController = (function () {
    
    const markSqr = (player, pos) => {
        if (gameboard[pos] === '') {
            gameboard[pos] = player;
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
    return {markSqr, emptyGameBoard, checkWinner}})();


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
                const winner = gameboardController.checkWinner();
                if (winner) {
                    console.log(winner === 'Tie' ? "It's a Tie!" : `${winner} wins!`);
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1; 
                }
            } else {
                console.log("Error. Casilla ocupada.");
            }
        };
    
        return { startGame, playTurn };
    })();
    