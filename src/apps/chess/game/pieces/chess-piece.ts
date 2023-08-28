import { ChessPlayer } from "apps/chess/game/chess-player";
import { ChessSquare } from "./../chess-square";
import { ChessPieceName } from "./../types";

export abstract class ChessPiece {
  /**
   * Piece Name
   */
  public abstract name: ChessPieceName;

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
  public constructor(public player: ChessPlayer, public square: ChessSquare) {
    //
    player.addPiece(this);
    square.piece = this;
  }

  /**
   * Check if piece can move to the given square
   */
  public abstract canMoveTo(square: ChessSquare): boolean;

  /**
   * Move piece to the given square
   */
  public moveToSquare(square: ChessSquare) {
    //
  }

  /**
   * List the available moves for the piece
   */
  public abstract listAvailableMoves(): ChessSquare[];

  /**
   * Take piece
   */
  public take() {
    //
  }
}
