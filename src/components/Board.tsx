import { useEffect, useState } from "react";
import { Square } from "./Square";



const rowStyle = {
  display: 'flex'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column' as 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column' as 'column'
} 

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}


export function Board() {
  const emptyBoard = Array(9).fill(null);
  const [squares, setSquares] = useState(emptyBoard);
  const [winner, setWinner] = useState(null)
  const [nextTurnX, setNextTurnX] = useState(true)

  const checkWinner = () => {
    let winValue = null;
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        winValue = squares[a];
        break;
      }
    }
    setWinner(winValue)
  }

  useEffect(() => {
    checkWinner()
  }, [squares])

  const handleSquareClick = (position: number) => {
    if (winner || squares[position]) return;

    const allSquares = [...squares]
    allSquares[position] = nextTurnX ? 'X' : 'O';
    setSquares(allSquares);
    setNextTurnX(!nextTurnX);
  }

  const resetBoard = () => {
    setSquares(emptyBoard);
    setWinner(null);
    setNextTurnX(true);
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span> {nextTurnX ? 'X' : 'O' }</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span> { winner ? winner : 'None'} </span>
      </div>

      <button onClick={resetBoard} style={buttonStyle}>Reset</button>

      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {[0,1,2].map((pos, posIdx) => 
            <Square key={posIdx} position={pos} value={squares[pos]} handler={handleSquareClick}/>
          )}
        </div>
        <div className="board-row" style={rowStyle}>
          {[3,4,5].map((pos, posIdx) => 
            <Square key={posIdx} position={pos} value={squares[pos]} handler={handleSquareClick}/>
          )}
        </div>
        <div className="board-row" style={rowStyle}>
          {[6,7,8].map((pos, posIdx) => 
            <Square key={posIdx} position={pos} value={squares[pos]} handler={handleSquareClick}/>
          )}
        </div>
      </div>
    </div>
  );
}



