import React from 'react';
import logo from './logo.svg';
import './App.css';

interface ISquareProps {
  value: number;
}

interface ISquareState {
  value: number | string;
}

class Square extends React.Component<ISquareProps, ISquareState> {
  constructor(props: { value: number }) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: 'X' })}>
        {this.state.value}
      </button>
    );
  }
}

const Board = () => {
  const renderSquare = (i: number) => {
    return <Square value={i} />;
  }
  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
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
