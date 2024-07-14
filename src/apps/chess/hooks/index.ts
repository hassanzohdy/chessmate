import { useEvent } from "@mongez/react-hooks";
import { useEffect, useState } from "react";
import {
  chessBoardAtom,
  highlightedSquaresAtom,
  rightClickHighlightedSquaresAtom,
} from "../atoms";
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

/**
 * Square could be highlight for the following cases:
 * 1. Red: If the square has a king or an attacking piece in check mode
 * 2. Yellow: should be only on two squares, the old square that the piece moved from and the new square that the piece moved to
 * 4. Green: When player clicks on a square that has his own piece
 *
 * There are other cases but will be implemented only on practicing matches or on analysis mode
 */
export function useHighlightedSquare(square: Square) {
  const [highlightColor, setHighlightColor] = useState<string>();

  useEvent(() =>
    highlightedSquaresAtom.onChange(squares => {
      let found = false;

      for (const highlightedSquare of squares) {
        if (highlightedSquare.square === square) {
          found = true;
          switch (highlightedSquare.type) {
            case "check":
              setHighlightColor("#c85757");
              break;
            case "move":
              setHighlightColor("#efe05e");
              break;
            case "selected":
              setHighlightColor("#829769");
              break;
            case "opponentSelected":
              setHighlightColor("#986698");
              break;
            case "attacking":
              setHighlightColor("#c85757");
              break;
          }
        }
      }

      if (!found) {
        setHighlightColor(undefined);
      }
    }),
  );

  return highlightColor;
}

export function useCircleHighlightSquare(square: Square) {
  const [isRightClicked, setIsRightClicked] = useState(false);

  useEvent(() =>
    rightClickHighlightedSquaresAtom.onChange(squares => {
      setIsRightClicked(squares.includes(square));
    }),
  );

  return isRightClicked;
}

/**
 * 3. Circle Green: When player right click on a square, the square should be highlighted with green color, this could be in another hoo
 */
export function useOnSquareClick(square: Square) {
  useEffect(() => {
    const squareElement = document.getElementById(square.id) as HTMLDivElement;

    if (!squareElement) return;

    const rightClickCallback = (e: MouseEvent) => {
      e.preventDefault();

      rightClickHighlightedSquaresAtom.toggleSquare(square);
    };

    squareElement.addEventListener("contextmenu", rightClickCallback);

    const leftClickCallback = () => {
      rightClickHighlightedSquaresAtom.clearAll();

      if (square.piece) return;

      highlightedSquaresAtom.clearPieceSelection();
    };

    squareElement.addEventListener("click", leftClickCallback);

    return () => {
      squareElement.removeEventListener("contextmenu", rightClickCallback);
      squareElement.removeEventListener("click", leftClickCallback);
    };
  }, [square]);
}

export function useIsPointingToSquare(square: Square) {
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
