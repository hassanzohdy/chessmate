export enum GameState {
  Waiting = "waiting",
  NotStarted = "notStarted",
  Started = "started",
  Ended = "ended",
}

export type GameResult = "white" | "black" | "draw";

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

export enum PieceName {
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

export enum BishopColor {
  White = "white",
  Black = "black",
}
