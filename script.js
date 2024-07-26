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
        getRows: function(num) {
            if (num === 1) {
                return this.board.slice(0, 3).filter(board => board.value !== "")
            } else if (num === 2) {
                return this.board.slice(3, 6).filter(board => board.value !== "")
            } else if (num === 3) {
                return this.board.slice(6, 9).filter(board => board.value !== "")
            };
        },
        getCols: function(num) {
            if (num === 1) {
                return this.board.filter(board => (board.index === 0 || board.index === 3 || board.index === 6) && board.value !== "")
            } else if (num === 2) {
                return this.board.filter(board => (board.index === 1 || board.index === 4 || board.index === 7) && board.value !== "")
            } else if (num === 3) {
                return this.board.filter(board => (board.index === 2 || board.index === 5 || board.index === 8) && board.value !== "")
            }
        },
        getDiagonal: function(num) {
            if (num === 1) {
                return this.board.filter(board => (board.index === 0 || board.index === 4 || board.index === 8) && board.value !== "")
            } else if (num === 2) {
                return this.board.filter(board => (board.index === 2 || board.index === 4 || board.index === 6) && board.value !== "")
            }
        },
        checkBoard: function() {
            const checkList = [this.getRows(1), this.getRows(2), this.getRows(3), this.getCols(1), this.getCols(2), this.getCols(3), this.getDiagonal(1), this.getDiagonal(2)]
            for (let i = 0; i < checkList.length; i++) {
                let result;
                const checkX = checkList[i].filter(item => item.value === "X")
                const checkO = checkList[i].filter(item => item.value === "O")
                if (checkX.length === 3) {
                    result = "X Wins"
                    return result
                } else if (checkO.length === 3) {
                    result = "O Wins"
                    return result
                } 
            };
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
            this.turn = 1
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
        const result = controller.checkBoard()
        if(result === "X Wins") {
            console.log("Player 1 Wins")
            session.resetTurn()
        } else if (result === "O Wins") {
            console.log("Player 2 Wins")
            session.resetTurn()
        } else if (result === "Game running") {
            console.log("Keep Playn'")
        }else if (session.turn === 10) {
            console.log("It's a Tie")
            session.resetTurn()
        }
    }

    return {
        playTurn,
        decideGame
    }
})();


runGame.playTurn(4)
runGame.decideGame()
runGame.playTurn(0)
runGame.decideGame()
runGame.playTurn(2)
runGame.decideGame()
runGame.playTurn(3)
runGame.decideGame()
runGame.playTurn(5)
runGame.decideGame()
runGame.playTurn(6)
runGame.decideGame()

