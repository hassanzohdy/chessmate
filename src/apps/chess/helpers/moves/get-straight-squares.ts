import { Square } from "@chess/game/chess-square";
import { Player } from "../../game";
import {
  getBottomSquare,
  getLeftSquare,
  getRightSquare,
  getTopSquare,
} from "./get-square";
import { getSquaresFactory } from "./get-squares-factory";

/**
 * Get straight moves from current square
 * This will be used with Queen and Rook
 */
export function getStraightSquares(
  square: Square,
  player: Player,
  oneSquare = false,
): Square[] {
  const availableSquares: Square[] = [];

  const getSquares = getSquaresFactory({
    square,
    player,
    squares: availableSquares,
    oneSquare,
  });

  getSquares(getTopSquare);
  getSquares(getBottomSquare);
  getSquares(getRightSquare);
  getSquares(getLeftSquare);

  return availableSquares;
}
