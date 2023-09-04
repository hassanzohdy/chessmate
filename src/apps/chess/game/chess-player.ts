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
   * Player Board
   */
  public board!: ChessBoard;

  /**
   * Add piece
   */
  public addPiece(piece: Piece) {
    this.pieces.push(piece);

    return this;
  }
}
