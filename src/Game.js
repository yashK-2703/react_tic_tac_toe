import Board from './Board.js'
import React, { useState } from 'react';

function Game() {

    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>Hello</div>
                <ol></ol>
            </div>
        </div>
    );
}
export default Game