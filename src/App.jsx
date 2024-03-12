import React, { useState, useEffect } from 'react'
import { Square } from './components/Square.jsx';
import confetti from 'canvas-confetti'
import { TURNS } from './constants.js';
import { checkWinner, checkEndGame } from "./logic/board.js"
import { WinnerModal } from './components/WinnerModal.jsx';

const App = () => {

  const [board, setBoard] = useState(() => {
    
    const boardFromStorage = window.localStorage.getItem("board")
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });
  
  console.log(board[0])
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ? turnFromStorage : TURNS.X
  });

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  
  const [squareColors, setSquareColors] = useState(() => {
    const squeareColorStorage = window.localStorage.getItem("squareColors")
    return squeareColorStorage ? JSON.parse(squeareColorStorage) : Array(9).fill("#FFFFFF")
  });




  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null)
    setSquareColors(Array(9).fill("#FFFFFF"));

    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
    window.localStorage.removeItem("squareColors")
  }



  const updateBoard = (index) => {

    //para que no se sobrescriba
    if (board[index] || winner) {
      return
    }

    //ACTUALIZAR BOARD
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard)

    //Cambiar de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Guardar partida
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)
 

    //revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }


      const newSquareColors = [...squareColors];
      if (turn === TURNS.X) {
        newSquareColors[index] = "#FF0000"; // Color rojo para X
      } else {
        newSquareColors[index] = "#0000FF"; // Color azul para O
      }
      setSquareColors(newSquareColors);

      window.localStorage.setItem("squareColors", JSON.stringify(newSquareColors))
  }
  return (
    <main className='board'>
      <h1>triki</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (

              <Square key={index} index={index} updateBoard={updateBoard} color={squareColors[index]} >{square}</Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App