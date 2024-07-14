import { Square } from "../../game/chess-square";

/**
 * Check if the given two squares are in the same diagonal
 */
export function inSameDiagonal(squareA: Square, squareB: Square) {
  return (
    Math.abs(squareA.row - squareB.row) ===
    Math.abs(squareA.column - squareB.column)
  );
}
