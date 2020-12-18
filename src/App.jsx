import React, { useEffect, useState } from 'react'
import './App.css'
import { gameSubject, initGame, resetGame } from './Game'
import Board from './Board'

function App() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()
  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe((game) => { //store the subscribers into a variable, so that it can be unsubscribed later
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setTurn(game.turn)
    })
    return () => subscribe.unsubscribe()
  }, [])  //pass dependencies in empty array because it will be excuted once when everything is mount
  return (
    <div className="container">
      <h2 className="vertical-text">
        <button onClick={resetGame}>
          <span className="vertical-text"> RESET GAME</span>
        </button>
      </h2>
      {isGameOver && (
        <h2 className="vertical-text">
          GAME OVER
          <button onClick={resetGame}>
            <span className="vertical-text"> NEW GAME</span>
          </button>
        </h2>
      )}
      <div className="board-container">
        <Board board={board} turn={turn} />
      </div>
      {result && <p className="vertical-text">{result}</p>}
    </div>
  )
}

export default App
