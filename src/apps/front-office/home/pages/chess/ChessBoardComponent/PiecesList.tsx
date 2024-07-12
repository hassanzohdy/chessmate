import { chessBoardAtom } from "@chess/atoms";
import { useState } from "react";
import PieceComponent from "../Piece/Piece";

export default function PiecesList() {
  const chessBoard = chessBoardAtom.value;
  const [pieces] = useState(chessBoard.pieces);

  return (
    <>
      {pieces.map((piece, index) => (
        <PieceComponent piece={piece} key={index} />
      ))}
    </>
  );
}
