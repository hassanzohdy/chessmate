import captureSound from "assets/mp3/capture.mp3";
import moveSound from "assets/mp3/move-self.mp3";

type Sound = "capture" | "move" | "check" | "checkmate" | "draw" | "stalemate";

const sounds = {
  capture: new Audio(captureSound),
  move: new Audio(moveSound),
};

export function playSound(sound: Sound) {
  const audio = sounds[sound];

  audio.currentTime = 0;

  audio.play();
}
