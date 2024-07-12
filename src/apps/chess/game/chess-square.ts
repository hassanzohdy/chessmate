import events, { EventSubscription } from "@mongez/events";
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

  /**
   * Check if square is highlighted as a suggested move
   */
  public isHighlighted = false;

  /**
   * Highlight the square
   */
  public highlight(highlight = true): void {
    this.isHighlighted = highlight;

    events.trigger(
      `chess.square.${this.row}.${this.column}.highlight`,
      highlight,
    );
  }

  /**
   * Listen to square highlight change
   */
  public onHighlightChange(
    callback: (highlight: boolean) => void,
  ): EventSubscription {
    return events.subscribe(
      `chess.square.${this.row}.${this.column}.highlight`,
      callback,
    );
  }

  /**
   * Set current piece to this square
   */
  public setPiece(piece?: Piece) {
    this.piece = piece;

    events.trigger(`chess.square.${this.row}.${this.column}.piece`, piece);
  }

  /**
   * Listen to piece change
   */
  public onPieceChange(callback: (piece?: Piece) => void): EventSubscription {
    return events.subscribe(
      `chess.square.${this.row}.${this.column}.piece`,
      callback,
    );
  }
}
