import { ChessPieceName } from "../types";
import { ChessPiece } from "./chess-piece";

export class Rook extends ChessPiece {
  /**
   * Piece Name
   */
  public name = ChessPieceName.Rook;
}
