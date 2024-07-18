import { Piece } from "../game";
import { Square } from "../game/chess-square";

export function checkIfPieceIsMovedToSquareWillPutKingInCheck(
  piece: Piece,
  square: Square,
): boolean {
  // if the king is not checked, we need to check if the piece is currently guarding the king
  // if so, then we need to find the squares between the piece and potential attacking piece for the king
  // for example if a white bishop (for black) stands on D7 and the black king is on E8
  // If there is a white queen stands on A4, the bishop can not move to protect the king as long as
  // there is no piece between the bishop and the queen in B5 and C6 squares
  const piecePlayer = piece.player;
  const king = piecePlayer.king;

  // now we need to simulate if the piece is moved to the given square
  // would it put the king in check
  // if so, then we need to find the attacking piece

  // temporarily move the piece from its square
  const pieceSquare = piece.square;
  pieceSquare.piece = undefined;

  // now let's see if any piece will put the king under check

  const opponent = piece.board.otherPlayer(piecePlayer);

  for (const attackingPiece of opponent.activePiecesExceptKing) {
    if (!attackingPiece.isMoved) continue;

    const squares = attackingPiece.noKingProtectionCheck().listAvailableMoves();

    attackingPiece.resetKingProtectionCheck();

    if (squares.includes(king.square) && squares.includes(square)) {
      // if the piece is moved to the square, it will put the king in check
      pieceSquare.piece = piece;

      return true;
    }
  }

  pieceSquare.piece = piece;

  return false;
}
