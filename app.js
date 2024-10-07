let gameboard = Array(10).fill('')

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

//tablero vacio
const gameboardController = (function () {
    
    const markSqr = (player, pos) => gameboard[pos] = player;
    const emptyGameBoard = function(){
        gameboard = ['','','','','','','','','']
        return gameboard;
    };

    return {markSqr, emptyGameBoard}})