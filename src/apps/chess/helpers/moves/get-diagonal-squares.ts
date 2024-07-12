import { Square } from "@chess/game/chess-square";
import { Player } from "../../game";
import {
  getBottomLeftDiaSquare,
  getBottomRightSquare,
  getTopLeftSquare,
  getTopRightSquare,
} from "./get-square";
import { getSquaresFactory } from "./get-squares-factory";

/**
 * Get all diagonal squares starting from the given square
 */
export function getDiagonalSquares(
  square: Square,
  currentPlayer: Player,
  oneSquare = false,
) {
  const availableSquares: Square[] = [];

  const addSquares = getSquaresFactory({
    square,
    player: currentPlayer,
    squares: availableSquares,
    oneSquare,
  });

  addSquares(getTopRightSquare);
  addSquares(getTopLeftSquare);
  addSquares(getBottomRightSquare);
  addSquares(getBottomLeftDiaSquare);

  return availableSquares;
}
