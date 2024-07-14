import { ChessBoard } from "apps/chess/game/chess-board";
import { getDiagonalSquaresBetween } from "../helpers/moves/get-diagonal-squares-between";
import { getStraightSquaresBetween } from "../helpers/moves/get-straight-squares-between";
import { inSameDiagonal } from "../helpers/moves/in-same-diagonal";
import { Square } from "./chess-square";
import { King, Piece } from "./pieces";
import { PieceName, PlayerColor } from "./types";

export class Player {
  /**
   * Player Name
   */
  public name = "";

  /**
   * Player Color
   */
  public color!: PlayerColor;

  /**
   * Check if player is winner
   */
  public isWinner?: boolean;

  /**
   * Current pieces with the player
   */
  public pieces: Piece[] = [];

  /**
   * Taken Pieces from the current player
   *
   * Pieces + TakenPieces = 16
   */
  public takenPieces: Piece[] = [];

  /**
   * Whether if the player is being checked
   */
  public isChecked = false;

  /**
   * List of pieces that made the check
   */
  public checkedBy: Piece[] = [];

  /**
   * Get number of checked pieces
   */
  public get numberOfChecks(): number {
    return this.checkedBy.length;
  }

  /**
   * Check if player can castle
   */
  public canCastle = {
    kingSide: true,
    queenSide: true,
  };

  /**
   * Player Board
   */
  public board!: ChessBoard;

  /**
   * King piece
   */
  protected _king!: King;

  /**
   * Check if the current player is in turn
   */
  public get currentTurn() {
    return this.board.currentPlayer === this;
  }

  /**
   * Add piece
   */
  public addPiece(piece: Piece) {
    this.pieces.push(piece);

    return this;
  }

  /**
   * Check if current player is black
   */
  public get isBlack(): boolean {
    return this.color === PlayerColor.Black;
  }

  /**
   * Check if current player is white
   */
  public get isWhite(): boolean {
    return this.color === PlayerColor.White;
  }

  /**
   * Get squares between the king if it is checked and the attacking piece
   */
  public getSquaresBetweenKingAndAttackingPiece(
    attackingPiece: Piece,
  ): Square[] {
    if (!this.isChecked) return [];

    if (inSameDiagonal(this.king.square, attackingPiece.square)) {
      return getDiagonalSquaresBetween(this.king.square, attackingPiece.square);
    }

    // if the piece is rook or queen, check for horizontal and vertical squares

    return getStraightSquaresBetween(this.king.square, attackingPiece.square);
  }

  /**
   * Check if current player is the opponent of current user
   */
  public get isOpponent(): boolean {
    return this !== this.board.playerAtTheBottom;
  }

  /**
   * Check if current player in check or not
   */
  public checkIfKingIsInCheck(): boolean {
    // to do so, we need to check if the king is in the path of any of the opponent's pieces

    const opponent = this.board.otherPlayer(this);

    this.checkedBy = [];

    for (const piece of opponent.activePiecesExceptKing) {
      if (piece.canMoveTo(this.king.square, true)) {
        if (!this.checkedBy.includes(piece)) {
          this.checkedBy.push(piece);
        }
      }
    }

    this.isChecked = this.checkedBy.length > 0;

    if (this.isChecked) {
      alert("Checked");

      this.checkIfKingIsInCheckMate(this.king);
    }

    return this.isChecked;
  }

  /**
   * Get active pieces on board
   */
  public get activePieces() {
    return this.pieces.filter(piece => !piece.isTaken);
  }

  /**
   * Get all active pieces except the king
   */
  public get activePiecesExceptKing() {
    return this.activePieces.filter(piece => piece.name !== PieceName.King);
  }

  /**
   * Get king piece
   */
  public get king(): King {
    if (this._king) return this._king;

    return (this._king = this.activePieces.find(
      piece => piece.name === PieceName.King,
    ) as King);
  }

  /**
   * Check if the king is in check mate
   */
  public checkIfKingIsInCheckMate(king: King) {
    // TODO: check if any piece can protect the king
    return;
    const opponent = this.board.otherPlayer(this);

    const isKingInCheckMate = king
      .listAvailableMoves()
      .every(square => opponent.pieces.some(piece => piece.canMoveTo(square)));

    if (isKingInCheckMate) {
      this.isWinner = false;
      alert("Mate");
    }
  }
}
