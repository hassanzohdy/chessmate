import { Square } from "@chess/game/chess-square";
import {
  useBoard,
  useCircleHighlightSquare,
  useHighlightedSquare,
  useIsPointingToSquare,
  useOnSquareClick,
  useSquarePiece,
} from "@chess/hooks";

export type SquareProps = {
  color: "white" | "black";
  square: Square;
};

const backgroundColor = {
  white: "#f0d9b5",
  black: "#b58863",
};

export default function SquareComponent({ color, square }: SquareProps) {
  const bgColor = backgroundColor[color];
  const board = useBoard();
  const isPointingToSquare = useIsPointingToSquare(square);
  const piece = useSquarePiece(square);
  useOnSquareClick(square);
  const isHighlightedFromRightClick = useCircleHighlightSquare(square);
  const highlightedColor = useHighlightedSquare(square);

  const detectAvailableMoves = () => {
    if (!board.isStarted) return;

    if (board.selectedPiece) {
      if (board.selectedPiece.canMoveTo(square)) {
        board.selectedPiece.moveToSquare(square);
        board.clearHighlightedSquares();
        board.clearSelectedPiece();

        return;
      }
    }

    if (!piece) {
      board.clearHighlightedSquares();
      board.clearSelectedPiece();

      return;
    }

    if (!piece?.player?.currentTurn) {
      board.clearHighlightedSquares();
      board.clearSelectedPiece();

      return;
    }

    board.setHighlightedSquares(piece.listAvailableMoves());

    board.setSelectPiece(piece);
  };

  return (
    <div
      role="button"
      id={square.id}
      onClick={detectAvailableMoves}
      className={`w-[12.5%] h-[12.5%] cursor-pointer relative flex`}
      style={{ backgroundColor: bgColor }}>
      {highlightedColor && (
        // add a full background color that covers the square
        <div
          className="absolute inset-0 bg-opacity-50"
          style={{
            backgroundColor: highlightedColor,
          }}
        />
      )}
      {isHighlightedFromRightClick && (
        // display a green circle when right click on a square like the one on li chess
        <div
          className="absolute inset-0 flex justify-center items-center"
          style={{ zIndex: 1 }}>
          <div
            className="w-full h-full border-4 rounded-full"
            style={{
              borderColor: square.piece?.player?.isOpponent
                ? "#d127d1"
                : "#95d61f",
            }}
          />
        </div>
      )}
      {isPointingToSquare &&
        (square.piece ? (
          <div
            className="absolute inset-0 flex justify-center items-center"
            style={{ zIndex: 1 }}>
            <div className="w-10 h-10 border-4 border-orange-800 rounded-full" />
          </div>
        ) : (
          <div
            className="absolute inset-0 flex justify-center items-center"
            style={{ zIndex: 1 }}>
            <div className="w-4 h-4 bg-orange-800 rounded-full bg-opacity-50" />
          </div>
        ))}
    </div>
  );
}
