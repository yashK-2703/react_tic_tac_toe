import Board from './Board.js'
import React, { useState } from 'react';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Game() {
    const [currPlayer, setCurrPlayer] = useState("X")
    const [history, SetHistory] = useState(
        [{
            squares: Array(9).fill(null),
        }]
    )
    const [stepNumber, setStepNumber] = useState(0);

    function jumpTo(step) {
        setStepNumber(step);
        setCurrPlayer(step % 2 === 0 ? "X" : "O");
    }

    function handleClick(i) {
        const historycopy = history.slice(0, stepNumber + 1);
        const current = historycopy[historycopy.length - 1];
        const square = current.squares.slice();
        if (calculateWinner(square) || square[i]) {
            return;
        }
        square[i] = currPlayer;
        setCurrPlayer(currPlayer == "X" ? "O" : "X")
        SetHistory(history.concat([{ squares: square }]))
        setStepNumber(history.length)
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = `Next player: ${currPlayer}`;
    }
    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    return (
        <div>
            <button onClick={() => window.location.reload(false)} >Clear</button>
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        handleClick={(i) => handleClick(i)} />
                </div>
                <div className="game-info">
                    <div> {status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        </div>
    );
}
export default Game