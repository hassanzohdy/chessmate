import { useEvent } from "@mongez/react-hooks";
import { useState } from "react";
import { chessBoardAtom } from "../atoms";
import { GameState } from "../game";
import { Square } from "../game/chess-square";

export function useGameState(): GameState {
  const board = chessBoardAtom.value;
  const [state, setState] = useState(board.state);

  useEvent(() => board.onGameStateChange(setState));

  return state;
}

export function useBoard() {
  return chessBoardAtom.value;
}

export function useIsHighlightedSquare(square: Square) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const board = useBoard();

  useEvent(() =>
    board.onHighlightedSquaresChange(squares => {
      setIsHighlighted(squares.includes(square));
    }),
  );

  return isHighlighted;
}

export function useSquarePiece(square: Square) {
  const [piece, setPiece] = useState(square.piece);

  useEvent(() =>
    square.onPieceChange(p => {
      setPiece(p);
    }),
  );

  return piece;
}
