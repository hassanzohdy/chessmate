import { Link } from "@mongez/react-router";
import { counterAtom } from "apps/front-office/home/atoms/counter-atom";

export default function DisplayCounter() {
  const count = counterAtom.useValue(); // get current value and re-render when it changes
  return (
    <>
      <h1>{count}</h1>
      <small>
        This component will be the only component that will be rendered when the
        counter button is clicked, for more checkout the
        <Link
          newTab
          className="link"
          href="https://github.com/hassanzohdy/mongez-react-atom">
          React Atom Docs
        </Link>
      </small>
    </>
  );
}
