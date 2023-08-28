import { ChessSquare } from "apps/chess/game/chess-square";
import { ChessPieceName } from "apps/chess/game/types";
import { ChessPiece } from "./chess-piece";

export class PawnPiece extends ChessPiece {
  /**
   * Piece Name
   */
  public name = ChessPieceName.Pawn;
  public canMoveTo(square: ChessSquare): boolean {
    throw new Error("Method not implemented.");
  }
  public listAvailableMoves(): ChessSquare[] {
    throw new Error("Method not implemented.");
  }
}
