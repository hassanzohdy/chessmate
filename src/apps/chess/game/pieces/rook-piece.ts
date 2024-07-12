import { Square } from "apps/chess/game/chess-square";
import { getStraightSquares } from "../../helpers/moves/get-straight-squares";
import { PieceName } from "../types";
import { Piece } from "./chess-piece";

export class Rook extends Piece {
  /**
   * Piece Name
   */
  public name = PieceName.Rook;

  public listAvailableMoves(): Square[] {
    // 1. can move on the same row (up to 7 squares)
    // 2. can move on the same column (up to 7 squares)

    return getStraightSquares(this.square, this.player);
  }
}
