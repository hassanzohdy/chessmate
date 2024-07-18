import events, { EventSubscription } from "@mongez/events";
import { chessBoardAtom } from "../atoms";
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
   * Square id
   */
  public id!: string;

  /**
   * Square name
   */
  public name!: string;

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
   * Set square position and color
   */
  public setPositionAndColor(row: number, column: SquareColumnPosition) {
    this.column = column as SquareColumnPosition;
    this.row = row;
    this.color =
      (row + column) % 2 === 1 ? SquareColor.White : SquareColor.Black;

    this.id = `sqr-${this.row}-${this.column}`;

    // popular square name i.e G6
    this.name = `${SquareColumnPosition[this.column]}${this.row}`;
  }

  /**
   * Get square html element
   */
  public get element(): HTMLDivElement {
    return document.getElementById(this.id) as HTMLDivElement;
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
   * Highlight the square as a suggested move
   */
  public highlightAsSuggestedMove() {
    // if the game is not started, we don't need to highlight the squares
    if (!this.board.highlightedSquares.includes(this)) {
      return;
    }

    const squareElement = this.element;

    squareElement.setAttribute("data-bg", squareElement.style.backgroundColor);

    const squareBG = {
      [SquareColor.White]: "#c0c07b",
      [SquareColor.Black]: "#9f9f6b",
    };

    squareElement.style.backgroundColor = squareBG[this.color];
  }

  /**
   * remove highlight the square as a suggested move
   */
  public removeHighlightAsSuggestedMove() {
    const squareElement = this.element;

    if (squareElement.getAttribute("data-bg")) {
      squareElement.style.backgroundColor = squareElement.getAttribute(
        "data-bg",
      ) as string;

      squareElement.removeAttribute("data-bg");
    }
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

  protected get board() {
    return chessBoardAtom.value;
  }
}
