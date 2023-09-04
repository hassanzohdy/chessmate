import {
  BlackSquare,
  WhiteSquare,
} from "apps/front-office/home/pages/chess/Square/Square.styles";

export type SquareProps = {
  children: React.ReactNode;
  color: "white" | "black";
};

export default function Square({ color, children }: SquareProps) {
  const Component = color === "white" ? WhiteSquare : BlackSquare;

  return <Component>{children}</Component>;
}
