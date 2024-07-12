export enum GameState {
  Waiting = "waiting",
  Active = "active",
  Ended = "ended",
  Canceled = "canceled",
}

export type GameResult = "white" | "black" | "draw";

export enum PlayerColor {
  White = "white",
  Black = "black",
}

export enum SquareColumnPosition {
  A = 1,
  B = 2,
  C = 3,
  D = 4,
  E = 5,
  F = 6,
  G = 7,
  H = 8,
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
