import { Pawn, Piece } from "@chess/game";
import { pieceImages } from "@chess/helpers/pieces-images";
import { useBoard } from "@chess/hooks";
import { useEvent } from "@mongez/react-hooks";
import { useEffect, useState } from "react";

export type PieceType = keyof typeof pieceImages.black;

export type PieceProps = {
  piece: Piece;
};

const calculatePosition = (piece: Piece, whiteStartsAtBottom: boolean) => {
  const row = piece.square.row;
  const column = piece.square.column;

  const top = whiteStartsAtBottom
    ? `${(8 - row) * 12.5}%`
    : `${(row - 1) * 12.5}%`;

  const left = `${(column - 1) * 12.5}%`;

  return { top, left };
};

export default function PieceComponent({ piece: incomingPiece }: PieceProps) {
  const [piece, setPiece] = useState(incomingPiece);

  const pieceImage = pieceImages[piece.player.color][piece.name];

  const board = useBoard();

  const whiteStartsAtBottom = true;

  const [position, setPosition] = useState(() =>
    calculatePosition(piece, whiteStartsAtBottom),
  );

  const [isTaken, setIsTaken] = useState(piece.isTaken);

  useEvent(
    () =>
      piece.onMove(() => {
        setPosition(calculatePosition(piece, whiteStartsAtBottom));
      }),
    [piece],
  );

  useEffect(() => {
    if (incomingPiece instanceof Pawn === false) return;

    incomingPiece.onPromoted(piece => {
      setPiece(piece);

      setPosition(calculatePosition(piece, whiteStartsAtBottom));
    });
  }, [incomingPiece, whiteStartsAtBottom]);

  useEvent(
    () =>
      piece.onTaken(() => {
        // time out here is for the animation to take place
        setTimeout(() => {
          setIsTaken(true);
        }, 100);
      }),
    [piece],
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
