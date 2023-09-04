import { Player } from "apps/chess/game/chess-player";
import { Square } from "./../chess-square";
import { PieceName } from "./../types";

export abstract class Piece {
  /**
   * Piece Name
   */
  public abstract name: PieceName;

  /**
   * Whether the piece is a promoted pawn
   */
  public isPromoted = false;

  /**
   * Whether the piece is taken
   */
  public isTaken?: boolean;

  /**
   * Constructor
   */
  public constructor(public player: Player, public square: Square) {
    //
    player.addPiece(this);
    square.piece = this;
  }

  /**
   * Move piece to the given square
   */
  public moveToSquare(square: Square) {
    //
  }

  /**
   * Take piece
   */
  public take() {
    //
  }

  /**
   * Check if piece can move to the given square
   */
  public abstract canMoveTo(square: Square): boolean;

  /**
   * List the available moves for the piece
   */
  public abstract listAvailableMoves(): Square[];
}
