import { GameState } from "@chess/game";
import { useBoard, useGameState } from "@chess/hooks";

export default function StartGameButton() {
  const gameState = useGameState();
  const board = useBoard();

  if (gameState !== GameState.Waiting) return null;

  return (
    <button
      onClick={board.start.bind(board)}
      className="
      m-auto
      mt-10
      bg-blue-500
      text-white
      rounded-lg
      text-lg
    ">
      Start Game
    </button>
  );
}
