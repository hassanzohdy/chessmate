import { Square } from "apps/chess/game/chess-square";
import { PieceName } from "./../types";
import { Piece } from "./chess-piece";

export class Knight extends Piece {
  /**
   * Piece Name
   */
  public name = PieceName.Knight;

  public listAvailableMoves(): Square[] {
    // now knight has 8 possible moves
    // 1. row - 2, column - 1
    // 2. row - 2, column + 1
    // 3. row - 1, column - 2
    // 4. row - 1, column + 2
    // 5. row + 1, column - 2
    // 6. row + 1, column + 2
    // 7. row + 2, column - 1
    // 8. row + 2, column + 1

    const availableMoves: Square[] = [];

    const row = this.square.row;
    const column = this.square.column;

    // 1. row - 2, column - 1
    availableMoves.push(this.board.getSquare(row - 2, column - 1));
    // 2. row - 2, column + 1
    availableMoves.push(this.board.getSquare(row - 2, column + 1));
    // 3. row - 1, column - 2
    availableMoves.push(this.board.getSquare(row - 1, column - 2));
    // 4. row - 1, column + 2
    availableMoves.push(this.board.getSquare(row - 1, column + 2));
    // 5. row + 1, column - 2
    availableMoves.push(this.board.getSquare(row + 1, column - 2));
    // 6. row + 1, column + 2
    availableMoves.push(this.board.getSquare(row + 1, column + 2));
    // 7. row + 2, column - 1
    availableMoves.push(this.board.getSquare(row + 2, column - 1));
    // 8. row + 2, column + 1
    availableMoves.push(this.board.getSquare(row + 2, column + 1));

    return availableMoves.filter(square => {
      if (!square) return false;

      if (square.piece) {
        if (square.piece.player === this.player) return false;
      }

      return this.canProtectedTheKingInSquare(square);
    });
  }
}
