import { ChessBoard } from "apps/chess/game/chess-board";
import { Piece } from "./pieces";
import { PlayerColor } from "./types";

export class Player {
  /**
   * Player Name
   */
  public name = "";

  /**
   * Player Color
   */
  public color!: PlayerColor;

  /**
   * Check if player is winner
   */
  public isWinner?: boolean;

  /**
   * Current pieces with the player
   */
  public pieces: Piece[] = [];

  /**
   * Taken Pieces from the current player
   *
   * Pieces + TakenPieces = 16
   */
  public takenPieces: Piece[] = [];

  /**
   * Whether if the player is being checked
   */
  public isChecked?: boolean;

  /**
   * Check if player can castle
   */
  public canCastle = {
    kingSide: true,
    queenSide: true,
  };

  /**
   * Player Board
   */
  public board!: ChessBoard;

  /**
   * Check if the current player is in turn
   */
  public get currentTurn() {
    return this.board.currentPlayer === this;
  }

  /**
   * Add piece
   */
  public addPiece(piece: Piece) {
    this.pieces.push(piece);

    return this;
  }

  /**
   * Check if current player is black
   */
  public get isBlack(): boolean {
    return this.color === PlayerColor.Black;
  }

  /**
   * Check if current player is white
   */
  public get isWhite(): boolean {
    return this.color === PlayerColor.White;
  }
}
