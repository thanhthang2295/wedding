import React from "react";
import { ROUTE_NAME } from "./name";
import { Main } from "pages/main";
const PageNotFound = React.lazy(() => import("pages/others/PageNotFound"));

export const ROUTES = [
  {
    path: ROUTE_NAME.PAGE_MAIN,
    exact: true,
    component: () => <Main />,
  },
  {
    path: '*',
    component: () => <PageNotFound />,
  },
]
