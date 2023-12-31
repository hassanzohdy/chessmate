import { King, Pawn, Queen, Rook } from "apps/chess/game/pieces";
import { BlackBishop } from "apps/chess/game/pieces/black-bishop";
import { Knight } from "apps/chess/game/pieces/knight-piece";
import { WhiteBishop } from "apps/chess/game/pieces/white-bishop";
import { Player } from "./chess-player";
import { Square } from "./chess-square";
import {
  GameResult,
  GameState,
  PlayerColor,
  SquareColor,
  SquareColumnPosition,
} from "./types";

export class ChessBoard {
  /**
   * Game State
   */
  public state: GameState = GameState.Waiting;

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
   * Squares List
   */
  public squares: Square[] = [];

  /**
   * Board Theme
   */
  public theme = "default";

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
   * Start game
   */
  public start() {
    if (this.players.length !== 2) {
      throw new Error("Invalid number of players");
    }

    this.changeState(GameState.Started);

    return this;
  }

  /**
   * Change game state
   */
  protected changeState(state: GameState) {
    this.state = state;

    // trigger event for state change
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
    //
    for (let row = 1; row <= 8; row++) {
      // loop over columns
      for (let column = 1; column <= 8; column++) {
        const square = new Square();

        square.column = column as SquareColumnPosition;
        square.row = row;
        square.color =
          (row + column - 1) % 2 === 0 ? SquareColor.White : SquareColor.Black;

        this.squares.push(square);
      }
    }
  }

  /**
   * Get square by row and column
   */
  public getSquare(row: number, column: SquareColumnPosition) {
    return this.squares.find(
      square => square.row === row && square.column === column + 1,
    ) as Square;
  }

  /**
   * Create pieces
   */
  protected createPieces() {
    this.createBlackPeaces();
    this.createWhitePeaces();
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
      const square = this.getSquare(2, (i as SquareColumnPosition) - 1);

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
      const square = this.getSquare(7, (i as SquareColumnPosition) - 1);

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
   * Flip board
   */
  public flip() {
    //
  }
}
