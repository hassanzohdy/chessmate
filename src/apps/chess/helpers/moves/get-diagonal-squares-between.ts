import { Square } from "@chess/game/chess-square";
import { chessBoardAtom } from "../../atoms";

export function getDiagonalSquaresBetween(squareA: Square, squareB: Square) {
  const board = chessBoardAtom.value;

  const squares: Square[] = [];

  let row = squareA.row;
  let column = squareA.column;

  const rowIncrement = squareA.row < squareB.row ? 1 : -1;
  const columnIncrement = squareA.column < squareB.column ? 1 : -1;

  // Move one step from the starting square
  row += rowIncrement;
  column += columnIncrement;

  while (row !== squareB.row && column !== squareB.column) {
    row += rowIncrement;
    column += columnIncrement;

    squares.push(board.getSquare(row, column));
  }

  return squares;
}
