import { chessBoardAtom } from "../../atoms";
import { Square } from "../../game/chess-square";

export function getStraightSquaresBetween(squareA: Square, squareB: Square) {
  const board = chessBoardAtom.value;
  const squares: Square[] = [];

  // we will assume when this function is called, they are always in same direction
  // TODO: add the check later

  // now we need to list all squares between the two squares, starting from squareA to squareB

  let row = squareA.row;
  let column = squareA.column;

  const rowIncrement = squareA.row < squareB.row ? 1 : -1;
  const columnIncrement = squareA.column < squareB.column ? 1 : -1;

  while (row !== squareB.row && column !== squareB.column) {
    row += rowIncrement;
    column += columnIncrement;

    squares.push(board.getSquare(row, column));
  }

  return squares;
}
