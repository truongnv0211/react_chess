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

class Queen extends Piece {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(isWhite: boolean) {
    super(isWhite);
  }

  canMove(board: Board, spotStart: Spot, spotEnd: Spot): boolean {
    //To do
    return false;
  } 
}

class Knight extends Piece {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(isWhite: boolean) {
    super(isWhite);
  }

  canMove(board: Board, spotStart: Spot, spotEnd: Spot): boolean {
    //To do
    return false;
  } 
}

class Bishop extends Piece {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(isWhite: boolean) {
    super(isWhite);
  }

  canMove(board: Board, spotStart: Spot, spotEnd: Spot): boolean {
    //To do
    return false;
  } 
}

class Rook extends Piece {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(isWhite: boolean) {
    super(isWhite);
  }

  canMove(board: Board, spotStart: Spot, spotEnd: Spot): boolean {
    //To do
    return false;
  } 
}

class Pawn extends Piece {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(isWhite: boolean) {
    super(isWhite);
  }

  canMove(board: Board, spotStart: Spot, spotEnd: Spot): boolean {
    //To do
    return false;
  } 
}

class Spot {
  private _piece!: Piece | null;
  private _x!: number;
  private _y!: number;

  constructor(piece: Piece | null, x: number, y: number) {
    this.piece = piece;
    this.x = x;
    this.y = y;
  }

  get piece() : Piece | null {
    return this._piece;
  }

  set piece(newValue: Piece | null) {
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

  initGame() {
    this.boxes[0][0] = new Spot(new Rook(true), 0, 0);
    this.boxes[0][1] = new Spot(new Knight(true), 0, 1);
    this.boxes[0][2] = new Spot(new Bishop(true), 0, 2);
    this.boxes[0][3] = new Spot(new Queen(true), 0, 3);
    this.boxes[0][4] = new Spot(new King(true), 0 , 4);
    this.boxes[0][5] = new Spot(new Bishop(true), 0, 5);
    this.boxes[0][6] = new Spot(new Knight(true), 0, 6);
    this.boxes[0][7] = new Spot(new Rook(true), 0, 7);

    this.boxes[1][0] = new Spot(new Pawn(true), 1, 0);
    this.boxes[1][1] = new Spot(new Pawn(true), 1, 1);
    this.boxes[1][2] = new Spot(new Pawn(true), 1, 2);
    this.boxes[1][3] = new Spot(new Pawn(true), 1, 3);
    this.boxes[1][4] = new Spot(new Pawn(true), 1, 4);
    this.boxes[1][5] = new Spot(new Pawn(true), 1, 5);
    this.boxes[1][6] = new Spot(new Pawn(true), 1, 6);
    this.boxes[1][7] = new Spot(new Pawn(true), 1, 7);

    for (var i = 2; i < 6; i++) { 
      for (var j = 0; j < 8; j++) { 
          this.boxes[i][j] = new Spot(null, i, j); 
      } 
    } 

    this.boxes[6][0] = new Spot(new Pawn(false), 1, 0);
    this.boxes[6][1] = new Spot(new Pawn(false), 1, 1);
    this.boxes[6][2] = new Spot(new Pawn(false), 1, 2);
    this.boxes[6][3] = new Spot(new Pawn(false), 1, 3);
    this.boxes[6][4] = new Spot(new Pawn(false), 1, 4);
    this.boxes[6][5] = new Spot(new Pawn(false), 1, 5);
    this.boxes[6][6] = new Spot(new Pawn(false), 1, 6);
    this.boxes[6][7] = new Spot(new Pawn(false), 1, 7);

    this.boxes[7][0] = new Spot(new Rook(false), 0, 0);
    this.boxes[7][1] = new Spot(new Knight(false), 0, 1);
    this.boxes[7][2] = new Spot(new Bishop(false), 0, 2);
    this.boxes[7][3] = new Spot(new Queen(false), 0, 3);
    this.boxes[7][4] = new Spot(new King(false), 0 , 4);
    this.boxes[7][5] = new Spot(new Bishop(false), 0, 5);
    this.boxes[7][6] = new Spot(new Knight(false), 0, 6);
    this.boxes[7][7] = new Spot(new Rook(false), 0, 7);
  }
}