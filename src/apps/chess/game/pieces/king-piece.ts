import { Square } from "apps/chess/game/chess-square";
import { getDiagonalSquares } from "../../helpers/moves/get-diagonal-squares";
import { getStraightSquares } from "../../helpers/moves/get-straight-squares";
import { PieceName, SquareColumnPosition } from "./../types";
import { Piece } from "./chess-piece";
import { Pawn } from "./pawn-piece";

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

    if (this.canCastle()) {
      if (this.player.canCastle.kingSide && this.canCastleToKingSide()) {
        // get G square
        const squareG = this.board.getSquare(
          this.square.row,
          SquareColumnPosition.G,
        );

        // make sure that the F square is not attacked by the opponent
        if (
          !this.opponentCanAttack(
            this.board.getSquare(this.square.row, SquareColumnPosition.F),
          )
        ) {
          squares.push(squareG);
        }
      }

      if (this.player.canCastle.queenSide && this.canCastleToQueenSide()) {
        // get C square
        const squareC = this.board.getSquare(
          this.square.row,
          SquareColumnPosition.C,
        );

        if (
          !this.opponentCanAttack(
            this.board.getSquare(this.square.row, SquareColumnPosition.D),
          )
        ) {
          squares.push(squareC);
        }
      }
    }

    return squares.filter(square => {
      return (
        !this.opponentCanAttack(square) &&
        !this.checkIfOtherKingIsCorrespondingCurrentKing(square) &&
        !this.squareHasProtectedPiece(square)
      );
    });
  }

  protected checkIfOtherKingIsCorrespondingCurrentKing(
    square: Square,
  ): boolean {
    const otherKing = this.board.otherPlayer(this.player).king;

    // Check if they are on same column
    // if that so, then check if there is only one row between them
    if (
      otherKing.square.column === this.square.column &&
      Math.abs(otherKing.square.row - square.row) === 1
    ) {
      return true;
    }

    // now check if they are on same row
    // if that so, then check if there is only one column between them
    return (
      otherKing.square.row === this.square.row &&
      Math.abs(otherKing.square.column - square.column) === 1
    );
  }

  protected squareHasProtectedPiece(square: Square): boolean {
    // we need to check if that square the king is moving to is protected by another piece from the opponent
    if (!square.piece) return false;

    return square.piece.isProtectedByAnotherPiece;
  }

  protected canCastle(): boolean {
    // if king is moved, no castling
    if (this.isMoved) return false;

    // if king is checked, no castling
    if (this.player.isChecked) return false;

    return true;
  }

  protected opponentCanAttack(square: Square): boolean {
    const opponent = this.board.otherPlayer(this.player);

    return opponent.activePiecesExceptKing.some(piece => {
      // another check for the pawn, because it attacks diagonally
      if (piece instanceof Pawn) {
        return piece.canAttackKingIn(square);
      }

      return piece.canMoveTo(square, true);
    });
  }

  protected canCastleToKingSide(): boolean {
    // get F1/8, G1/8, h1/8 squares
    const squareF1 = this.board.getSquare(
      this.square.row,
      SquareColumnPosition.F,
    );

    if (squareF1.piece) return false;

    // get G1/8 square
    const squareG = this.board.getSquare(
      this.square.row,
      SquareColumnPosition.G,
    );

    if (squareG.piece) return false;

    // now the H1/8 must have the rook and it must not be moved yet
    const squareH = this.board.getSquare(
      this.square.row,
      SquareColumnPosition.H,
    );

    if (
      !squareH.piece ||
      (squareH.piece.name !== PieceName.Rook &&
        squareH.piece.player === this.player) ||
      squareH.piece.isMoved
    )
      return false;

    return true;
  }

  protected canCastleToQueenSide() {
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
}
