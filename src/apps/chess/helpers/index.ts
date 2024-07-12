import { Square } from "../game/chess-square";

export function squareDoesNotHavePiece(square: Square) {
  return !square.piece;
}
