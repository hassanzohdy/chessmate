import { chessBoardAtom } from "../../atoms";
import { Square } from "../../game/chess-square";

export function getStraightSquaresBetween(squareA: Square, squareB: Square) {
  const board = chessBoardAtom.value;
  const squares: Square[] = [];

  // Assuming that the squares are in the same direction (either same row or same column)
  if (squareA.row === squareB.row) {
    // Horizontal movement
    let column = squareA.column;
    const columnIncrement = squareA.column < squareB.column ? 1 : -1;

    while (column !== squareB.column - columnIncrement) {
      column += columnIncrement;
      squares.push(board.getSquare(squareA.row, column));
    }
  } else if (squareA.column === squareB.column) {
    // Vertical movement
    let row = squareA.row;
    const rowIncrement = squareA.row < squareB.row ? 1 : -1;

    while (row !== squareB.row - rowIncrement) {
      row += rowIncrement;
      squares.push(board.getSquare(row, squareA.column));
    }
  }

  return squares;
}
