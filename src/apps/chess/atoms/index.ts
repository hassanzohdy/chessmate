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
