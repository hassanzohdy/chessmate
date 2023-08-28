export enum ChessGameState {
  Waiting = "waiting",
  NotStarted = "notStarted",
  Started = "started",
  Ended = "ended",
}

export type ChessGameResult = "white" | "black" | "draw";

export enum PlayerColor {
  White = "white",
  Black = "black",
}

export enum SquareColumnPosition {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
}

export enum ChessPieceName {
  Pawn = "pawn",
  Rook = "rook",
  Knight = "knight",
  Bishop = "bishop",
  Queen = "queen",
  King = "king",
}

export enum SquareColor {
  White = "white",
  Black = "black",
}
