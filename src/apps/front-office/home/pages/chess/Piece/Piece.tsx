import { Piece } from "@chess/game";
import { useEvent } from "@mongez/react-hooks";
import { useCallback, useState } from "react";
import { useBoard } from "../../../../../chess/hooks";

const pieceImages = {
  white: {
    pawn: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
    knight:
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
    bishop:
      "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
    rook: "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
    queen:
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
    king: "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
  },
  black: {
    pawn: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg",
    knight:
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",
    bishop:
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",
    rook: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",
    queen:
      "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg",
    king: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg",
  },
};

export type PieceType = keyof typeof pieceImages.black;

export type PieceProps = {
  piece: Piece;
};

export default function PieceComponent({ piece }: PieceProps) {
  const pieceImage = pieceImages[piece.player.color][piece.name];

  const board = useBoard();

  const whiteStartsAtBottom = true;

  const calculatePosition = useCallback(() => {
    const row = piece.square.row;
    const column = piece.square.column;
    const top = whiteStartsAtBottom
      ? `${(8 - row) * 12.5}%`
      : `${(row - 1) * 12.5}%`;
    const left = `${(column - 1) * 12.5}%`;
    return { top, left };
  }, [piece.square, whiteStartsAtBottom]);

  const [position, setPosition] = useState(calculatePosition());
  const [isTaken, setIsTaken] = useState(piece.isTaken);

  useEvent(() =>
    piece.onMove(() => {
      setPosition(calculatePosition());
    }),
  );

  useEvent(() =>
    piece.onTaken(p => {
      setTimeout(() => {
        setIsTaken(true);
      }, 100);
    }),
  );

  const detectAvailableMoves = () => {
    if (!board.isStarted) return;

    if (!piece?.player?.currentTurn) {
      board.clearHighlightedSquares();
      board.clearSelectedPiece();

      return;
    }

    board.setHighlightedSquares(piece.listAvailableMoves());

    board.setSelectPiece(piece);
  };

  console.log("Rendering", piece.name, piece.player.color, piece.id);

  if (isTaken) return null;

  return (
    <img
      onClick={detectAvailableMoves}
      src={pieceImage}
      alt={piece.name}
      className="absolute cursor-pointer w-[12.5%] h-[12.5%]"
      style={{
        transition: "all 0.2s ease-in-out",
        ...position,
      }}
    />
  );
}
