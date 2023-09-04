import styled from "@emotion/styled";
import { ChessBoard } from "apps/chess/game";
import Piece from "apps/front-office/home/pages/chess/Piece/Piece";
import Square from "apps/front-office/home/pages/chess/Square/Square";
import { useMemo, useRef } from "react";

export const Board = styled.div`
  label: ChessBoard;
  position: relative;
  width: 600px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
`;

export default function ChessBoardComponent() {
  const chessBoardRef = useRef(new ChessBoard());

  const chessBoard = chessBoardRef.current;

  const squares = useMemo(() => {
    // create the squares

    // sort squares by row and column so row number 8 is at top and row number 1 is at bottom
    const squares = chessBoard.squares.sort((a, b) => {
      return b.row - a.row;
    });

    return squares.map(square => {
      return (
        <Square color={square.color} key={`${square.column}${square.row}`}>
          {square.piece && (
            <Piece
              piece={square.piece.name}
              color={square.piece.player.color}
            />
          )}
        </Square>
      );
    });
  }, [chessBoard]);

  return (
    <>
      <Board>{squares}</Board>
    </>
  );
}
