import React from 'react';
import logo from './logo.svg';
import './App.css';
import { exception } from 'console';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

abstract class Piece {
  private _killed: boolean = false;
  private _isWhite: boolean = false;

  constructor(isWhite: boolean) {
    this.isWhite = isWhite;
  }

  get killed(): boolean {
    return this._killed;
  }

  set killed(newValue: boolean) {
    this._killed = newValue;
  }

  get isWhite(): boolean {
    return this._isWhite;
  }

  set isWhite(newValue: boolean) {
    this._isWhite = newValue;
  }

  public abstract canMove(board: Board, spotStart: Spot, spotEnd: Spot) : boolean
}

class King extends Piece {
  _castlingDone: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(isWhite: boolean) {
    super(isWhite);
  }

  get castlingDone(): boolean {
    return this._castlingDone;
  }

  set castlingDone(newValue: boolean) {
    this._castlingDone = newValue;
  }

  canMove(board: Board, spotStart: Spot, spotEnd: Spot): boolean {
    // we can't move the piece to a Spot that  
    // has a piece of the same color 
    if (spotEnd.piece.isWhite === this.isWhite) {
      return false;
    }
    var x: number = Math.abs(spotStart.x - spotEnd.x);
    var y: number = Math.abs(spotStart.y - spotEnd.y);

    if (x + y === 1) {
        return true;
    }
    return false;
  }

  validCastling(): boolean {
    if (this.castlingDone) return false;
    //To do
    return true;
  }

  isCastlingMove(spotStart: Spot, spotEnd: Spot): boolean {
    //To do
    return false;
  }
}

class Spot {
  private _piece!: Piece;
  private _x!: number;
  private _y!: number;

  constructor(piece: Piece, x: number, y: number) {
    this.piece = piece;
    this.x = x;
    this.y = y;
  }

  get piece() : Piece {
    return this._piece;
  }

  set piece(newValue: Piece) {
    this._piece = newValue;
  }

  get x(): number {
    return this._x;
  }

  set x(newValue: number) {
    this._x = newValue;
  }

  get y(): number {
    return this._y;
  }

  set y(newValue: number) {
    this._y = newValue;
  }
}

class Board {
  boxes!: Spot[][];

  public getBox(x: number, y: number): Spot {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      throw new Error('Out of index');
    }
    return this.boxes[x][y];
  }
}