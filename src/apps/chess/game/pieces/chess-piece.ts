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
  public canMoveTo(square: Square): boolean {
    if (!this.player.currentTurn) return false;

    const availableSquares = this.listAvailableMoves();

    return availableSquares.includes(square);
  }

  /**
   * List the available moves for the piece
   */
  public abstract listAvailableMoves(): Square[];

  /**
   * Capture the given piece
   */
  public capture(piece: Piece) {
    piece.taken(this);
    playSound("capture");
  }

  /**
   * Get board
   */
  public get board() {
    return chessBoardAtom.value;
  }
}
