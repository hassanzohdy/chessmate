import { atom } from "@mongez/react-atom";
import { ChessBoard, Pawn, PieceName } from "../game";
import { Square } from "../game/chess-square";

export const chessBoardAtom = atom<ChessBoard>({
  key: "chessboard",
  default: undefined as any,
});

chessBoardAtom.update(new ChessBoard());

export const promotionSelectionAtom = atom<{
  pawn: Pawn;
  promotingSquare: Square;
  selectedPiece:
    | PieceName.Bishop
    | PieceName.Knight
    | PieceName.Rook
    | PieceName.Queen;
  opened: boolean;
}>({
  key: "promotionSelection",
  default: {
    opened: false,
  },
});

export type RightClickHighlightedSquaresActions = {
  toggleSquare: (square: Square) => void;
  removeIfExist: (square: Square) => void;
  clearAll: () => void;
};

export const rightClickHighlightedSquaresAtom = atom<
  Square[],
  RightClickHighlightedSquaresActions
>({
  key: "rightClickHighlightedSquares",
  default: [],
  actions: {
    toggleSquare: (square: Square) => {
      if (rightClickHighlightedSquaresAtom.value.includes(square)) {
        rightClickHighlightedSquaresAtom.update(
          rightClickHighlightedSquaresAtom.value.filter(s => s !== square),
        );
      } else {
        rightClickHighlightedSquaresAtom.update([
          ...rightClickHighlightedSquaresAtom.value,
          square,
        ]);
      }
    },
    removeIfExist: (square: Square) => {
      if (rightClickHighlightedSquaresAtom.value.includes(square)) {
        rightClickHighlightedSquaresAtom.update(
          rightClickHighlightedSquaresAtom.value.filter(s => s !== square),
        );
      }
    },
    clearAll: () => {
      rightClickHighlightedSquaresAtom.reset();
    },
  },
});

type HighlightedSquare = {
  square: Square;
  // highlight type
  type: "check" | "move" | "selected" | "opponentSelected" | "attacking";
};

type HighlightedSquaresActions = {
  toggleSelectedPieceSquare: (square: Square) => void;
  toggleOpponentSelectedPieceSquare: (square: Square) => void;
};

export const highlightedSquaresAtom = atom<
  HighlightedSquare[],
  HighlightedSquaresActions
>({
  key: "highlightedSquares",
  default: [],
  actions: {
    toggleSelectedPieceSquare: (square: Square) => {
      for (const highlightedSquare of highlightedSquaresAtom.value) {
        if (highlightedSquare.square === square) {
          if (highlightedSquare.type === "selected") {
            // unselect
            highlightedSquaresAtom.update(
              highlightedSquaresAtom.value.filter(
                s => s !== highlightedSquare && s.type !== "selected",
              ),
            );
            return;
          }

          highlightedSquare.type = "selected";
          highlightedSquaresAtom.update([...highlightedSquaresAtom.value]);
          return;
        }
      }

      highlightedSquaresAtom.update([
        ...highlightedSquaresAtom.value.filter(s => s.type !== "selected"),
        {
          square,
          type: "selected",
        },
      ]);
    },
    toggleOpponentSelectedPieceSquare: (square: Square) => {
      for (const highlightedSquare of highlightedSquaresAtom.value) {
        if (highlightedSquare.square === square) {
          if (highlightedSquare.type === "opponentSelected") {
            // unselect
            highlightedSquaresAtom.update(
              highlightedSquaresAtom.value.filter(
                s => s !== highlightedSquare && s.type !== "opponentSelected",
              ),
            );
            return;
          }

          highlightedSquare.type = "opponentSelected";
          highlightedSquaresAtom.update([...highlightedSquaresAtom.value]);
          return;
        }
      }

      highlightedSquaresAtom.update([
        ...highlightedSquaresAtom.value.filter(
          s => s.type !== "opponentSelected",
        ),
        {
          square,
          type: "opponentSelected",
        },
      ]);
    },
  },
});
