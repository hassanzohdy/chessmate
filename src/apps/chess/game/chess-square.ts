import { Piece } from "./pieces";
import { SquareColor, SquareColumnPosition } from "./types";

export class Square {
  /**
   * Current Piece
   */
  public piece?: Piece;

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
