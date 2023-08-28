import { trans } from "@mongez/localization";
import Helmet from "@mongez/react-helmet";

export default function NotFoundPage() {
  return (
    <>
      <Helmet title={trans("notFoundPage")} />
    </>
  );
}
