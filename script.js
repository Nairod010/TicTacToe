(function() {
    const gameboard = (() => {
        const board = []
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                board.push(cell(i, j))
            }
        }
        return board
    })();
    
    console.log(gameboard) 

    const createDom = (() => {
        


    })();

    function cell(row, col) {
        return {
            row: row,
            col: col,
            value: "",
            getValue: function() {
                console.log(this.value)
            },
            setValue: function(newValue) {
                if (this.value != "") {
                    console.log("spot used")
                } else {
                    this.value = newValue
                }
            }
        }
    }

    function game() {
        return {
            gameCounter: 0,
            winConditions: function(check) {
                let result = ""
                for (let i = 1; i <= 3; i++) {
                    let row = gameboard.filter(board => board.row === i && board.value == check)
                    let col = gameboard.filter(board => board.col === i && board.value == check)
                    if (row.length === 3 || col.length === 3) {
                        result = "Game Over"
                        break
                    } else {
                        result = "Game Running"
                    }

                }
                
                const d1 = gameboard.filter(board => board.row === board.col && board.value == check)
                const d2 = gameboard.filter(board => board.row + board.col === 4 && board.value == check)
                if (d1.length === 3) {
                    result = "Game Over"
                } else if (d2.length === 3) {
                    result = "Game Over"
                }
                if (result == "Game Over") {
                    player1.turn = 1
                    player2.turn = 2
                    this.gameCounter++
                    gameboard.filter(board => board.value = "")
                }
                return result
            },
            getCounter: function() {
                console.log(this.gameCounter)
            }
        }
    }


    function player(name, turn, weapon) {
        return {
            name: name,
            turn: turn,
            weapon: weapon,
            wins: 0,
            useWeapon: function(spot) {
                const turnCheck = gameboard.filter(board => board.value != "")
                console.log(turnCheck)
                if (turnCheck.length + 1 == this.turn) {
                    if (gameboard[spot].value == "") {
                        this.turn += 2
                    }
                    gameboard[spot].setValue(weapon)
                    if (startGame.winConditions(weapon) === "Game Over") {
                        console.log(`${this.name} WINS THE GAME!!!`);
                        this.wins++
                        return true
                    } else {
                        return false
                    }
                } else {
                    console.log("not your turn")
                }
            },
            getWins: function() {
                console.log(this.wins)
            },
        }
    }


    const startGame = (() => {
        const initGame = game()
        return initGame
    })();

    const player1 = player("jon", 1, "X");
    const player2 = player("jonny", 2, "O");

    player1.useWeapon(0)
    player2.useWeapon(3)
    player1.useWeapon(1)
    player2.useWeapon(4)
    player1.useWeapon(2)
})();



