import { Rook } from "apps/chess/game/pieces";
import { ChessPlayer } from "./chess-player";
import { ChessSquare } from "./chess-square";
import {
  ChessGameResult,
  ChessGameState,
  PlayerColor,
  SquareColor,
  SquareColumnPosition,
} from "./types";

export class ChessBoard {
  /**
   * Game State
   */
  public state: ChessGameState = ChessGameState.Waiting;

  /**
   * Game result
   */
  public result?: ChessGameResult;

  /**
   * Winning Player
   */
  public winner?: ChessPlayer;

  /**
   * Players List
   */
  public readonly players: ChessPlayer[] = [];

  /**
   * Current Player
   */
  public currentPlayer?: ChessPlayer;

  /**
   * Squares List
   */
  public squares: ChessSquare[] = [];

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
  protected addPlayer(player: ChessPlayer) {
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

    this.changeState(ChessGameState.Started);

    return this;
  }

  /**
   * Change game state
   */
  protected changeState(state: ChessGameState) {
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
    const whitePlayer = new ChessPlayer();

    whitePlayer.color = PlayerColor.White;

    const blackPlayer = new ChessPlayer();

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
        const square = new ChessSquare();

        square.column = column as SquareColumnPosition;
        square.row = row;
        square.color =
          (row + column) % 2 === 0 ? SquareColor.White : SquareColor.Black;

        this.squares.push(square);
      }
    }
  }

  /**
   * Get square by row and column
   */
  public getSquare(row: number, column: SquareColumnPosition) {
    return this.squares.find(
      square => square.row === row && square.column === column,
    ) as ChessSquare;
  }

  /**
   * Create pieces
   */
  protected createPieces() {
    // first, create the pieces for the white player
    const whitePlayer = this.getPlayerByColor(PlayerColor.White);

    // create main pieces
    const squareA1 = this.getSquare(1, SquareColumnPosition.A);
    new Rook(whitePlayer, squareA1);
  }

  /**
   * Get player by color
   */
  public getPlayerByColor(color: PlayerColor) {
    return this.players.find(player => player.color === color) as ChessPlayer;
  }

  /**
   * Flip board
   */
  public flip() {
    //
  }
}
