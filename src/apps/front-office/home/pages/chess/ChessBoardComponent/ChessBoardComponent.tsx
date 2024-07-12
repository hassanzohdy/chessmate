import { useMemo } from "react";
import { chessBoardAtom } from "../../../../../chess/atoms";
import PieceComponent from "../Piece/Piece";
import SquareComponent from "../SquareComponent";
import StartGameButton from "./StartGameButton";

function ColumnNames() {
  return (
    <div
      className="absolute -bottom-6 left-0 z-10 w-full flex justify-between"
      style={{
        textShadow: "1px 1px 1px #000",
      }}>
      <div className="w-[12.5%]">A</div>
      <div className="w-[12.5%]">B</div>
      <div className="w-[12.5%]">C</div>
      <div className="w-[12.5%]">D</div>
      <div className="w-[12.5%]">E</div>
      <div className="w-[12.5%]">F</div>
      <div className="w-[12.5%]">G</div>
      <div className="w-[12.5%]">H</div>
    </div>
  );
}

function RowNumbers() {
  return (
    <div
      className="absolute top-5 -left-10 w-[50px] h-full flex flex-col justify-between"
      style={{
        textShadow: "1px 1px 1px #000",
      }}>
      <div className="h-[12.5%] text-center">8</div>
      <div className="h-[12.5%] text-center">7</div>
      <div className="h-[12.5%] text-center">6</div>
      <div className="h-[12.5%] text-center">5</div>
      <div className="h-[12.5%] text-center">4</div>
      <div className="h-[12.5%] text-center">3</div>
      <div className="h-[12.5%] text-center">2</div>
      <div className="h-[12.5%] text-center">1</div>
    </div>
  );
}

export default function ChessBoardComponent() {
  const chessBoard = chessBoardAtom.value;

  const squares = useMemo(() => {
    // create the squares

    // sort squares by row and column so row number 8 is at top and row number 1 is at bottom
    const squares = chessBoard.squares.sort((a, b) => {
      return b.row - a.row;
    });

    return squares.map(square => {
      return (
        <SquareComponent
          square={square}
          color={square.color}
          key={`${square.column}${square.row}`}
        />
      );
    });
  }, [chessBoard]);

  const pieces = useMemo(() => {
    return chessBoard.pieces.map((piece, index) => (
      <PieceComponent piece={piece} key={index} />
    ));
  }, [chessBoard]);

  return (
    <>
      <div className="relative w-[600px] h-[600px] flex flex-wrap">
        <ColumnNames />
        {squares}
        {pieces}
        <RowNumbers />
      </div>

      <StartGameButton />
    </>
  );
}
