import { ChessBoard } from "apps/chess/game/chess-board";
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
   * Check if current player in check or not
   */
  public checkIfKingIsInCheck(): boolean {
    // to do so, we need to check if the king is in the path of any of the opponent's pieces
    const king = this.pieces.find(
      piece => piece.name === PieceName.King,
    ) as King;

    const opponent = this.board.otherPlayer(this);

    this.isChecked = opponent.pieces.some(piece =>
      piece.canMoveTo(king.square),
    );

    if (this.isChecked) {
      alert("Checked");

      this.checkIfKingIsInCheckMate(king);
    }

    return this.isChecked;
  }

  /**
   * Check if the king is in check mate
   */
  public checkIfKingIsInCheckMate(king: King) {
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
