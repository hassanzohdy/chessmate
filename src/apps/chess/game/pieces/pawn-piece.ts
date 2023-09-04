import { Square } from "apps/chess/game/chess-square";
import { PieceName } from "apps/chess/game/types";
import { Piece } from "./chess-piece";

export class Pawn extends Piece {
  /**
   * Piece Name
   */
  public name = PieceName.Pawn;
  public canMoveTo(square: Square): boolean {
    throw new Error("Method not implemented.");
  }
  public listAvailableMoves(): Square[] {
    throw new Error("Method not implemented.");
  }
}
