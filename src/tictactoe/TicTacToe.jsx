import React, { useState, useEffect } from "react";
import "./TicTacToe.css";

const TicTacToeCustom = () => {
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const [history, setHistory] = useState([]);

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setHistory([]);

    console.log("Game Reset");
  };

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setHistory([...history, { board: newBoard, move: index }]);
    winnerCheck(newBoard);
    setIsXTurn(!isXTurn);
  };

  const winnerCheck = (board) => {
    const winRules = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let rules of winRules) {
      const [a, b, c] = rules;

      console.log(board[a]);

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) setWinner("Draw");
  };

  return (
    <div className="container text-center">
      <h1 className="mb-4 title">
        <span>#</span> Tic Tac Toe <span>#</span>
      </h1>

      {/* Player Info Section */}
      <div className="player-info-container">
        <div className="player-info">
          <h6>Player 1 (X)</h6>
          <input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            placeholder="Enter Player 1 Name"
            className="name-input"
          />
          <div className={`player-status ${isXTurn ? "active" : ""}`}>
            {isXTurn ? "Your Turn" : "Waiting..."}
          </div>
        </div>

        <div className="player-info">
          <h6>Player 2 (O)</h6>
          <input
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            placeholder="Enter Player 2 Name"
            className="name-input"
          />
          <div className={`player-status ${!isXTurn ? "active" : ""}`}>
            {!isXTurn ? "Your Turn" : "Waiting..."}
          </div>
        </div>
      </div>

      {/* Game Section */}
      <div className="game-section">
        {/* Game Board */}
        <div className="game-board">
          <div className="board">
            {board.map((cell, index) => (
              <div
                key={index}
                className={`boxes ${cell ? "filled" : ""}`}
                onClick={() => handleCellClick(index)}
              >
                {cell}
              </div>
            ))}
          </div>
        </div>

        {/* Game Controls and Moves */}
        <div className="game-controls">
          { winner && (
            <div className="winner-message">
              <h2>
                {winner === "Draw"
                  ? "It's a Draw!"
                  : `Winner: ${
                    winner === "X" ? (player1Name === "" ? "X" : player1Name) : (player2Name === "" ? "O" : player2Name)
                    }`}
              </h2>
              <button className="btn btn-success mt-3" onClick={handleReset}>
                Reset Game
              </button>
            </div>
          )}

          <div className="game-moves mt-4">
            <h4>Game Moves</h4>
            <ul>
              {history.map((step, index) => (
                <li key={index}>
                  <button
                    onClick={() => setBoard(step.board)}
                    className="move-btn"
                  >
                    Go to Move #{index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToeCustom;
