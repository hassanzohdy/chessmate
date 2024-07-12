import { chessBoardAtom } from "../../atoms";
import { Square } from "../../game/chess-square";

export function getTopRightSquare(square: Square) {
  return chessBoardAtom.value.getSquare(square.row + 1, square.column + 1);
}

export function getTopLeftSquare(square: Square) {
  return chessBoardAtom.value.getSquare(square.row + 1, square.column - 1);
}

export function getBottomRightSquare(square: Square) {
  return chessBoardAtom.value.getSquare(square.row - 1, square.column + 1);
}

export function getBottomLeftDiaSquare(square: Square) {
  return chessBoardAtom.value.getSquare(square.row - 1, square.column - 1);
}

export function getTopSquare(square: Square) {
  return chessBoardAtom.value.getSquare(square.row + 1, square.column);
}

export function getBottomSquare(square: Square) {
  return chessBoardAtom.value.getSquare(square.row - 1, square.column);
}

export function getRightSquare(square: Square) {
  return chessBoardAtom.value.getSquare(square.row, square.column + 1);
}

export function getLeftSquare(square: Square) {
  return chessBoardAtom.value.getSquare(square.row, square.column - 1);
}
