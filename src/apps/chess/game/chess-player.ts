import { ChessBoard } from "apps/chess/game/chess-board";
import { ChessPiece } from "./pieces";
import { PlayerColor } from "./types";

export class ChessPlayer {
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
  public pieces: ChessPiece[] = [];

  /**
   * Taken Pieces
   */
  public takenPieces: ChessPiece[] = [];

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
  public addPiece(piece: ChessPiece) {
    this.pieces.push(piece);

    return this;
  }
}
