function gameboard() {
    return {
        board: [],
        cell: function(index) {
            return {
                index: index,
                value: "",
                getValue: function() {
                    return this.value
                },
                setValue: function(newValue) {
                    //console.log(this.value)
                    this.value = newValue
                    //console.log(this.value)
                }
            }
        },
        resetBoard: function() {
            for (let i = 0; i < this.board.length; i++) {
                this.board[i].setValue("")
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
            //console.log(this.board[index]);
        },
        getCellValue: function(index) {
            const value = this.board[index].getValue();
            //console.log(typeof(value))
            return value
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
            const checkList = [
                this.getRows(1), this.getRows(2), this.getRows(3),
                this.getCols(1), this.getCols(2), this.getCols(3),
                this.getDiagonal(1), this.getDiagonal(2)
            ]
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
    };
};

function player(name, pick) {
    return {
        name: name,
        pick: pick,
        win: 0,
        addWin: function() {
            this.win += 1;
        },
        getWins: function() {
            return this.win;
        },
        resetWins: function() {
            this.win = 0
        },
        getPick: function() {
            return this.pick;
        },
        changeName: function(name) {
            this.name = name;
        }
    }
}

function game() {
    return {
        counter: 1,
        turn: 1,
        getTurn: function() {
            return this.turn
        },
        nextTurn: function() {
            this.turn += 1
        },
        resetTurn: function() {
            this.turn = 1
        },
        addCounter: function() {
            this.counter += 1
        },
        getCounter: function() {
            return this.counter
        },
        setCounter: function(num) {
            this.counter = num
        }
    }
}

const init = (() => {
    const session = game()
    const controller = gameboard()
    controller.makeBoard()
    const player1 = player("Player 1", "X")
    const player2 = player("Player 2", "O")

    const playTurn = function(index) {
        if (session.turn % 2 !== 0 && controller.getCellValue(index) === "") {
            //console.log(controller.getCellValue(index))
            controller.setCellValue(index, player1.getPick())
            session.nextTurn()
        } else if (session.turn % 2 === 0 && controller.getCellValue(index) === "") {
            controller.setCellValue(index, player2.getPick())
            session.nextTurn()
        } else {
            console.log("not your turn")
        }
        const result = controller.getCellValue(index)

        //console.log(`${result} from playTurn`)
        return result
    }

    const decideGame = function() {
        const result = controller.checkBoard()
        if (result === "X Wins") {
            //console.log(controller.board)
            session.resetTurn()
            session.addCounter()
            controller.resetBoard()
            //console.log(controller.board)
            player1.addWin()
            console.log(`${player1.name} Wins`)
            return true
        } else if (result === "O Wins") {
            session.resetTurn()
            session.addCounter()
            controller.resetBoard()
            console.log(controller.board)
            player1.addWin()
            console.log(`${player2.name} Wins`)
            return true
        } else if (session.turn === 10) {
            session.resetTurn()
            session.addCounter()
            controller.resetBoard()
            console.log(controller.board)
            console.log("It's a Tie")
            return true
        } else {
            return false
        }

    }

    const showPlayerName = function(num) {
        if (num === 1) {
            return player1.name
        } else if (num === 2) {
            return player2.name
        }
    }

    const setPlayerName = function(num, name) {
        if (num === 1) {
            player1.changeName(name)
        } else if (num === 2) {
            player2.changeName(name)
        }
    }


    const stats = function() {
        return {
            player1Wins: player1.win,
            player2Wins: player2.win,
            game: session.counter,
            turn: session.turn
        }

    }

    const resetGame = function() {
        session.resetTurn()
        player1.resetWins()
        player2.resetWins()
        session.setCounter(1)
        controller.resetBoard()
    }

    const buildBoard = function() {
        return controller
    }


    return {
        playTurn,
        decideGame,
        setPlayerName,
        showPlayerName,
        stats,
        resetGame,
        buildBoard
    }
})();


(() => {
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    

    document.body.appendChild(container);
    const firstPage = function() {
        const gameContainer = document.createElement("div");
        gameContainer.setAttribute("class", "game-container");

        function setAttributes(el, attrs) {
            for (let key in attrs) {
                el.setAttribute(key, attrs[key])
            }
        }

        function startGame() {
            const inputOne = document.querySelector("#input-player1")
            const inputTwo = document.querySelector("#input-player2")
            const playerOneName = inputOne.value
            const playerTwoName = inputTwo.value

            console.log(playerOneName)
            console.log(playerTwoName)
            while (container.firstChild) {
                container.firstChild.remove();
            }


            const controller = init.buildBoard()
            const gameboard = controller.board


            function setBoardCells() {
                const cellsFragment = document.createDocumentFragment();
                for (let i = 0; i < gameboard.length; i++) {
                    const cell = document.createElement("div")
                    cell.setAttribute("class", `cell position-${i}`)
                    const cellEvent = function() {
                        if (init.decideGame()) {
                            cell.style.color = "white"
                            resetBoard();
                        } else if (!cell.textContent) {
                            const info = init.stats()
                            cell.textContent = init.playTurn(i);
                            cell.setAttribute("class", `cell position-${i} ${cell.textContent}-cell`)
                            displayPlayerOneWins.textContent = `${info.player1Wins}`
                            displayPlayerTwoWins.textContent = `${info.player2Wins}`
                            console.log(info)
                        }
                    }
                    cell.addEventListener("click", cellEvent);

                    cellsFragment.appendChild(cell)
                }
                return cellsFragment
            }


            function resetBoard() {
                board.replaceChildren();
                const newCells = setBoardCells();
                board.appendChild(newCells)
            };



            const resetButton = document.createElement("div")
            resetButton.setAttribute("id", "reset")
            resetButton.textContent = "Reset"
            resetButton.addEventListener("click", () => {
                init.resetGame()
                resetBoard()
            })

            const displayPlayerOne = document.createElement("div")
            displayPlayerOne.setAttribute("class", "name-container player-X")
            if (playerOneName === "") {
                displayPlayerOne.textContent = "X"
            } else {
                displayPlayerOne.textContent = playerOneName;
            }


            const displayPlayerTwo = document.createElement("div")
            displayPlayerTwo.setAttribute("class", "name-container player-O")
            displayPlayerTwo.textContent = playerTwoName;
            if (playerTwoName === ""){
                displayPlayerTwo.textContent = "O"
            } else {
                displayPlayerTwo.textContent = playerTwoName
            }
            
            const playerOneContainer = document.createElement("div")
            playerOneContainer.setAttribute("class", "player-one-container")
            const displayPlayerOneWins = document.createElement("div")
            displayPlayerOneWins.setAttribute("class", "name-container")
            displayPlayerOneWins.textContent = "0"
            playerOneContainer.appendChild(displayPlayerOne)
            playerOneContainer.appendChild(displayPlayerOneWins)
            
            const playerTwoContainer = document.createElement("div")
            playerTwoContainer.setAttribute("class", "player-two-container")
            const displayPlayerTwoWins = document.createElement("div")
            displayPlayerTwoWins.setAttribute("class", "name-container")
            displayPlayerTwoWins.textContent = "0"
            playerTwoContainer.appendChild(displayPlayerTwo)
            playerTwoContainer.appendChild(displayPlayerTwoWins)


            const board = document.createElement("div");
            board.setAttribute("id", "box")

            const cellsFragment = setBoardCells()
            board.appendChild(cellsFragment)
            
            const playersContainer = document.createElement("div")
            playersContainer.setAttribute("class", "players-container")
            playersContainer.appendChild(playerOneContainer)
            playersContainer.appendChild(playerTwoContainer)
            
            

            const topContainer = document.createElement("div")
            topContainer.setAttribute("class", "top-container")
            topContainer.appendChild(resetButton)

            gameContainer.appendChild(topContainer);
            gameContainer.appendChild(board);
            gameContainer.appendChild(playersContainer)
            container.appendChild(gameContainer);
        }


        const startPage = document.createElement("div");
        const runButton = document.createElement("div");
        const inputContainer = document.createElement("div");
        const playerOneName = document.createElement("input");
        const playerTwoName = document.createElement("input");


        startPage.setAttribute("class", "start-page");
        runButton.setAttribute("id", "run");
        inputContainer.setAttribute("class", "input-container");
        setAttributes(playerOneName, { "type": "text", "id": "input-player1", "name": "input-player", "placeholder": "Player 1" });
        setAttributes(playerTwoName, { "type": "text", "id": "input-player2", "name": "input-player", "placeholder": "Player 2" });

        runButton.textContent = "Start Game";

        runButton.addEventListener("click", startGame)

        startPage.appendChild(runButton);
        startPage.appendChild(inputContainer);
        inputContainer.appendChild(playerOneName);
        inputContainer.appendChild(playerTwoName);
        container.appendChild(startPage);
    };

    firstPage();





})();





//init.playTurn(4)
//init.decideGame()
//init.playTurn(0)
//init.decideGame()
//init.playTurn(2)
//init.decideGame()
//init.playTurn(3)
//init.decideGame()
//init.playTurn(5)
//init.decideGame()
//init.playTurn(6)
//init.decideGame()
//console.log(init.stats())
