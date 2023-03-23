import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App(){

  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);

  const [stepNumber, setStepNumber] = useState(0);
  const calculateWinner =(squares)=>{
    const lines=[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], 
      [2, 4, 6]];
      
    for(let i=0; i<lines.length; i++){
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }    

  const current = history[stepNumber];

  const winner= calculateWinner(current.squares);

  let status;
  if(winner){
    status = `Winner: ${winner}`;
  }else{
    status = `Next Player: ${xIsNext? 'X': 'O'}`;
  }

  const handleClick=(i)=>{
    const newHistory = history.slice(0, stepNumber+1);
   
    const newCurrent = newHistory[newHistory.length-1];

    const newSquares = newCurrent.squares.slice(); // 배열을 새롭게 복사하기
    
     // 리턴값이 있거나, 
     // newSquares[i] => 이미 클릭을 한 경우. null이 아닌 경우
    if(calculateWinner(newSquares) || newSquares[i]){ 
      return;
    }
    newSquares[i] = xIsNext? 'X': 'O';
    // ...은 전개연산자. 원래 있던값을 넣어주고, 새로운 값을 추가
    setHistory([...newHistory,{squares:newSquares}]); 

   // 방법1   
   //setXIsNext(!xIsNext); -> 중복(setXIsNext(!xIsNext) 2개)인 경우 하나만 처리. true -> false
   // 방법2 - 현재 상태의 bool값을 가져와서 !를 사용해서 반대로 만들어 준다.
   // current는 xIsNext의 값이고, 명칭을 바꿔준 것
   setXIsNext(current => !current); // 중복(setXIsNext(!xIsNext) 2개)인 경우 2개 모두 처리. true -> false -> true
   setStepNumber(newHistory.length);
  }

  const moves = history.map((step, move)=>{
    const desc = move?  // 0은 false
      'Go to move #' + move : 'Go to game start';
    return(
      // 리액트에서 요소의 리스트를 나열할 경우 Key값이 필요.
      <li key={move}> 
        <button className="move-button" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  });

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0); // jump시 O, X를 알맞게 true, false로 변경
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
       
      </div>
      <div className="game-info">
        {status}
        <ol style={{listStyle:'none'}}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
