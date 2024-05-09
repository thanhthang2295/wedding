import { isEmpty } from "lodash";
import { createRef } from "react";
import invoke from "react-native-webview-invoke/browser";
import { ROUTE_NAME } from "./name";

export const routerRef = createRef();

export const handleNotSupport = async () => {
  if (!isEmpty(invoke.fn)) {
    await invoke.fn.notSupport();
  }
}

export function goBack() {
  const { history } = routerRef?.current?.props;
  history.goBack();
}

export function goWelcome() {
  const { history } = routerRef?.current?.props;
  history.push(ROUTE_NAME.PAGE_WELCOME);
}

// export function pushScreen({ name, params }) {
//   const { history } = routerRef?.current?.props;
//   history.push({
//     pathname: name,
//     state: params,
//   });
// }

// export function replaceScreen({ name, params }) {
//   const { history } = routerRef?.current?.props;
//   history.replace({
//     pathname: name,
//     state: params,
//   });
// }
