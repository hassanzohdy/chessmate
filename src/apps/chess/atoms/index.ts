import { atom } from "@mongez/react-atom";
import { Bishop, ChessBoard, Pawn, Queen, Rook } from "../game";
import { Square } from "../game/chess-square";
import { Knight } from "../game/pieces/knight-piece";

export const chessBoardAtom = atom<ChessBoard>({
  key: "chessboard",
  default: undefined as any,
});

chessBoardAtom.update(new ChessBoard());

export const promotionSelectionAtom = atom<{
  pawn: Pawn;
  promotingSquare: Square;
  promotedPiece: Bishop | Knight | Rook | Queen;
  opened: boolean;
}>({
  key: "promotionSelection",
  default: {
    opened: false,
  },
});
