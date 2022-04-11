const Square = ({ id, player, newState }) => {
    const [color, setColor] = React.useState('green');
    const [status, setStatus] = React.useState(null);
    const xo = ['0', 'X'];
    const palet = ['red', 'blue', 'green'];
    const getRandomColor = () =>palet[Math.floor(Math.random()*3)];
    React.useEffect(()=>{
        console.log(`Render ${id}`);
        return ()=> console.log(`unmounting Square ${id}`);
    });
    
    return (
        <button onClick={e => {
            let col = getRandomColor();
            setColor(col);
            let nextPlayer = newState({id});
            setStatus(nextPlayer);
            e.target.style.background = col;
        }}
        >
            <h1>{xo[status]}</h1>
        </button>
    );
};

const Board = () => {
    const [player, setPlayer] = React.useState(1);
    const [state, setState] = React.useState(Array(9).fill(null));
  let status = `Player ${player}`;
  let winner = checkWinner(state);
  if(winner !=null) status = `Player ${winner} wins`
  const newState = idOfSquare =>{
    let thePlayer = player;
    state[idOfSquare] = player;
    setState(state);
    let nextPlayer = (player + 1) % 2;
    setPlayer(nextPlayer);  
      return thePlayer;
  };
  const toggle = ()=> setMounted(!mounted);
  const reRender = ()=> setRandom(Math.random());
  function renderSquare(i) {
      return <Square id={i} player={player} newState={newState}></Square>
  }
  return (
    <div className="game-board">
        <div className="grid-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
        </div>
        <div className="grid-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
        </div>
        <div className="grid-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
        </div>
      <div id="info">
        <button onClick={toggle}>Show/Hide Row</button>
        <button onClick={reRender}>Re-Render</button>
        <h1> {status} </h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));