import { ChessSquare } from "apps/chess/game/chess-square";
import { ChessPieceName } from "./../types";
import { ChessPiece } from "./chess-piece";

export class Bishop extends ChessPiece {
  /**
   * Piece Name
   */
  public name = ChessPieceName.Bishop;
  public canMoveTo(square: ChessSquare): boolean {
    throw new Error("Method not implemented.");
  }
  public listAvailableMoves(): ChessSquare[] {
    throw new Error("Method not implemented.");
  }
}
