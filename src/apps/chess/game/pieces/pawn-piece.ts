import { Square } from "apps/chess/game/chess-square";
import { PieceName } from "apps/chess/game/types";
import { promotionSelectionAtom } from "../../atoms";
import { Piece } from "./chess-piece";

export class Pawn extends Piece {
  /**
   * Piece Name
   */
  public name = PieceName.Pawn;

  public isDoubleMoved = false;

  /**
   * Move piece to the given square
   */
  public moveToSquare(square: Square) {
    // check if it is double moved
    if (this.player.isBlack) {
      this.isDoubleMoved = !this.isMoved && this.square.row - square.row === 2;
    } else {
      this.isDoubleMoved = !this.isMoved && square.row - this.square.row === 2;
    }

    // check if the pawn is going to promote

    if (square.piece) {
      this.capture(square.piece);
    } else {
      // now check if last played piece is pawn and it is double moved
      if (
        this.board.lastMovedPiece &&
        (this.board.lastMovedPiece as Pawn).isDoubleMoved
      ) {
        const lastMovedPiece = this.board.lastMovedPiece as Pawn;

        if (this.player.isBlack) {
          if (
            lastMovedPiece.square.row === square.row + 1 &&
            lastMovedPiece.square.column === square.column
          ) {
            // now remove the last moved piece
            this.capture(lastMovedPiece);
            lastMovedPiece.square.setPiece(undefined);
          }
        } else {
          if (
            lastMovedPiece.square.row === square.row - 1 &&
            lastMovedPiece.square.column === square.column
          ) {
            // now remove the last moved piece
            this.capture(lastMovedPiece);
            lastMovedPiece.square.setPiece(undefined);
          }
        }
      }
    }

    if (this.isPromoting(square)) {
      return this.promotePawn(square);
    }

    this.moveTo(square);
  }

  protected isPromoting(nextSquare: Square): boolean {
    return (
      (this.player.isBlack && nextSquare.row === 1) ||
      (this.player.isWhite && nextSquare.row === 8)
    );
  }

  protected promotePawn(square: Square) {
    promotionSelectionAtom.merge({
      promotingSquare: square,
      pawn: this,
      opened: true,
    });

    const event = promotionSelectionAtom.onChange(value => {
      if (!value.promotedPiece) return;

      event.unsubscribe();

      this.isPromoted = true;
    });
  }

  public listAvailableMoves(): Square[] {
    if (this.player.isBlack) {
      return this.listAvailableMovesForBlack();
    }

    //Available moves for pawn are one of the following:
    // 1. Move one square forward
    // 2. If not moved, move two squares forward
    // 3. Capture diagonally
    // 4. En passant -> Eat the pawn that moved two squares forward
    // 5. Promotion -> Move to the last row and promote to another piece
    const nextSquare = this.board.getSquare(
      this.square.row + 1,
      this.square.column,
    );

    const availableSquares: Square[] = [];

    if (!this.isMoved) {
      // Move two squares forward
      if (nextSquare && !nextSquare.piece) {
        availableSquares.push(nextSquare);
      }

      const moveTwoSquaresForward = this.board.getSquare(
        this.square.row + 2,
        this.square.column,
      );

      if (moveTwoSquaresForward && !moveTwoSquaresForward.piece) {
        availableSquares.push(moveTwoSquaresForward);
      }
    }

    // Move one square forward
    if (nextSquare && !nextSquare.piece) {
      availableSquares.push(nextSquare);
    }

    // now check if the pawn can capture diagonally
    const leftDiagonalSquare = this.board.getSquare(
      this.square.row + 1,
      this.square.column - 1,
    );

    if (leftDiagonalSquare && leftDiagonalSquare.piece) {
      availableSquares.push(leftDiagonalSquare);
    }

    const rightDiagonalSquare = this.board.getSquare(
      this.square.row + 1,
      this.square.column + 1,
    );

    if (rightDiagonalSquare && rightDiagonalSquare.piece) {
      availableSquares.push(rightDiagonalSquare);
    }

    // En passant
    const leftEnPassantSquare = this.board.getSquare(
      this.square.row,
      this.square.column - 1,
    );

    if (
      leftEnPassantSquare?.piece?.name === PieceName.Pawn &&
      (leftEnPassantSquare.piece as Pawn).isDoubleMoved &&
      this.board.lastMovedPiece === leftEnPassantSquare.piece
    ) {
      // now add the previous square to the available moves
      const leftEnPassantSquarePreviousRow = this.board.getSquare(
        this.square.row + 1,
        this.square.column - 1,
      );

      if (
        leftEnPassantSquarePreviousRow &&
        !leftEnPassantSquarePreviousRow.piece
      ) {
        availableSquares.push(leftEnPassantSquarePreviousRow);
      }
    }

    const rightEnPassantSquare = this.board.getSquare(
      this.square.row,
      this.square.column + 1,
    );

    if (
      rightEnPassantSquare?.piece?.name === PieceName.Pawn &&
      (rightEnPassantSquare.piece as Pawn).isDoubleMoved &&
      this.board.lastMovedPiece === rightEnPassantSquare.piece
    ) {
      // now add the previous square to the available moves
      const rightEnPassantSquarePreviousRow = this.board.getSquare(
        this.square.row + 1,
        this.square.column + 1,
      );

      if (
        rightEnPassantSquarePreviousRow &&
        !rightEnPassantSquarePreviousRow.piece
      ) {
        availableSquares.push(rightEnPassantSquarePreviousRow);
      }
    }

    return availableSquares.filter(square => {
      // we need to make sure that square does not have a piece of current player
      return square.piece?.player !== this.player;
    });
  }

  /**
   * Check if the pawn can move to the given square if current player is black
   */
  protected listAvailableMovesForBlack() {
    const nextSquare = this.board.getSquare(
      this.square.row - 1,
      this.square.column,
    );

    const availableSquares: Square[] = [];

    if (!this.isMoved) {
      // Move two squares forward
      if (nextSquare && !nextSquare.piece) {
        availableSquares.push(nextSquare);
        const moveTwoSquaresForward = this.board.getSquare(
          this.square.row - 2,
          this.square.column,
        );

        if (moveTwoSquaresForward && !moveTwoSquaresForward.piece) {
          availableSquares.push(moveTwoSquaresForward);
        }
      }
    }

    // Move one square forward
    if (nextSquare && !nextSquare.piece) {
      availableSquares.push(nextSquare);
    }

    // now check if the pawn can capture diagonally
    const leftDiagonalSquare = this.board.getSquare(
      this.square.row - 1,
      this.square.column - 1,
    );

    if (leftDiagonalSquare && leftDiagonalSquare.piece) {
      availableSquares.push(leftDiagonalSquare);
    }

    const rightDiagonalSquare = this.board.getSquare(
      this.square.row - 1,
      this.square.column + 1,
    );

    if (rightDiagonalSquare && rightDiagonalSquare.piece) {
      availableSquares.push(rightDiagonalSquare);
    }

    // En passant

    const leftEnPassantSquare = this.board.getSquare(
      this.square.row,
      this.square.column - 1,
    );

    if (
      leftEnPassantSquare?.piece?.name === PieceName.Pawn &&
      (leftEnPassantSquare.piece as Pawn).isDoubleMoved &&
      this.board.lastMovedPiece === leftEnPassantSquare.piece
    ) {
      const leftEnPassantSquarePreviousRow = this.board.getSquare(
        this.square.row - 1,
        this.square.column - 1,
      );

      if (
        leftEnPassantSquarePreviousRow &&
        !leftEnPassantSquarePreviousRow.piece
      ) {
        availableSquares.push(leftEnPassantSquarePreviousRow);
      }
    }

    const rightEnPassantSquare = this.board.getSquare(
      this.square.row,
      this.square.column + 1,
    );

    if (
      rightEnPassantSquare?.piece?.name === PieceName.Pawn &&
      (rightEnPassantSquare.piece as Pawn).isDoubleMoved &&
      this.board.lastMovedPiece === rightEnPassantSquare.piece
    ) {
      const rightEnPassantSquarePreviousRow = this.board.getSquare(
        this.square.row - 1,
        this.square.column + 1,
      );

      if (
        rightEnPassantSquarePreviousRow &&
        !rightEnPassantSquarePreviousRow.piece
      ) {
        availableSquares.push(rightEnPassantSquarePreviousRow);
      }
    }

    return availableSquares.filter(square => {
      // we need to make sure that square does not have a piece of current player
      return square.piece?.player !== this.player;
    });
  }

  /**
   * Check if the pawn can move to the given square if current player is black
   */
  protected canMoveToBlack(square: Square) {
    const availableSquares = this.listAvailableMovesForBlack();

    return availableSquares.includes(square);
  }
}
