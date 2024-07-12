import { Square } from "apps/chess/game/chess-square";
import { getDiagonalSquares } from "../../helpers/moves/get-diagonal-squares";
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

  public listAvailableMoves(): Square[] {
    return getDiagonalSquares(this.square, this.player);
  }
}
