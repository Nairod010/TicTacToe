function gameboard() {
    return {
        board: [],
        cell: function(index) {
            return {
                index: index,
                value: "",
                getValue: function() {
                    return this.value;
                },
                setValue: function(newValue) {
                    console.log(this.value);
                    this.value = newValue;
                    console.log(this.value);
                }
            }
        },
        makeBoard: function() {
            let index = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.board.push(this.cell(index));
                    index += 1;
                }
            }
        },
        setCellValue: function(index, value) {
            this.board[index].setValue(value);
            console.log(this.board[index]);
        },
        getCellValue: function(index) {
            this.board[index].getValue();
        },
        getAllValues: function() {
            const firstRow = this.board.slice(0,3)  
            const secondRow = this.board.slice(3,6)
            const thirdRow = this.board.slice(6,9)
            return thirdRow 
        }
    }
}

function player(name, pick) {
    return {
        name: name,
        pick: pick,
        win: 0,
        setWin: function() {
            this.win += 1
        },
        getWins: function() {
            return this.win
        },
        getPick: function() {
            return this.pick
        }
    }
}

function game() {
    return {
        counter: 0,
        turn: 1,
        nextTurn: function() {
            this.turn += 1
        },
        resetTurn: function() {
            this.turn = 0
        }
    }
}

const runGame = (() => {
    const session = game()
    const controller = gameboard()
    controller.makeBoard()
    const player1 = player("player1", "X")
    const player2 = player("player2", "O")

    const playTurn = function(index) {
        if (session.turn % 2 !== 0 && controller.getCellValue(index) !== "") {
            controller.setCellValue(index, player1.getPick())
            session.nextTurn()
        } else if (session.turn % 2 === 0 && controller.getCellValue(index) !== "") {
            controller.setCellValue(index, player2.getPick())
            session.nextTurn()
        } else {
            console.log("not your turn")
        }
        console.log(controller.board)
    }

    const decideGame = function() {
        console.log(controller.getAllValues())
    }

    return {
        playTurn,
        decideGame
    }
})();


runGame.playTurn(0)
runGame.playTurn(5)
runGame.decideGame()

