import { Player } from "@chess/game";
import { Square } from "@chess/game/chess-square";

export function getSquaresFactory({
  square,
  player,
  squares,
  oneSquare = false, // will be used for king
}: {
  square: Square;
  player: Player;
  squares: Square[];
  oneSquare?: boolean;
}) {
  return function factory(
    factoryFunction: (square: Square) => Square | undefined,
  ) {
    let nextSquare = factoryFunction(square);

    while (nextSquare) {
      if (nextSquare.piece?.player === player) {
        break;
      }

      squares.push(nextSquare);

      if (oneSquare) {
        break;
      }

      if (nextSquare?.piece) {
        break;
      }

      nextSquare = factoryFunction(nextSquare);
    }
  };
}
