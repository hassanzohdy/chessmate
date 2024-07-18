import {
  highlightedSquaresAtom,
  rightClickHighlightedSquaresAtom,
} from "@chess/atoms";
import { Pawn, Piece } from "@chess/game";
import { pieceImages } from "@chess/helpers/pieces-images";
import { useBoard } from "@chess/hooks";
import { useEvent } from "@mongez/react-hooks";
import { only } from "@mongez/reinforcements";
import { CSSProperties, useEffect, useState } from "react";

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
    // we need to handle the left and right click
    // on right click, toggle square highlight
    const pieceElement = document.getElementById(piece.id);

    if (!pieceElement) return;

    const rightClickCallback = e => {
      e.preventDefault();

      rightClickHighlightedSquaresAtom.toggleSquare(piece.square);
    };

    pieceElement.addEventListener("contextmenu", rightClickCallback);

    const leftClickCallback = () => {
      rightClickHighlightedSquaresAtom.clearAll();

      // if current piece belongs to current

      if (board.playerAtTheBottom.pieces.includes(piece)) {
        highlightedSquaresAtom.toggleSelectedPieceSquare(piece.square);
      } else {
        highlightedSquaresAtom.toggleOpponentSelectedPieceSquare(piece.square);
      }
    };

    pieceElement.addEventListener("click", leftClickCallback);

    return () => {
      pieceElement.removeEventListener("contextmenu", rightClickCallback);
      pieceElement.removeEventListener("click", leftClickCallback);
    };
  }, [board.playerAtTheBottom.pieces, piece]);

  useEffect(() => {
    if (incomingPiece instanceof Pawn === false) return;

    incomingPiece.onPromoted(piece => {
      setPiece(piece);

      setPosition(calculatePosition(piece, whiteStartsAtBottom));
    });
  }, [incomingPiece, whiteStartsAtBottom]);

  useEffect(() => {
    const pieceElement = document.getElementById(piece.id);

    if (!pieceElement) return;

    // implement piece drag and drop to move from current square to another on drop
    // when piece is dragged we want to display the piece image beside the cursor
    // if the piece is hovering over a highlighted (available squares for piece to move to) square, trigger mouseover event on that square
    // once leaving it, trigger mouseout event on that square
    // on drop, move the piece to the new square and remove the piece from the old square (to mark the piece is moved to that square), just call square.element.click()
    // on drag end, remove the piece image from the cursor
    // now let's start to work

    let draggedPieceImage: HTMLImageElement;

    let letBeforeDraggingStyle: CSSProperties = {};

    const setElementPosition = e => {
      if (!draggedPieceImage) return;

      // now we want to set the position of the image to be below the cursor not beside it
      draggedPieceImage.style.left = `${e.pageX - 35}px`;
      draggedPieceImage.style.top = `${e.pageY - 35}px`;
    };

    const handleDragStart = e => {
      e.preventDefault(); // Prevent default behavior to enable custom drag

      if (piece.player !== board.currentPlayer) return;

      // take style backup before moving
      letBeforeDraggingStyle = only(pieceElement.style, [
        "width",
        "height",
        "left",
        "top",
        "transition",
        "opacity",
        "position",
      ]);

      letBeforeDraggingStyle.width =
        pieceElement.getBoundingClientRect().width + "px";
      letBeforeDraggingStyle.height =
        pieceElement.getBoundingClientRect().height + "px";

      draggedPieceImage = pieceElement.cloneNode(true) as HTMLImageElement;
      draggedPieceImage.style.position = "absolute";
      draggedPieceImage.style.pointerEvents = "none";

      draggedPieceImage.style.zIndex = "100";
      draggedPieceImage.style.width = letBeforeDraggingStyle.width;
      draggedPieceImage.style.height = letBeforeDraggingStyle.height;
      // now we want to set the position of the image to be below the cursor not beside it
      setElementPosition(e);
      // no transition on drag
      draggedPieceImage.style.transition = "none";
      // give it some opacity
      draggedPieceImage.style.opacity = "0.6";

      // make sure to hide the original piece and remove the transition from it as well
      pieceElement.style.opacity = "0";
      pieceElement.style.transition = "none";

      document.body.appendChild(draggedPieceImage);

      document.addEventListener("mousemove", setElementPosition);
      document.addEventListener("mouseup", handleDrop);

      piece.square.element.dataset.cbg = // cbg = current background color
        piece.square.element.style.backgroundColor;
      piece.square.element.style.backgroundColor = "#c0c07b";
    };

    const handleDrop = () => {
      document.removeEventListener("mousemove", setElementPosition);
      document.removeEventListener("mouseup", handleDrop);

      if (!draggedPieceImage) return;

      draggedPieceImage.remove();

      for (const key in letBeforeDraggingStyle) {
        draggedPieceImage.style[key] = letBeforeDraggingStyle[key];

        delete letBeforeDraggingStyle[key];
      }

      pieceElement.style.pointerEvents = "auto";
      pieceElement.style.zIndex = "auto";
      pieceElement.style.opacity = "1";

      if (piece.square.element.dataset.cbg) {
        piece.square.element.style.backgroundColor =
          piece.square.element.dataset.cbg;
        delete piece.square.element.dataset.cbg;

        const square = board.highlightedSquares.find(square => {
          return square.element.getAttribute("data-bg") !== null;
        });

        if (square) {
          board.clearHighlightedSquares();
          piece.moveToSquare(square);
          square.removeHighlightAsSuggestedMove();
        }
      }
    };

    pieceElement.addEventListener("mousedown", handleDragStart);

    return () => {
      pieceElement.removeEventListener("mousedown", handleDragStart);
      document.removeEventListener("mousemove", setElementPosition);
      document.removeEventListener("mouseup", handleDrop);
    };
  }, [piece, board, piece.id]);

  useEffect(() => {
    const pieceElement = document.getElementById(piece.id);

    if (!pieceElement) return;

    const mouseoverCallback = () => {
      piece.square.highlightAsSuggestedMove();
    };

    const mouseoutCallback = () => {
      piece.square.removeHighlightAsSuggestedMove();
    };

    pieceElement.addEventListener("mouseover", mouseoverCallback);
    pieceElement.addEventListener("mouseout", mouseoutCallback);

    return () => {
      pieceElement.removeEventListener("mouseover", mouseoverCallback);
      pieceElement.removeEventListener("mouseout", mouseoutCallback);
    };
  }, [piece]);

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
      onMouseDown={detectAvailableMoves}
      src={pieceImage}
      alt={piece.name}
      id={piece.id}
      className="absolute cursor-pointer w-[12.5%] h-[12.5%]"
      style={{
        transition: "all 0.2s ease-in-out",
        ...position,
      }}
    />
  );
}
