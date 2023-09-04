import { Square } from "apps/chess/game/chess-square";
import { BishopColor, PieceName } from "./../types";
import { Piece } from "./chess-piece";

export class Bishop extends Piece {
  /**
   * Piece Name
   */
  public name = PieceName.Bishop;

  /**
   * Bishop Color
   */
  public color!: BishopColor;

  public canMoveTo(square: Square): boolean {
    throw new Error("Method not implemented.");
  }

  public listAvailableMoves(): Square[] {
    throw new Error("Method not implemented.");
  }
}
