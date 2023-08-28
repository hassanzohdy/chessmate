import { ChessPiece } from "./pieces";
import { SquareColor, SquareColumnPosition } from "./types";

export class ChessSquare {
  /**
   * Current Piece
   */
  public piece?: ChessPiece;

  /**
   * Square Color
   */
  public color!: SquareColor;

  /**
   * Square Row
   */
  public row!: number;

  /**
   * Square Column
   */
  public column!: SquareColumnPosition;
}
