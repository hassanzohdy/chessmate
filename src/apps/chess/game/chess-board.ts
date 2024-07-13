import events from "@mongez/events";
import { King, Pawn, Piece, Queen, Rook } from "apps/chess/game/pieces";
import { BlackBishop } from "apps/chess/game/pieces/black-bishop";
import { Knight } from "apps/chess/game/pieces/knight-piece";
import { WhiteBishop } from "apps/chess/game/pieces/white-bishop";
import { Player } from "./chess-player";
import { Square } from "./chess-square";
import {
  GameResult,
  GameState,
  PieceName,
  PlayerColor,
  SquareColor,
  SquareColumnPosition,
} from "./types";

export class ChessBoard {
  /**
   * Game State
   */
  // TODO: Change it to waiting later
  // public state: GameState = GameState.Waiting;
  public state: GameState = GameState.Active;

  /**
   * Game result
   */
  public result?: GameResult;

  /**
   * Winning Player
   */
  public winner?: Player;

  /**
   * Players List
   */
  public readonly players: Player[] = [];

  /**
   * Current Player
   */
  public currentPlayer?: Player;

  /**
   * Other player
   */
  public otherPlayer(oppositePlayer = this.currentPlayer) {
    return this.players.find(player => player !== oppositePlayer) as Player;
  }

  /**
   * Squares List
   */
  public squares: Square[] = [];

  /**
   * Board Theme
   */
  public theme = "default";

  /**
   * Highlighted Squares
   */
  public highlightedSquares: Square[] = [];

  /**
   * Current selected piece
   */
  public selectedPiece?: Piece;

  /**
   * Last moved piece
   */
  public lastMovedPiece?: Piece;

  /**
   * Constructor
   */
  public constructor() {
    this.createBoard();
  }

  /**
   * Add player
   */
  protected addPlayer(player: Player) {
    player.board = this;

    this.players.push(player);

    // if the player color is white, set it as the current player
    if (player.color === PlayerColor.White) {
      this.currentPlayer = player;
    }

    return this;
  }

  /**
   * Set highlighted squares
   */
  public setHighlightedSquares(squares: Square[]) {
    this.highlightedSquares = squares;

    events.trigger(`chess.board.highlightedSquares`, squares);
  }

  /**
   * Listen to highlighted squares change
   */
  public onHighlightedSquaresChange(callback: (squares: Square[]) => void) {
    return events.subscribe(`chess.board.highlightedSquares`, callback);
  }

  /**
   * Clear highlighted squares
   */
  public clearHighlightedSquares() {
    for (const square of this.highlightedSquares) {
      square.isHighlighted = false;
    }
    this.setHighlightedSquares([]);
  }

  /**
   * Set selected piece
   */
  public setSelectPiece(piece: Piece) {
    piece.isSelected = true;
    this.selectedPiece = piece;

    events.trigger(`chess.board.selectedPiece`, piece);
  }

  /**
   * Clear selected piece
   */
  public clearSelectedPiece() {
    if (this.selectedPiece) {
      this.selectedPiece.isSelected = false;
    }

    this.selectedPiece = undefined;

    events.trigger(`chess.board.selectedPiece`, undefined);
  }

  /**
   * Listen to selected piece change
   */
  public onSelectedPieceChange(callback: (piece: Piece | undefined) => void) {
    return events.subscribe(`chess.board.selectedPiece`, callback);
  }

  /**
   * Start game
   */
  public start() {
    if (this.players.length !== 2) {
      throw new Error("Invalid number of players");
    }

    this.changeState(GameState.Active);

    return this;
  }

  /**
   * Change game state
   */
  protected changeState(state: GameState) {
    this.state = state;

    // trigger event for state change
    events.trigger(`chess.state.update`, state);
    return this;
  }

  /**
   * Check if game is started
   */
  public get isStarted(): boolean {
    return this.state === GameState.Active;
  }

  public onGameStateChange(callback: (state: GameState) => void) {
    return events.subscribe(`chess.state.update`, callback);
  }

  /**
   * Change current player turn
   */
  public changeTurn() {
    if (!this.currentPlayer) return;

    const currentPlayerIndex = this.players.indexOf(this.currentPlayer);

    const nextPlayerIndex = currentPlayerIndex + 1;

    const nextPlayer = this.players[nextPlayerIndex % 2];

    this.currentPlayer = nextPlayer;

    return this;
  }

  /**
   * Create Board
   */
  protected createBoard() {
    this.createPlayers();

    this.createSquares();

    this.createPieces();
  }

  /**
   * Create players
   */
  protected createPlayers() {
    const whitePlayer = new Player();

    whitePlayer.color = PlayerColor.White;

    const blackPlayer = new Player();

    blackPlayer.color = PlayerColor.Black;

    this.addPlayer(whitePlayer).addPlayer(blackPlayer);
  }

  /**
   * Create squares
   */
  protected createSquares() {
    for (let row = 1; row <= 8; row++) {
      // loop over columns
      for (let column = 1; column <= 8; column++) {
        const square = new Square();

        square.setPositionAndColor(row, column as SquareColumnPosition);

        this.squares.push(square);
      }
    }
  }

  /**
   * Get player at the bottom, which usually refers to the current user regardless of the color
   */
  public get playerAtTheBottom(): Player {
    // for now we will assume the white player is the current user
    return this.players.find(
      player => player.color === PlayerColor.White,
    ) as Player;
  }

  /**
   * Get square by row and column
   */
  public getSquare(row: number, column: SquareColumnPosition) {
    return this.squares.find(
      square => square.row === row && square.column === column,
    ) as Square;
  }

  /**
   * Create pieces
   */
  protected createPieces() {
    this.createWhitePeaces();
    this.createBlackPeaces();
  }

  public createPiece(pieceName: PieceName, player: Player, square: Square) {
    switch (pieceName) {
      case PieceName.Pawn:
        return new Pawn(player, square);
      case PieceName.Rook:
        return new Rook(player, square);
      case PieceName.Knight:
        return new Knight(player, square);
      case PieceName.Bishop:
        return square.color === SquareColor.White
          ? new WhiteBishop(player, square)
          : new BlackBishop(player, square);
      case PieceName.Queen:
        return new Queen(player, square);
      case PieceName.King:
        return new King(player, square);
    }
  }

  public onPiecesListChange(callback: (pieces: Piece[]) => void) {
    return events.subscribe(`chess.board.pieces`, callback);
  }

  public triggerPiecesListChange() {
    setTimeout(() => {
      events.trigger(`chess.board.pieces`);
    }, 300);
  }

  public removePiece(piece: Piece) {
    const player = piece.player;

    player.pieces = player.pieces.filter(p => p !== piece);

    this.triggerPiecesListChange();
  }

  /**
   * Create white pieces
   */
  protected createWhitePeaces() {
    // first, create the pieces for the white player
    const whitePlayer = this.getPlayerByColor(PlayerColor.White);

    // create main pieces
    const squareA1 = this.getSquare(1, SquareColumnPosition.A);

    new Rook(whitePlayer, squareA1);

    const squareB1 = this.getSquare(1, SquareColumnPosition.B);

    new Knight(whitePlayer, squareB1);

    const squareC1 = this.getSquare(1, SquareColumnPosition.C);

    new BlackBishop(whitePlayer, squareC1);

    const squareD1 = this.getSquare(1, SquareColumnPosition.D);

    new Queen(whitePlayer, squareD1);

    const squareE1 = this.getSquare(1, SquareColumnPosition.E);

    new King(whitePlayer, squareE1);

    const squareF1 = this.getSquare(1, SquareColumnPosition.F);

    new WhiteBishop(whitePlayer, squareF1);

    const squareG1 = this.getSquare(1, SquareColumnPosition.G);

    new Knight(whitePlayer, squareG1);

    const squareH1 = this.getSquare(1, SquareColumnPosition.H);

    new Rook(whitePlayer, squareH1);

    // create pawns
    for (let i = 1; i <= 8; i++) {
      const square = this.getSquare(2, i as SquareColumnPosition);

      new Pawn(whitePlayer, square);
    }
  }

  /**
   * Create black pieces
   */
  protected createBlackPeaces() {
    // first, create the pieces for the white player
    const blackPlayer = this.getPlayerByColor(PlayerColor.Black);

    // create main pieces
    const squareA8 = this.getSquare(8, SquareColumnPosition.A);

    new Rook(blackPlayer, squareA8);

    const squareB8 = this.getSquare(8, SquareColumnPosition.B);

    new Knight(blackPlayer, squareB8);

    const squareC8 = this.getSquare(8, SquareColumnPosition.C);

    new WhiteBishop(blackPlayer, squareC8);

    const squareD8 = this.getSquare(8, SquareColumnPosition.D);

    new Queen(blackPlayer, squareD8);

    const squareE8 = this.getSquare(8, SquareColumnPosition.E);

    new King(blackPlayer, squareE8);

    const squareF8 = this.getSquare(8, SquareColumnPosition.F);

    new BlackBishop(blackPlayer, squareF8);

    const squareG8 = this.getSquare(8, SquareColumnPosition.G);

    new Knight(blackPlayer, squareG8);

    const squareH8 = this.getSquare(8, SquareColumnPosition.H);

    new Rook(blackPlayer, squareH8);

    // create pawns
    for (let i = 1; i <= 8; i++) {
      const square = this.getSquare(7, i as SquareColumnPosition);

      new Pawn(blackPlayer, square);
    }
  }

  /**
   * Get player by color
   */
  public getPlayerByColor(color: PlayerColor) {
    return this.players.find(player => player.color === color) as Player;
  }

  /**
   * Get all pieces
   */
  public get pieces() {
    return this.players.reduce((pieces, player) => {
      return pieces.concat(player.pieces);
    }, [] as Piece[]);
  }

  /**
   * Flip board
   */
  public flip() {
    //
  }
}
