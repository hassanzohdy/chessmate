import { Square } from "apps/chess/game/chess-square";
import { PieceName } from "../types";
import { Piece } from "./chess-piece";

export class Rook extends Piece {
  /**
   * Piece Name
   */
  public name = PieceName.Rook;

  public canMoveTo(square: Square): boolean {
    throw new Error("Method not implemented.");
  }
  public listAvailableMoves(): Square[] {
    throw new Error("Method not implemented.");
  }
}
