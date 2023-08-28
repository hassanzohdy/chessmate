import { publicRoutes } from "apps/front-office/utils/router";
import URLS from "apps/front-office/utils/urls";
import NotFoundPage from "design-system/layouts/NotFoundPage";
import HomePage from "./pages/HomePage";

publicRoutes([
  {
    path: URLS.notFound,
    component: NotFoundPage,
  },
  {
    path: URLS.home,
    component: HomePage,
  },
]);
