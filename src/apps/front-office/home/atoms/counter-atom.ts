import { atom } from "@mongez/react-atom";

export const counterAtom = atom({
  key: "counter",
  default: 0,
});
