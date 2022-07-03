import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// class Square extends React.Component {
//     constructor(props) {
//         super(props);
//         // Board 컴포넌트로 state 를 끌어올리기
//         this.state = {
//             value: null,
//         };

//     }
//     // borad에 정의된 onclick 함수
//     render() {
//       return (
//         <button 
//             className="square" 
//             onClick={() => this.props.onClick()}
//         >
//           {this.props.value}
//         </button>
//       );
//     }
//   }

  // 함수 컴포넌트로 변경 - 간단하게 작성, state 없이 render 함수만을 가지는 형태
  const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
    );
  }
  
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true, 
        };
    }

    getHistory() {
        return this.state.history.slice(0, this.state.stepNumber + 1);
    }

    // React에서 이벤트를 나타내는 prop에는 on[Event], 이벤트를 처리하는 함수에는 handle[Event]를 사용하는 것이 일반적입니다.
    handleClick(i) {
        const history = this.getHistory();
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();

        // 승자 나온경우, 이미 클릭한 경우 
        if(calculateWinner(squares) || squares[i]) {
            return;
        } 

        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({
            // push <-> concat (변경하지 않음)
            // history: history.concat([{
            //     squares: squares,
            // }]),
            history: [...history, { squares: squares }],
            xIsNext: !this.state.xIsNext,
            stepNumber: this.state.stepNumber + 1 ,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    
    render() {
        // const history = this.state.history;
        const history = this.getHistory();
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map ((step, move) => {
            const desc = move ? `Go to #${move}`: 'Go to game start';
            return (
                <li key={move}>
                   <button onClick={() => this.jumpTo(move)}>{desc}</button> 
                </li>
            )
        });

        let status = null;
        
        if (winner) {
            status = `Winner: ${winner}`
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X': 'O'}`;
        }
        
        return (
            <div className="game">
            <div className="game-board">
                <Board onClick={(i) => this.handleClick(i)} squares={current.squares}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol> 
            </div>
            </div>
        );
        }
  }

  // 승자 확인
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
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  