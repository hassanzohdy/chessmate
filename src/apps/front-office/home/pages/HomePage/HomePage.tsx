import { trans } from "@mongez/localization";
import Helmet from "@mongez/react-helmet";
import { Link } from "@mongez/react-router";
import reactLogo from "assets/images/react.svg";
import DisplayCounter from "./DisplayCounter";
import "./HomePage.scss";
import UpdateCounterButton from "./UpdateCounterButton";

export default function HomePage() {
  return (
    <>
      <Helmet title={trans("home")} appendAppName={false} />
      <div className="App">
        <div>
          <Link href="https://vitejs.dev" newTab>
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </Link>
          <Link href="https://reactjs.org" newTab>
            <img src={reactLogo} className="logo react" alt="React logo" />
          </Link>
        </div>
        <h1>
          Powered By
          <br />
          <Link className="link" newTab href="https://github.com/hassanzohdy">
            Mongez Ecosystem
          </Link>
        </h1>
        <UpdateCounterButton />
        <DisplayCounter />
      </div>
    </>
  );
}
