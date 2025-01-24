import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import reactLogo from './assets/react.svg'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TicTacToeorg from "./tictactoe/TicTacToe.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TicTacToeorg />} />
          <Route path="*" element={<TicTacToeorg />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
