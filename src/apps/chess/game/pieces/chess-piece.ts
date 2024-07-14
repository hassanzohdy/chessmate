import events from "@mongez/events";
import { Player } from "apps/chess/game/chess-player";
import { playSound } from "../../../../shared/play-sound";
import { chessBoardAtom } from "../../atoms";
import { Square } from "./../chess-square";
import { PieceName } from "./../types";

export abstract class Piece {
  /**
   * Piece Name
   */
  public abstract name: PieceName;

  /**
   * Whether the piece is moved
   */
  public isMoved = false;

  /**
   * Whether the piece is a promoted pawn
   */
  public isPromoted = false;

  /**
   * Whether the piece is taken
   */
  public isTaken = false;

  /**
   * The piece that took this piece
   */
  public takenBy?: Piece;

  /**
   * Whether piece is selected
   */
  public isSelected = false;

  /**
   * Constructor
   */
  public constructor(public player: Player, public square: Square) {
    player.addPiece(this);
    square.piece = this;
  }

  public moveToSquare(square: Square): void {
    if (square.piece) {
      this.capture(square.piece);
    }

    this.moveTo(square);
  }

  /**
   * Mark piece as taken
   */
  public taken(takenByPiece: Piece) {
    this.isTaken = true;
    this.takenBy = takenByPiece;

    // the timeout here is to wait
    events.trigger(`chess.piece.taken.${this.id}`, this);
  }

  /**
   * Listen to piece taken
   */
  public onTaken(callback: (piece: Piece) => void) {
    return events.subscribe(`chess.piece.taken.${this.id}`, callback);
  }

  /**
   * Piece id
   */
  public get id(): string {
    return `pieces${this.player.color}.${this.player.pieces.indexOf(this)}`;
  }

  /**
   * Move to the given square
   */
  public moveTo(square: Square) {
    this.square.setPiece(undefined);
    this.square = square;

    this.isMoved = true;

    square.setPiece(this);

    this.board.lastMovedPiece = this;

    events.trigger(`chess.piece.moved.${this.id}`, this);

    this.board.otherPlayer(this.player).checkIfKingIsInCheck();

    this.board.changeTurn();
    playSound("move");
  }

  /**
   * Listen to piece move
   */
  public onMove(callback: (piece: Piece) => void) {
    return events.subscribe(`chess.piece.moved.${this.id}`, callback);
  }

  /**
   * Check if piece can move to the given square
   */
  public canMoveTo(square: Square, ignoreCurrentTurn = false): boolean {
    if (!this.player.currentTurn && !ignoreCurrentTurn) return false;

    const availableSquares = this.listAvailableMoves();

    return availableSquares.includes(square);
  }

  /**
   * List the available moves for the piece
   */
  public abstract listAvailableMoves(): Square[];

  /**
   * Check if the piece can protected the king if under attack either by covering or attacking the attacking piece
   * Please note that this method should be called only when filtering the available moves
   */
  protected canProtectedTheKingInSquare(square: Square) {
    const squaresBetweenPieceAndKing =
      !this.player.isChecked || this.player.numberOfChecks > 1
        ? []
        : this.player.getSquaresBetweenKingAndAttackingPiece(
            this.player.checkedBy[0],
          );

    // now we need to check if current player's king is checked
    if (this.player.isChecked === false) return true;

    // before we check that, if the king is checked by more than oe piece,
    // the king must move thus the pawn can not move
    if (this.player.numberOfChecks > 1) return false;

    // now if the king is checked, we need to make sure that the pawn can move to a square that can protect the king
    // otherwise, we need to make sure that the pawn can attack the piece that is attacking the king

    const piece = this.player.checkedBy[0];

    // first case, the pawn can capture the attacking piece
    if (piece.square === square) return true;

    // if the piece is knight and can not be captured, it can not be blocked
    if (piece.name === PieceName.Knight) return false;

    // now we eed to check if the pawn can block the attacking piece
    return squaresBetweenPieceAndKing.includes(square);
  }

  /**
   * Capture the given piece
   */
  public capture(piece: Piece) {
    piece.taken(this);
    playSound("capture");
  }

  /**
   * Check if there is any piece protecting this piece
   */
  public get isProtectedByAnotherPiece(): boolean {
    // Until the check is done, make sure the square of the current piece has no piece
    this.square.piece = undefined;

    for (const piece of this.player.activePieces) {
      if (piece === this) continue;

      if (piece.canMoveTo(this.square, true)) {
        this.square.piece = this;
        return true;
      }
    }

    this.square.piece = this;

    return false;
  }

  /**
   * Get board
   */
  public get board() {
    return chessBoardAtom.value;
  }
}
