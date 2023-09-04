// Import styled from emotion
import styled from "@emotion/styled";

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
  piece: PieceType;
  color: "white" | "black";
};

export const PieceImage = styled.img`
  label: PieceImage;
  width: 90%;
  margin: auto;
  cursor: pointer;
`;

export default function Piece({ color, piece }: PieceProps) {
  const pieceImage = pieceImages[color][piece];
  return <PieceImage src={pieceImage} alt={piece} />;
}
