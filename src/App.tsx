import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { type } from 'os';

type IValue = string | null;

interface ISquareProps {
  value: IValue;
  onClick: () => void;
}

const Square = (props: ISquareProps) => (
  <button
    className="square"
    onClick={props.onClick}
  >
    {props.value}
  </button>
);

const calculateWinner = (squares: IValue[]) => {
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
  const winningLine = ([a, b, c]: IValue[]) => a && a === b && b === c ? a : null;

  return lines
    .map(line => {
      const [a, b, c] = line;
      return winningLine([squares[a], squares[b], squares[c]])
    })
    .find(value => !!value);
}

interface IBoardState {
  squares: IValue[];
  xIsNext: boolean;
}

class Board extends React.Component<{} | undefined/*RAV props type */, IBoardState> {

  //RAV How to properly define state in React components https://itnext.io/how-to-properly-define-state-in-react-components-47544eb4c15d
  state: Readonly<IBoardState>;

  constructor() {
    super(undefined); //RAV my walkaround for no props component...
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  renderSquare(i: number) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const status = winner
      ? 'Winner: ' + winner
      : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
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
};

//RAV functional compoment can't have state and can't use Lifecycle Hooks ...
const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
    <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
);

export default Game;
