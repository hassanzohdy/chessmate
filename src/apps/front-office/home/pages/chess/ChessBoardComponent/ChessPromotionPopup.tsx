import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { promotionSelectionAtom } from "@chess/atoms";
import { PieceName, PlayerColor } from "@chess/game";
import { pieceImages } from "@chess/helpers/pieces-images";

const piece = (name: PieceName, color: PlayerColor) => ({
  name,
  image: pieceImages[color][name],
});

export default function ChessPromotionPopup() {
  const opened = promotionSelectionAtom.use("opened");
  const pawn = promotionSelectionAtom.get("pawn");

  const piecesList = opened
    ? [
        piece(PieceName.Bishop, pawn.player.color),
        piece(PieceName.Knight, pawn.player.color),
        piece(PieceName.Rook, pawn.player.color),
        piece(PieceName.Queen, pawn.player.color),
      ]
    : [];

  const selectPiece = (name: PieceName) => () => {
    promotionSelectionAtom.merge({
      opened: false,
      selectedPiece: name as any,
    });
  };

  return (
    <>
      <AlertDialog open={opened}>
        <AlertDialogContent className="pt-2 w-[400px]">
          <AlertDialogHeader>
            {/* <AlertDialogTitle className="text-black text-xl">
              Choose a piece to promote your pawn
            </AlertDialogTitle> */}
            <AlertDialogDescription>
              <div className="flex text-center justify-center text-black capitalize items-center">
                {piecesList.map((piece, index) => (
                  <div
                    key={index}
                    className=" cursor-pointer"
                    onClick={selectPiece(piece.name)}>
                    <img
                      src={piece.image}
                      alt="piece"
                      title={piece.name}
                      className="w-24 h-24"
                    />
                    <strong>{piece.name}</strong>
                  </div>
                ))}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
