import { ChessSquare } from "apps/chess/game/chess-square";
import { ChessPieceName } from "./../types";
import { ChessPiece } from "./chess-piece";

export class King extends ChessPiece {
  /**
   * Piece Name
   */
  public name = ChessPieceName.King;
  public canMoveTo(square: ChessSquare): boolean {
    throw new Error("Method not implemented.");
  }
  public listAvailableMoves(): ChessSquare[] {
    throw new Error("Method not implemented.");
  }
}
