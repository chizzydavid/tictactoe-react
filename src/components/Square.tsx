const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '22px',
  'color': 'black'
}

export type SquareProps = {
  position: number,
  value: string,
  handler: (position: number) => void
}

export function Square({ position, value, handler }: SquareProps) {
  return (
    <div
      onClick={() => handler(position)}
      className="square"
      style={squareStyle}>
      { value && <p> {value} </p> }
    </div>
  ); 
}

