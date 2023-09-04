import { trans } from "@mongez/localization";
import Helmet from "@mongez/react-helmet";
import ChessBoardComponent from "apps/front-office/home/pages/chess/ChessBoardComponent/ChessBoardComponent";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <>
      <Helmet title={trans("home")} appendAppName={false} />

      <ChessBoardComponent />
    </>
  );
}
