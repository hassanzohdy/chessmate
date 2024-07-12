import { Square } from "apps/chess/game/chess-square";
import { getDiagonalSquares } from "../../helpers/moves/get-diagonal-squares";
import { getStraightSquares } from "../../helpers/moves/get-straight-squares";
import { PieceName, SquareColumnPosition } from "./../types";
import { Piece } from "./chess-piece";

export class King extends Piece {
  /**
   * Piece Name
   */
  public name = PieceName.King;

  public moveToSquare(square: Square): void {
    const currentSquare = this.square;
    super.moveToSquare(square);

    this.player.canCastle.kingSide = false;
    this.player.canCastle.queenSide = false;

    // now wen eed to check if it is a castling move, if so we need to move the corresponding rook
    if (this.isCastlingMove(currentSquare, square)) {
      this.moveRookForCastling(square);
      this.board.changeTurn();
    }
  }

  protected isCastlingMove(currentSquare: Square, square: Square): boolean {
    // if the king moved 2 squares then it is a castling move
    return Math.abs(currentSquare.column - square.column) === 2;
  }

  protected moveRookForCastling(square: Square): void {
    const rookColumn =
      square.column === SquareColumnPosition.C
        ? SquareColumnPosition.A
        : SquareColumnPosition.H;

    const rookSquare = this.board.getSquare(square.row, rookColumn);

    rookSquare.piece?.moveToSquare(
      this.board.getSquare(
        square.row,
        rookSquare.column === SquareColumnPosition.A
          ? SquareColumnPosition.D
          : SquareColumnPosition.F,
      ),
    );
  }

  public listAvailableMoves(): Square[] {
    // king can move on all directions
    // except for few scenarios but we will get to it later (like if the other king is in the way)

    const squares = getStraightSquares(this.square, this.player, true).concat(
      getDiagonalSquares(this.square, this.player, true),
    );

    if (this.player.canCastle.kingSide && this.canCastleToKingSide()) {
      // get G1 square
      const squareG1 = this.board.getSquare(
        this.square.row,
        SquareColumnPosition.G,
      );

      squares.push(squareG1);
    }

    if (this.player.canCastle.queenSide && this.canCastleToQueenSide()) {
      // get C1 square
      const squareC1 = this.board.getSquare(
        this.square.row,
        SquareColumnPosition.C,
      );

      squares.push(squareC1);
    }

    return squares;
  }

  protected canCastleToQueenSide() {
    if (this.isMoved) return false;

    const squareD = this.board.getSquare(
      this.square.row,
      SquareColumnPosition.D,
    );

    if (squareD.piece) return false;

    const squareC = this.board.getSquare(
      this.square.row,
      SquareColumnPosition.C,
    );

    if (squareC.piece) return false;

    const squareB = this.board.getSquare(
      this.square.row,
      SquareColumnPosition.B,
    );

    if (squareB.piece) return false;

    const squareA = this.board.getSquare(
      this.square.row,
      SquareColumnPosition.A,
    );

    if (
      !squareA.piece ||
      (squareA.piece.name !== PieceName.Rook &&
        squareA.piece.player === this.player) ||
      squareA.piece.isMoved
    )
      return false;

    return true;
  }

  protected canCastleToKingSide(): boolean {
    if (this.isMoved) return false;

    // get F1/8, G1/8, h1/8 squares
    const squareF1 = this.board.getSquare(
      this.square.row,
      SquareColumnPosition.F,
    );

    if (squareF1.piece) return false;

    // get G1/8 square
    const squareG1 = this.board.getSquare(
      this.square.row,
      SquareColumnPosition.G,
    );

    if (squareG1.piece) return false;

    // now the H1/8 must have the rook and it must not be moved yet
    const squareH1 = this.board.getSquare(
      this.square.row,
      SquareColumnPosition.H,
    );

    if (
      !squareH1.piece ||
      (squareH1.piece.name !== PieceName.Rook &&
        squareH1.piece.player === this.player) ||
      squareH1.piece.isMoved
    )
      return false;

    return true;
  }
}
