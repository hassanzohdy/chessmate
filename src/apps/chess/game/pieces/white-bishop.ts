import { Bishop } from "apps/chess/game/pieces/bishop-piece";
import { BishopColor } from "../types";

export class WhiteBishop extends Bishop {
  /**
   * Bishop Color
   */
  public color: BishopColor = BishopColor.White;
}
