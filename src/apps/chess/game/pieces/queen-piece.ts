import { Square } from "apps/chess/game/chess-square";
import { getDiagonalSquares } from "../../helpers/moves/get-diagonal-squares";
import { getStraightSquares } from "../../helpers/moves/get-straight-squares";
import { PieceName } from "./../types";
import { Piece } from "./chess-piece";

export class Queen extends Piece {
  /**
   * Piece Name
   */
  public name = PieceName.Queen;

  public listAvailableMoves(): Square[] {
    // queen can move in all directions
    // 1. can move on the same row (up to 7 squares)
    // 2. can move on the same column (up to 7 squares)
    // 3. can move diagonally in all 4 directions (up to 7 squares per diagonal)

    return getStraightSquares(this.square, this.player).concat(
      getDiagonalSquares(this.square, this.player),
    );
  }
}
